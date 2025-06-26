import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { User, Assumption, ProjectPhase, Timer, SocketEvents } from '../types';
import { SOCKET_URL } from '../utils/constants';

interface AppState {
  // User state
  currentUser: User | null;
  users: User[];

  // Room state
  currentRoom: string | null;
  assumptions: Assumption[];

  // UI state
  currentPhase: ProjectPhase;
  timer: Timer | null;
  isLoading: boolean;
  error: string | null;

  // Socket state
  isConnected: boolean;
  socketId: string | null;

  // Question state
  showQuestion: boolean;
  currentQuestion: number;
}

type AppAction =
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'REMOVE_USER'; payload: string }
  | { type: 'SET_CURRENT_ROOM'; payload: string | null }
  | { type: 'SET_ASSUMPTIONS'; payload: Assumption[] }
  | { type: 'ADD_ASSUMPTION'; payload: Assumption }
  | {
      type: 'UPDATE_ASSUMPTION';
      payload: { id: string; updates: Partial<Assumption> };
    }
  | { type: 'REMOVE_ASSUMPTION'; payload: string }
  | { type: 'SET_CURRENT_PHASE'; payload: ProjectPhase }
  | { type: 'SET_TIMER'; payload: Timer | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'SET_SOCKET_ID'; payload: string | null }
  | {
      type: 'SET_QUESTIONS_STATE';
      payload: { showQuestion: boolean; currentQuestion: number };
    }
  | { type: 'RESET_STATE' };

const initialState: AppState = {
  currentUser: null,
  users: [],
  currentRoom: null,
  assumptions: [],
  currentPhase: ProjectPhase.SETUP,
  timer: null,
  isLoading: false,
  error: null,
  isConnected: false,
  socketId: null,
  showQuestion: false,
  currentQuestion: 0,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };

    case 'SET_USERS':
      return { ...state, users: action.payload };

    case 'ADD_USER':
      return {
        ...state,
        users: [
          ...state.users.filter((u) => u.id !== action.payload.id),
          action.payload,
        ],
      };

    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };

    case 'SET_CURRENT_ROOM':
      return { ...state, currentRoom: action.payload };

    case 'SET_ASSUMPTIONS':
      console.log(
        `📝 [AppContext] SET_ASSUMPTIONS: ${action.payload.length} assumptions`
      );
      return { ...state, assumptions: action.payload };

    case 'ADD_ASSUMPTION':
      console.log(
        `➕ [AppContext] ADD_ASSUMPTION: "${action.payload.text.substring(
          0,
          30
        )}..."`
      );
      return {
        ...state,
        assumptions: [
          ...state.assumptions.filter((a) => a.id !== action.payload.id),
          action.payload,
        ],
      };

    case 'UPDATE_ASSUMPTION':
      return {
        ...state,
        assumptions: state.assumptions.map((assumption) =>
          assumption.id === action.payload.id
            ? { ...assumption, ...action.payload.updates }
            : assumption
        ),
      };

    case 'REMOVE_ASSUMPTION':
      return {
        ...state,
        assumptions: state.assumptions.filter((a) => a.id !== action.payload),
      };

    case 'SET_CURRENT_PHASE':
      return { ...state, currentPhase: action.payload };

    case 'SET_TIMER':
      return { ...state, timer: action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'SET_CONNECTED':
      return { ...state, isConnected: action.payload };

    case 'SET_SOCKET_ID':
      return { ...state, socketId: action.payload };

    case 'RESET_STATE':
      return { ...initialState, currentUser: state.currentUser };

    case 'SET_QUESTIONS_STATE':
      return {
        ...state,
        showQuestion: action.payload.showQuestion,
        currentQuestion: action.payload.currentQuestion,
      };

    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  connect: (roomId: string) => void;
  disconnect: () => void;
  emit: (event: string, data?: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const socketRef = useRef<Socket | null>(null);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      console.log('🔌 Disconnecting socket...');
      socketRef.current.disconnect();
      socketRef.current.removeAllListeners();
      socketRef.current = null;
      dispatch({ type: 'SET_CONNECTED', payload: false });
      dispatch({ type: 'SET_SOCKET_ID', payload: null });
    }
  }, []);

  const connect = useCallback(
    (roomId: string) => {
      if (socketRef.current || !roomId) {
        return;
      }

      console.log(`🔌 Attempting to connect to room: ${roomId}`);
      dispatch({ type: 'SET_LOADING', payload: true });

      const socket = io(SOCKET_URL, {
        query: { roomId },
        transports: ['websocket', 'polling'],
        timeout: 10000,
        forceNew: true,
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        console.log(
          `✅ [AppContext] Connected to room: ${roomId} with socket ID: ${socket.id}`
        );
        dispatch({ type: 'SET_CONNECTED', payload: true });
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_ERROR', payload: null });
        dispatch({ type: 'SET_CURRENT_ROOM', payload: roomId });
        dispatch({ type: 'SET_SOCKET_ID', payload: socket.id || null });
      });

      socket.on('disconnect', (reason) => {
        console.log(`❌ Disconnected from room: ${roomId}. Reason: ${reason}`);
        dispatch({ type: 'SET_CONNECTED', payload: false });
        dispatch({ type: 'SET_CURRENT_ROOM', payload: null });
        dispatch({ type: 'SET_SOCKET_ID', payload: null });
        if (reason === 'io server disconnect') {
          dispatch({
            type: 'SET_ERROR',
            payload: 'Connection terminated by server',
          });
        }
      });

      socket.on('connect_error', (err) => {
        console.error(`🔴 Connection error:`, err.message);
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_ERROR', payload: 'Connection failed' });
        disconnect();
      });

      // App-level event listeners
      socket.on(SocketEvents.ALL_USERS, (allUsers: User[]) => {
        dispatch({ type: 'SET_USERS', payload: allUsers });
      });

      socket.on(SocketEvents.ALL_ASSUMPTIONS, (assumptions: Assumption[]) => {
        dispatch({ type: 'SET_ASSUMPTIONS', payload: assumptions });
      });

      socket.on(SocketEvents.NEW_ASSUMPTION, (assumption: Assumption) => {
        dispatch({ type: 'ADD_ASSUMPTION', payload: assumption });
      });

      const handleAssumptionUpdate = (updatedAssumption: Assumption) => {
        dispatch({
          type: 'UPDATE_ASSUMPTION',
          payload: {
            id: updatedAssumption.id,
            updates: updatedAssumption,
          },
        });
      };

      socket.on(
        SocketEvents.UPDATE_ASSUMPTION_POSITION,
        handleAssumptionUpdate
      );
      socket.on(SocketEvents.SELECT_ASSUMPTION, handleAssumptionUpdate);

      socket.on(
        SocketEvents.DELETE_ASSUMPTION,
        (deletedAssumption: { id: string }) => {
          dispatch({
            type: 'REMOVE_ASSUMPTION',
            payload: deletedAssumption.id,
          });
        }
      );

      socket.on(SocketEvents.TIMER_UPDATE, (timer: Timer) => {
        dispatch({ type: 'SET_TIMER', payload: timer });
      });

      socket.on(
        SocketEvents.QUESTIONS,
        (data: { showQuestion: boolean; currentQuestion: number }) => {
          dispatch({ type: 'SET_QUESTIONS_STATE', payload: data });
        }
      );
    },
    [dispatch, disconnect]
  );

  const emit = useCallback(
    (event: string, data?: any) => {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit(event, data);
      } else {
        console.warn(`⚠️ Cannot emit ${event}: socket not connected`);
        dispatch({
          type: 'SET_ERROR',
          payload: 'Cannot send data: not connected',
        });
      }
    },
    [dispatch]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return (
    <AppContext.Provider value={{ state, dispatch, connect, disconnect, emit }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const useAppState = () => {
  const { state } = useAppContext();
  return state;
};

// Selector hooks for easier access to specific state
export const useCurrentUser = () => {
  const { state } = useAppContext();
  return state.currentUser;
};

export const useUsers = () => {
  const { state } = useAppContext();
  return state.users;
};

export const useCurrentRoom = () => {
  const { state } = useAppContext();
  return state.currentRoom;
};

export const useAssumptions = () => {
  const { state } = useAppContext();
  return state.assumptions;
};

export const useCurrentPhase = () => {
  const { state } = useAppContext();
  return state.currentPhase;
};

export const useTimer = () => {
  const { state } = useAppContext();
  return state.timer;
};

export const useConnectionState = () => {
  const { state } = useAppContext();
  return {
    isConnected: state.isConnected,
    isLoading: state.isLoading,
    error: state.error,
  };
};
