import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const NEW_USER_EVENT = "newUser"; // Name of the event
// const SOCKET_SERVER_URL = window.location.origin;

const SOCKET_SERVER_URL = "http://localhost:4000";

const useUsers = (roomId) => {
  const socketRef = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendUser = (userBody) => {
    socketRef.current.emit(NEW_USER_EVENT, {
      userName: userBody,
      senderId: socketRef.current.id,
      roomId: roomId,
    });
  };

  return { sendUser };
};

export default useUsers;

//used from https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0
