import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { SocketEvents, Timer as TimerState } from '../types';

export const useTimer = () => {
  const { state, emit } = useAppContext();
  const [timer, setTimer] = useState<TimerState | null>(state.timer);
  const [displayTime, setDisplayTime] = useState(0);

  // Update local timer state when context changes
  useEffect(() => {
    setTimer(state.timer);
  }, [state.timer]);

  useEffect(() => {
    if (!timer) return;

    // Initial sync of display time
    if (timer.isRunning && timer.endTime) {
      const remaining = Math.max(0, timer.endTime - Date.now());
      setDisplayTime(Math.round(remaining / 1000));
    } else {
      setDisplayTime(timer.timeRemaining);
    }

    // Countdown interval, only runs when timer is active
    if (timer.isRunning) {
      const intervalId = setInterval(() => {
        if (timer.endTime) {
          const remaining = Math.max(0, timer.endTime - Date.now());
          setDisplayTime(Math.round(remaining / 1000));

          // Stop the timer on the client when it reaches zero
          if (remaining === 0) {
            setTimer((t) => (t ? { ...t, isRunning: false } : null));
            clearInterval(intervalId);
          }
        }
      }, 500); // Sync every 500ms for smoothness

      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const startTimer = useCallback(() => {
    emit(SocketEvents.TIMER_START);
  }, [emit]);

  const stopTimer = useCallback(() => {
    emit(SocketEvents.TIMER_STOP);
  }, [emit]);

  const addTime = useCallback(
    (seconds: number) => {
      emit(SocketEvents.TIMER_ADD_TIME, { seconds });
    },
    [emit]
  );

  const removeTime = useCallback(
    (seconds: number) => {
      emit(SocketEvents.TIMER_REMOVE_TIME, { seconds });
    },
    [emit]
  );

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  }, []);

  return {
    time: displayTime,
    isRunning: timer?.isRunning ?? false,
    timerState: timer?.state ?? null,
    startTimer,
    stopTimer,
    addTime,
    removeTime,
    formatTime,
  };
};
