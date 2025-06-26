export var TimerState;
(function (TimerState) {
    TimerState["IDLE"] = "idle";
    TimerState["RUNNING"] = "running";
    TimerState["PAUSED"] = "paused";
    TimerState["COMPLETED"] = "completed";
})(TimerState || (TimerState = {}));
// Project phases
export var ProjectPhase;
(function (ProjectPhase) {
    ProjectPhase["SETUP"] = "setup";
    ProjectPhase["NAME_ENTRY"] = "name-entry";
    ProjectPhase["ASSUMPTIONS"] = "assumptions";
    ProjectPhase["CRITIQUE"] = "critique";
    ProjectPhase["REFLECTION"] = "reflection";
})(ProjectPhase || (ProjectPhase = {}));
// Socket event types
export var SocketEvents;
(function (SocketEvents) {
    // User events
    SocketEvents["NEW_USER"] = "newUser";
    SocketEvents["ALL_USERS"] = "allUsers";
    SocketEvents["USER_DISCONNECT"] = "userDisconnect";
    // Assumption events
    SocketEvents["NEW_ASSUMPTION"] = "newAssumption";
    SocketEvents["ALL_ASSUMPTIONS"] = "allAssumptions";
    SocketEvents["UPDATE_ASSUMPTION_POSITION"] = "updateAssumptionPosition";
    SocketEvents["SELECT_ASSUMPTION"] = "selectAssumption";
    SocketEvents["DELETE_ASSUMPTION"] = "deleteAssumption";
    // Timer events
    SocketEvents["TIMER_START"] = "timerStart";
    SocketEvents["TIMER_STOP"] = "timerStop";
    SocketEvents["TIMER_UPDATE"] = "timerUpdate";
    SocketEvents["TIMER_ADD_TIME"] = "timerAddTime";
    SocketEvents["TIMER_REMOVE_TIME"] = "timerRemoveTime";
    // Phase events
    SocketEvents["PHASE_CHANGE"] = "phaseChange";
    // Question events
    SocketEvents["QUESTIONS"] = "questions";
})(SocketEvents || (SocketEvents = {}));
// Constants
export const DEFAULT_TIMER_SECONDS = 300; // 5 minutes
export const CRITIQUE_QUESTIONS = [
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
//# sourceMappingURL=index.js.map