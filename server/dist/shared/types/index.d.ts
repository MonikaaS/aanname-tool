export interface User {
    id: string;
    name: string;
    roomId: string;
    joinedAt: Date;
}
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
export interface Room {
    id: string;
    name: string;
    users: User[];
    assumptions: Assumption[];
    timer: Timer;
    currentPhase: ProjectPhase;
    createdAt: Date;
}
export interface Timer {
    id: string;
    roomId: string;
    isRunning: boolean;
    seconds: number;
    totalSeconds: number;
    timeRemaining: number;
    phase: string;
    state: TimerState;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum TimerState {
    IDLE = "idle",
    RUNNING = "running",
    PAUSED = "paused",
    COMPLETED = "completed"
}
export declare enum ProjectPhase {
    SETUP = "setup",
    NAME_ENTRY = "name-entry",
    ASSUMPTIONS = "assumptions",
    CRITIQUE = "critique",
    REFLECTION = "reflection"
}
export declare enum SocketEvents {
    NEW_USER = "newUser",
    ALL_USERS = "allUsers",
    USER_DISCONNECT = "userDisconnect",
    NEW_ASSUMPTION = "newAssumption",
    ALL_ASSUMPTIONS = "allAssumptions",
    UPDATE_ASSUMPTION_POSITION = "updateAssumptionPosition",
    SELECT_ASSUMPTION = "selectAssumption",
    DELETE_ASSUMPTION = "deleteAssumption",
    TIMER_START = "timerStart",
    TIMER_STOP = "timerStop",
    TIMER_UPDATE = "timerUpdate",
    TIMER_ADD_TIME = "timerAddTime",
    TIMER_REMOVE_TIME = "timerRemoveTime",
    PHASE_CHANGE = "phaseChange",
    QUESTIONS = "questions"
}
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
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}
export interface CritiqueQuestion {
    id: string;
    question: string;
    category: 'assumptions' | 'evidence' | 'alternatives' | 'implications';
}
export declare const DEFAULT_TIMER_SECONDS = 300;
export declare const CRITIQUE_QUESTIONS: CritiqueQuestion[];
