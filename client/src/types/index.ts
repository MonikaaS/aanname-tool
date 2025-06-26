// Re-export shared types
export * from '../../../shared/types/index.js';

// Client-specific types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface UseSocketReturn {
  socket: any; // TODO: Add proper Socket.IO types
  connected: boolean;
  error: string | null;
  emit: (event: string, data?: any) => void;
}

export interface Position {
  x: number;
  y: number;
}

export interface DragState {
  isDragging: boolean;
  startPosition: Position;
  currentPosition: Position;
}

export interface WindowDimensions {
  width: number;
  height: number;
}

export interface LocalStorageKeys {
  USER_NAME: 'assumption-tool-user-name';
  ROOM_PREFERENCES: 'assumption-tool-room-preferences';
}

// Form types
export interface RoomForm {
  name: string;
}

export interface UserForm {
  name: string;
}

export interface AssumptionForm {
  text: string;
}

// Component state types
export interface TimerState {
  seconds: number;
  isRunning: boolean;
  totalSeconds: number;
}

export interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// Navigation types
export type NavigationPhase =
  | 'home'
  | 'name-entry'
  | 'setup'
  | 'assumptions'
  | 'critique'
  | 'reflection';

// Animation variants for Framer Motion
export interface AnimationVariants {
  initial: object;
  animate: object;
  exit?: object;
  transition?: object;
}

// Error types
export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

// Socket connection states
export enum ConnectionState {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  RECONNECTING = 'reconnecting',
  ERROR = 'error',
}

// Socket Events
export enum SocketEvents {
  // Connection events
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  
  // User events
  NEW_USER = 'newUser',
  ALL_USERS = 'allUsers',
  USER_DISCONNECT = 'userDisconnect',
  
  // Assumption events
  NEW_ASSUMPTION = 'newAssumption',
  ALL_ASSUMPTIONS = 'allAssumptions',
  UPDATE_ASSUMPTION_POSITION = 'updateAssumptionPosition',
  SELECT_ASSUMPTION = 'selectAssumption',
  DELETE_ASSUMPTION = 'deleteAssumption',
  
  // Timer events
  TIMER_START = 'timerStart',
  TIMER_STOP = 'timerStop',
  TIMER_UPDATE = 'timerUpdate',
  TIMER_ADD_TIME = 'timerAddTime',
  TIMER_REMOVE_TIME = 'timerRemoveTime',
  
  // Phase events
  PHASE_CHANGE = 'phaseChange',
  
  // Question events
  QUESTIONS = 'questions'
}

// Timer state enum
export enum TimerStateEnum {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed'
}
