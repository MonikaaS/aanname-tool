import { useState, useEffect, useRef } from "react";
import useAssumptions from "../../client/assumptions/index";
import { motion, AnimatePresence, useTransform } from "framer-motion";
import socketIOClient from "socket.io-client";

const ALL_ASSUMPTIONS = "AllAssumptions"; // Name of the event

//const SOCKET_SERVER_URL = window.location.origin;
const SOCKET_SERVER_URL = "http://localhost:4000";

const AssumptionMessage = (props) => {
  const roomId = props.roomId;

  const socketRef = useRef();
  const { messages, sendMessage } = useAssumptions(roomId); // Creates a websocket and manages messaging
  const [assumptions, setAssumptions] = useState([]);
  const [newMessage, setNewMessage] = useState(""); // Message to be sent

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(ALL_ASSUMPTIONS, (assumption) => {
      const filteredUsers = Object.keys(assumption)
        .filter((key) => [roomId].includes(key))
        .reduce((obj, key) => {
          obj[key] = assumption[key];
          return obj;
        }, {});
      setAssumptions([...filteredUsers[roomId]]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  console.log(props);

  const container = {
    hidden: { opacity: 0.8, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <div className="w-10/12 p-6 mx-auto mt-5 ">
      {props.location === "criticize" ? (
        <div></div>
      ) : (
        <div className="w-48 h-48 p-4 m-2 mb-12 font-medium text-black bg-yellow-100 border-2 border-black rounded-md box-shadow-card font-open-sans">
          <textarea
            value={newMessage}
            placeholder="Schrijf hier je aanname..."
            className="w-full h-full placeholder-black bg-yellow-100 resize-none focus:outline-none"
            onChange={(event) => {
              setNewMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
        </div>
      )}

      <div className="flex flex-wrap w-full">
        {assumptions.length > 0 ? (
          assumptions.map((message, i) => (
            <motion.div
              className="container"
              variants={container}
              initial="hidden"
              animate="visible"
              key={i}
              className="w-48 h-48 p-4 m-2 font-medium text-black bg-yellow-100 border-2 border-black rounded-md box-shadow-card font-open-sans"
            >
              <p
                className={`message-item ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              >
                {message.assumption}
              </p>
            </motion.div>
          ))
        ) : (
          <div className="w-full text-center">
            <h1 className="w-full pt-6 mx-auto mt-5 mb-2 text-xl font-bold text-indigo-600">
              Er zijn nog geen aannames
            </h1>
            <h2 className="w-10/12 mx-auto text-xs font-light">
              Start met het opstellen van aannames
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssumptionMessage;
