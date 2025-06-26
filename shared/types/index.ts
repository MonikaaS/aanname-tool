// User types
export interface User {
  id: string;
  name: string;
  roomId: string;
  joinedAt: Date;
}

// Assumption types
export interface Assumption {
  id: string;
  text: string;
  authorId: string;
  authorName: string;
  xPosition: number;
  yPosition: number;
  screenWidth: number;
  screenHeight: number;
  isActive: boolean;
  isSelected: boolean;
  createdAt: Date;
}

// Room types
export interface Room {
  id: string;
  name: string;
  users: User[];
  assumptions: Assumption[];
  timer: Timer;
  currentPhase: ProjectPhase;
  createdAt: Date;
}

// Timer types
export interface Timer {
  id: string;
  roomId: string;
  isRunning: boolean;
  totalSeconds: number;
  timeRemaining: number;
  endTime?: number; // UTC timestamp for when the timer ends
  phase: string;
  state: TimerState;
  createdAt: Date;
  updatedAt: Date;
}

export enum TimerState {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

// Project phases
export enum ProjectPhase {
  SETUP = 'setup',
  NAME_ENTRY = 'name-entry',
  ASSUMPTIONS = 'assumptions',
  CRITIQUE = 'critique',
  REFLECTION = 'reflection',
}

// Socket event types
export enum SocketEvents {
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
  QUESTIONS = 'questions',
}

// Socket event payloads
export interface NewUserPayload {
  name: string;
  roomId: string;
}

export interface NewAssumptionPayload {
  text: string;
  roomId: string;
  authorId: string;
  authorName: string;
}

export interface UpdateAssumptionPositionPayload {
  assumptionId: string;
  roomId: string;
  xPosition: number;
  yPosition: number;
  screenWidth: number;
  screenHeight: number;
}

export interface SelectAssumptionPayload {
  assumptionId: string;
  roomId: string;
  isSelected: boolean;
}

export interface DeleteAssumptionPayload {
  assumptionId: string;
  roomId: string;
}

export interface TimerPayload {
  roomId: string;
  seconds: number;
  isRunning: boolean;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Question types for the critique phase
export interface CritiqueQuestion {
  id: string;
  question: string;
  category: 'assumptions' | 'evidence' | 'alternatives' | 'implications';
}

// Constants
export const DEFAULT_TIMER_SECONDS = 300; // 5 minutes
export const CRITIQUE_QUESTIONS: CritiqueQuestion[] = [
  {
    id: '1',
    question: 'What evidence supports this assumption?',
    category: 'evidence',
  },
  {
    id: '2',
    question: 'What if the opposite were true?',
    category: 'alternatives',
  },
  {
    id: '3',
    question: 'What are the implications if this assumption is wrong?',
    category: 'implications',
  },
  {
    id: '4',
    question: 'How could we test this assumption?',
    category: 'evidence',
  },
  {
    id: '5',
    question: 'What biases might influence this assumption?',
    category: 'assumptions',
  },
];
