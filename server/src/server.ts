import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Import types
import {
  User,
  Assumption,
  Room,
  Timer,
  TimerState,
  SocketEvents,
  NewUserPayload,
  NewAssumptionPayload,
  UpdateAssumptionPositionPayload,
  SelectAssumptionPayload,
  DeleteAssumptionPayload,
  TimerPayload,
} from '../../shared/types/index.js';

// Load environment variables
dotenv.config();

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();
const server = createServer(app);

// Initialize Socket.IO with CORS
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const PORT = process.env.PORT || 4000;

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for development
  })
);
app.use(cors());
app.use(express.json());

// In production, serve static files from client build
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientBuildPath));

  // In production, redirect any non-API requests to the index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// API routes (if any) would go here

// In-memory storage (replace with database in production)
interface RoomStorage {
  [roomId: string]: {
    users: User[];
    assumptions: Assumption[];
    timer: Timer;
  };
}

const rooms: RoomStorage = {};

// Timer management
const timers: { [roomId: string]: NodeJS.Timeout } = {};

// Helper functions
const generateId = () => Math.random().toString(36).substr(2, 9);

const getOrCreateRoom = (roomId: string) => {
  if (!rooms[roomId]) {
    rooms[roomId] = {
      users: [],
      assumptions: [],
      timer: {
        id: `timer-${roomId}`,
        roomId,
        isRunning: false,
        totalSeconds: 300,
        timeRemaining: 300,
        phase: 'setup',
        state: TimerState.IDLE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  }
  return rooms[roomId];
};

const startTimer = (roomId: string) => {
  const room = rooms[roomId];
  if (!room || room.timer.isRunning) return;

  room.timer.isRunning = true;
  const duration = room.timer.timeRemaining * 1000;
  room.timer.endTime = Date.now() + duration;
  room.timer.state = TimerState.RUNNING;

  io.to(roomId).emit(SocketEvents.TIMER_UPDATE, room.timer);

  // Clear any existing timer before starting a new one
  if (timers[roomId]) {
    clearTimeout(timers[roomId]);
  }

  // Set a timer on the server to automatically mark as completed
  timers[roomId] = setTimeout(() => {
    room.timer.isRunning = false;
    room.timer.state = TimerState.COMPLETED;
    io.to(roomId).emit(SocketEvents.TIMER_UPDATE, room.timer);
    delete timers[roomId];
  }, duration);
};

const stopTimer = (roomId: string) => {
  // Clear the server-side timeout
  if (timers[roomId]) {
    clearTimeout(timers[roomId]);
    delete timers[roomId];
  }

  const room = rooms[roomId];
  if (!room || !room.timer.isRunning) return;

  // Calculate remaining time and stop
  const remaining = Math.max(0, (room.timer.endTime || 0) - Date.now());
  room.timer.timeRemaining = Math.round(remaining / 1000);
  room.timer.isRunning = false;
  room.timer.endTime = undefined;
  room.timer.state = TimerState.PAUSED;

  io.to(roomId).emit(SocketEvents.TIMER_UPDATE, room.timer);
};

const resetTimer = (roomId: string, seconds: number = 300) => {
  const room = rooms[roomId];
  if (!room) return;

  stopTimer(roomId);
  room.timer.timeRemaining = seconds;
  room.timer.totalSeconds = seconds;
  room.timer.state = TimerState.IDLE;

  io.to(roomId).emit(SocketEvents.TIMER_UPDATE, room.timer);
};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  const { roomId } = socket.handshake.query;

  if (!roomId || typeof roomId !== 'string') {
    socket.emit('error', 'Invalid room ID');
    socket.disconnect();
    return;
  }

  // Join room
  socket.join(roomId);
  const room = getOrCreateRoom(roomId);

  // Send current state to new user
  socket.emit(SocketEvents.ALL_ASSUMPTIONS, room.assumptions);
  socket.emit(SocketEvents.ALL_USERS, room.users);

  // Handle new user
  socket.on(SocketEvents.NEW_USER, (data: NewUserPayload) => {
    try {
      const existingUser = room.users.find((u) => u.id === socket.id);
      if (existingUser) {
        existingUser.name = data.name;
      } else {
        const user: User = {
          id: socket.id,
          name: data.name,
          roomId: roomId,
          joinedAt: new Date(),
        };
        room.users.push(user);
      }

      io.to(roomId).emit(SocketEvents.ALL_USERS, room.users);
      console.log(`User ${data.name} updated/joined room ${roomId}`);
    } catch (error) {
      console.error('Error handling new user:', error);
      socket.emit('error', 'Failed to add user');
    }
  });

  // Handle new assumption
  socket.on(SocketEvents.NEW_ASSUMPTION, (data: NewAssumptionPayload) => {
    try {
      const assumption: Assumption = {
        id: generateId(),
        text: data.text,
        authorId: socket.id,
        authorName: data.authorName,
        xPosition: 0,
        yPosition: 0,
        screenWidth: 1920,
        screenHeight: 1080,
        isActive: false,
        isSelected: false,
        createdAt: new Date(),
      };

      room.assumptions.push(assumption);
      io.to(roomId).emit(SocketEvents.ALL_ASSUMPTIONS, room.assumptions);
    } catch (error) {
      console.error('Error handling new assumption:', error);
      socket.emit('error', 'Failed to add assumption');
    }
  });

  // Handle assumption position update
  socket.on(
    SocketEvents.UPDATE_ASSUMPTION_POSITION,
    (data: UpdateAssumptionPositionPayload) => {
      try {
        const assumption = room.assumptions.find(
          (a) => a.id === data.assumptionId
        );
        if (assumption) {
          assumption.xPosition = data.xPosition;
          assumption.yPosition = data.yPosition;
          assumption.screenWidth = data.screenWidth;
          assumption.screenHeight = data.screenHeight;

          io.to(roomId).emit(
            SocketEvents.UPDATE_ASSUMPTION_POSITION,
            assumption
          );
        }
      } catch (error) {
        console.error('Error updating assumption position:', error);
      }
    }
  );

  // Handle assumption selection
  socket.on(SocketEvents.SELECT_ASSUMPTION, (data: SelectAssumptionPayload) => {
    try {
      const assumption = room.assumptions.find(
        (a) => a.id === data.assumptionId
      );
      if (assumption) {
        assumption.isSelected = data.isSelected;
        io.to(roomId).emit(SocketEvents.ALL_ASSUMPTIONS, room.assumptions);
      }
    } catch (error) {
      console.error('Error selecting assumption:', error);
    }
  });

  // Handle assumption deletion
  socket.on(SocketEvents.DELETE_ASSUMPTION, (data: DeleteAssumptionPayload) => {
    try {
      room.assumptions = room.assumptions.filter(
        (a) => a.id !== data.assumptionId
      );
      io.to(roomId).emit(SocketEvents.ALL_ASSUMPTIONS, room.assumptions);
      console.log(`Assumption deleted from room ${roomId}`);
    } catch (error) {
      console.error('Error deleting assumption:', error);
    }
  });

  // Handle question changes
  socket.on(
    SocketEvents.QUESTIONS,
    (data: {
      showQuestion: boolean;
      currentQuestion: number;
      roomId: string;
    }) => {
      socket.to(data.roomId).emit(SocketEvents.QUESTIONS, {
        showQuestion: data.showQuestion,
        currentQuestion: data.currentQuestion,
      });
    }
  );

  // Timer controls
  socket.on(SocketEvents.TIMER_START, () => {
    startTimer(roomId);
  });

  socket.on(SocketEvents.TIMER_STOP, () => {
    stopTimer(roomId);
  });

  socket.on(SocketEvents.TIMER_ADD_TIME, ({ seconds }) => {
    const room = rooms[roomId];
    if (room) {
      room.timer.timeRemaining += seconds;
      if (room.timer.isRunning && room.timer.endTime) {
        room.timer.endTime += seconds * 1000;
      }
      io.to(roomId).emit(SocketEvents.TIMER_UPDATE, room.timer);
    }
  });

  socket.on(SocketEvents.TIMER_REMOVE_TIME, ({ seconds }) => {
    const room = rooms[roomId];
    if (room) {
      room.timer.timeRemaining = Math.max(
        0,
        room.timer.timeRemaining - seconds
      );
      if (room.timer.isRunning && room.timer.endTime) {
        room.timer.endTime -= seconds * 1000;
      }
      io.to(roomId).emit(SocketEvents.TIMER_UPDATE, room.timer);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);

    if (room) {
      // Remove user from room
      room.users = room.users.filter((u) => u.id !== socket.id);
      io.to(roomId).emit(SocketEvents.ALL_USERS, room.users);
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    rooms: Object.keys(rooms).length,
    connections: io.engine.clientsCount,
  });
});

// API endpoints
app.get('/api/stats', (req, res) => {
  const stats = {
    totalRooms: Object.keys(rooms).length,
    totalConnections: io.engine.clientsCount,
    rooms: Object.keys(rooms).map((roomId) => ({
      id: roomId,
      users: rooms[roomId].users.length,
      assumptions: rooms[roomId].assumptions.length,
      timerRunning: rooms[roomId].timer.isRunning,
    })),
  };
  res.json(stats);
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  }
);

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
