import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import socketIOClient from "socket.io-client";

const ALL_USERS = "AllUsers"; // Name of the event
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
            .filter(key => [roomId].includes(key))
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
  }, []);
  
return (
 <div className="flex mr-5">
  {users !== null && users.map((user, i) => (
     <div key={i} className="border-white border-2 user font-open-sans font-bold text-xs my-auto rounded-full h-16 w-16 bg-yellow-100 flex items-center justify-center">
      <span>{user.userName}</span>
     </div>
   ))}
  </div>
 )};

 export default Users;