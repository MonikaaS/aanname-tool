import { useState, useEffect, useRef } from "react";
import useAssumptions from "../../client/assumptions/index";
import { motion, AnimatePresence, useTransform } from "framer-motion";
import socketIOClient from "socket.io-client";
import { ReactComponent as HelpIcon } from "../../assets/svg/help-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/svg/edit-icon.svg";

const ALL_ASSUMPTIONS = "AllAssumptions"; // Name of the event

// const SOCKET_SERVER_URL = window.location.origin;
const SOCKET_SERVER_URL = "http://localhost:4000";
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const AssumptionMessage = (props) => {
  const roomId = props.roomId;

  const assumptionsTips = [
    "Wat denk jij dat de gebruiker wilt?",
    "Wat denk jij dat de verschillende stakeholders willen?",
    "Wat denk jij dat het eindproduct gaat worden?",
  ];

  const socketRef = useRef();
  const [assumptions, setAssumptions] = useState([]);
  const { messages, sendMessage } = useAssumptions(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(""); // Message to be sent
  const [currentAssumptionTip, setCurrentAssumptionTip] = useState(1);
  const [help, setHelp] = useState(false);
  const [inputRef, setInputFocus] = useFocus();

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  const handleAssigneeOnClick = () => {
    setCurrentAssumptionTip((prev) => (prev + 1) % assumptionsTips.length);
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

  const item = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
    },
  };

  return (
    <div className="w-10/12 pt-6 mx-auto ">
      {props.location === "criticize" ? (
        <div></div>
      ) : (
        <div className="w-48 h-48 p-2 m-2 mb-12 font-medium text-black bg-yellow-100 border-2 border-black rounded-md box-shadow-card font-open-sans">
          <div className="relative z-30 flex pb-3 pl-3">
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={(event) => {
                setInputFocus(true);
                setHelp(false);
              }}
            >
              {" "}
              <EditIcon className="mr-2 cursor-pointer"></EditIcon>
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={(event) => {
                setHelp(true);
                handleAssigneeOnClick();
              }}
            >
              {" "}
              <HelpIcon className="mr-2 cursor-pointer"></HelpIcon>
            </motion.div>
          </div>
          <textarea
            ref={inputRef}
            value={newMessage}
            placeholder={`${
              help
                ? assumptionsTips[currentAssumptionTip]
                : "Schrijf hier je aanname..."
            }`}
            className="w-full h-32 p-4 placeholder-black bg-yellow-100 rounded-md resize-none hover:bg-white hover:bg-opacity-25 focus:outline-none"
            onChange={(event) => {
              setNewMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSendMessage();
              }
            }}
          />
        </div>
      )}

      <div className="container flex flex-wrap w-full">
        {assumptions.length !== 0 ? (
          assumptions.map((message, index) => (
            <motion.div
              key={index}
              variants={item}
              className="w-48 h-48 p-4 m-2 font-medium text-black bg-yellow-100 border-2 border-black rounded-md item box-shadow-card font-open-sans"
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
