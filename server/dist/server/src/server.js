import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
// Import types
import { TimerState, SocketEvents, } from '../../shared/types/index.js';
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
    },
});
const PORT = process.env.PORT || 4000;
// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for development
}));
app.use(cors());
app.use(express.json());
// Serve static files from client build
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));
const rooms = {};
// Timer management
const timers = {};
// Helper functions
const generateId = () => Math.random().toString(36).substr(2, 9);
const getOrCreateRoom = (roomId) => {
    if (!rooms[roomId]) {
        rooms[roomId] = {
            users: [],
            assumptions: [],
            timer: {
                id: `timer-${roomId}`,
                roomId,
                isRunning: false,
                seconds: 300, // 5 minutes
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
const startTimer = (roomId) => {
    const room = rooms[roomId];
    if (!room || room.timer.isRunning)
        return;
    room.timer.isRunning = true;
    timers[roomId] = setInterval(() => {
        if (room.timer.seconds > 0) {
            room.timer.seconds--;
            io.to(roomId).emit(SocketEvents.TIMER_UPDATE, {
                roomId,
                seconds: room.timer.seconds,
                isRunning: room.timer.isRunning,
            });
        }
        else {
            // Timer finished
            clearInterval(timers[roomId]);
            delete timers[roomId];
            room.timer.isRunning = false;
            io.to(roomId).emit(SocketEvents.TIMER_UPDATE, {
                roomId,
                seconds: 0,
                isRunning: false,
            });
        }
    }, 1000);
};
const stopTimer = (roomId) => {
    const room = rooms[roomId];
    if (!room)
        return;
    if (timers[roomId]) {
        clearInterval(timers[roomId]);
        delete timers[roomId];
    }
    room.timer.isRunning = false;
    io.to(roomId).emit(SocketEvents.TIMER_UPDATE, {
        roomId,
        seconds: room.timer.seconds,
        isRunning: false,
    });
};
const resetTimer = (roomId, seconds = 300) => {
    const room = rooms[roomId];
    if (!room)
        return;
    stopTimer(roomId);
    room.timer.seconds = seconds;
    room.timer.totalSeconds = seconds;
    io.to(roomId).emit(SocketEvents.TIMER_UPDATE, {
        roomId,
        seconds: room.timer.seconds,
        isRunning: false,
    });
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
    socket.emit(SocketEvents.ALL_USERS, room.users);
    socket.emit(SocketEvents.ALL_ASSUMPTIONS, room.assumptions);
    socket.emit(SocketEvents.TIMER_UPDATE, {
        roomId,
        seconds: room.timer.seconds,
        isRunning: room.timer.isRunning,
    });
    // Handle new user
    socket.on(SocketEvents.NEW_USER, (data) => {
        try {
            const user = {
                id: socket.id,
                name: data.name,
                roomId: roomId,
                joinedAt: new Date(),
            };
            // Remove existing user with same ID, then add new one
            room.users = room.users.filter((u) => u.id !== socket.id);
            room.users.push(user);
            io.to(roomId).emit(SocketEvents.ALL_USERS, room.users);
            console.log(`User ${data.name} joined room ${roomId}`);
        }
        catch (error) {
            console.error('Error handling new user:', error);
            socket.emit('error', 'Failed to add user');
        }
    });
    // Handle new assumption
    socket.on(SocketEvents.NEW_ASSUMPTION, (data) => {
        try {
            const assumption = {
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
            console.log(`New assumption added to room ${roomId}: ${data.text}`);
        }
        catch (error) {
            console.error('Error handling new assumption:', error);
            socket.emit('error', 'Failed to add assumption');
        }
    });
    // Handle assumption position update
    socket.on(SocketEvents.UPDATE_ASSUMPTION_POSITION, (data) => {
        try {
            const assumption = room.assumptions.find((a) => a.id === data.assumptionId);
            if (assumption) {
                assumption.xPosition = data.xPosition;
                assumption.yPosition = data.yPosition;
                assumption.screenWidth = data.screenWidth;
                assumption.screenHeight = data.screenHeight;
                io.to(roomId).emit(SocketEvents.ALL_ASSUMPTIONS, room.assumptions);
            }
        }
        catch (error) {
            console.error('Error updating assumption position:', error);
        }
    });
    // Handle assumption selection
    socket.on(SocketEvents.SELECT_ASSUMPTION, (data) => {
        try {
            const assumption = room.assumptions.find((a) => a.id === data.assumptionId);
            if (assumption) {
                assumption.isSelected = data.isSelected;
                io.to(roomId).emit(SocketEvents.ALL_ASSUMPTIONS, room.assumptions);
            }
        }
        catch (error) {
            console.error('Error selecting assumption:', error);
        }
    });
    // Handle assumption deletion
    socket.on(SocketEvents.DELETE_ASSUMPTION, (data) => {
        try {
            room.assumptions = room.assumptions.filter((a) => a.id !== data.assumptionId);
            io.to(roomId).emit(SocketEvents.ALL_ASSUMPTIONS, room.assumptions);
            console.log(`Assumption deleted from room ${roomId}`);
        }
        catch (error) {
            console.error('Error deleting assumption:', error);
        }
    });
    // Timer controls
    socket.on(SocketEvents.TIMER_START, () => {
        startTimer(roomId);
        console.log(`Timer started in room ${roomId}`);
    });
    socket.on(SocketEvents.TIMER_STOP, () => {
        stopTimer(roomId);
        console.log(`Timer stopped in room ${roomId}`);
    });
    socket.on(SocketEvents.TIMER_ADD_TIME, (data) => {
        const room = rooms[roomId];
        if (room) {
            room.timer.seconds += data.seconds;
            room.timer.totalSeconds += data.seconds;
            io.to(roomId).emit(SocketEvents.TIMER_UPDATE, {
                roomId,
                seconds: room.timer.seconds,
                isRunning: room.timer.isRunning,
            });
        }
    });
    socket.on(SocketEvents.TIMER_REMOVE_TIME, (data) => {
        const room = rooms[roomId];
        if (room) {
            room.timer.seconds = Math.max(0, room.timer.seconds - data.seconds);
            io.to(roomId).emit(SocketEvents.TIMER_UPDATE, {
                roomId,
                seconds: room.timer.seconds,
                isRunning: room.timer.isRunning,
            });
        }
    });
    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        if (room) {
            // Remove user from room
            room.users = room.users.filter((u) => u.id !== socket.id);
            io.to(roomId).emit(SocketEvents.ALL_USERS, room.users);
            // Clean up empty rooms
            if (room.users.length === 0) {
                stopTimer(roomId);
                delete rooms[roomId];
                console.log(`Room ${roomId} cleaned up`);
            }
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
// Serve client for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Express error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
// Start server
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`📈 Stats: http://localhost:${PORT}/api/stats`);
});
// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    // Clean up all timers
    Object.keys(timers).forEach((roomId) => {
        clearInterval(timers[roomId]);
    });
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
export default app;
//# sourceMappingURL=server.js.map