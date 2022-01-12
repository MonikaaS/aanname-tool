import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";

const ALL_USERS = "AllUsers"; // Name of the event
// const SOCKET_SERVER_URL = window.location.origin;

const SOCKET_SERVER_URL = "http://localhost:4000";

const Users = () => {
  const { roomId } = useParams();
  const [users, setUsers] = useState([]); // Sent and received messages

  const socketRef = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(ALL_USERS, (user) => {
      const filteredUsers = Object.keys(user)
        .filter((key) => [roomId].includes(key))
        .reduce((obj, key) => {
          obj[key] = user[key];
          return obj;
        }, {});
      setUsers(filteredUsers[roomId]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  return (
    <div className="flex mr-5">
      {users !== null &&
        users.map((user, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-16 h-16 my-auto font-medium bg-yellow-100 border-2 border-white rounded-full text-xss user font-poppins"
          >
            <span className="w-10/12 text-center">{user.userName}</span>
          </div>
        ))}
    </div>
  );
};

export default Users;
