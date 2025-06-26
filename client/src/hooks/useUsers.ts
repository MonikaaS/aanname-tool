import { useCallback } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { SocketEvents } from '../types';

export const useUsers = () => {
  const { state, emit } = useAppContext();
  const { currentRoom, socketId } = state;

  const sendUser = useCallback(
    (name: string) => {
      if (!currentRoom || !socketId) {
        console.warn(
          '⚠️ Cannot send user: not in a room or no socket connection'
        );
        return;
      }

      emit(SocketEvents.NEW_USER, {
        name,
        senderId: socketId,
        roomId: currentRoom,
      });
    },
    [currentRoom, socketId, emit]
  );

  return { sendUser };
};

//used from https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0
