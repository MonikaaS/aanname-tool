import { useCallback } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { SocketEvents } from '../types';
import type {
  NewAssumptionPayload,
  UpdateAssumptionPositionPayload,
  SelectAssumptionPayload,
  DeleteAssumptionPayload,
} from '../types';

export const useAssumptions = () => {
  const { state, dispatch, emit } = useAppContext();
  const { currentRoom, currentUser } = state;

  const addAssumption = useCallback(
    (text: string) => {
      if (!currentRoom) {
        console.warn('⚠️ Cannot add assumption: not in a room');
        return;
      }
      if (!currentUser) {
        console.warn('⚠️ Cannot add assumption: no current user');
        dispatch({
          type: 'SET_ERROR',
          payload: 'You must be logged in to add an assumption.',
        });
        return;
      }
      if (!text.trim()) {
        dispatch({ type: 'SET_ERROR', payload: 'Assumption text is required' });
        return;
      }

      const assumptionPayload: NewAssumptionPayload = {
        text: text.trim(),
        roomId: currentRoom,
        authorId: currentUser.id,
        authorName: currentUser.name,
      };

      emit(SocketEvents.NEW_ASSUMPTION, assumptionPayload);
    },
    [currentRoom, currentUser, emit, dispatch]
  );

  const updateAssumptionPosition = useCallback(
    (
      assumptionId: string,
      x: number,
      y: number,
      screenWidth: number,
      screenHeight: number
    ) => {
      if (!currentRoom) return;

      const positionPayload: UpdateAssumptionPositionPayload = {
        assumptionId,
        roomId: currentRoom,
        xPosition: x,
        yPosition: y,
        screenWidth,
        screenHeight,
      };

      emit(SocketEvents.UPDATE_ASSUMPTION_POSITION, positionPayload);
    },
    [currentRoom, emit]
  );

  const selectAssumption = useCallback(
    (assumptionId: string, isSelected: boolean) => {
      if (!currentRoom) return;

      const selectPayload: SelectAssumptionPayload = {
        assumptionId,
        roomId: currentRoom,
        isSelected,
      };

      emit(SocketEvents.SELECT_ASSUMPTION, selectPayload);
    },
    [currentRoom, emit]
  );

  const deleteAssumption = useCallback(
    (assumptionId: string) => {
      if (!currentRoom) return;

      const deletePayload: DeleteAssumptionPayload = {
        assumptionId,
        roomId: currentRoom,
      };

      emit(SocketEvents.DELETE_ASSUMPTION, deletePayload);
    },
    [currentRoom, emit]
  );

  return {
    addAssumption,
    updateAssumptionPosition,
    selectAssumption,
    deleteAssumption,
  };
};
