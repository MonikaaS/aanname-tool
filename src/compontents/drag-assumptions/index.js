import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import socketIOClient from "socket.io-client";

const RECEIVE_POSITION = "ReceivePosition"; // Name of the event
const ALL_ASSUMPTIONS = "AllAssumptions"; // Name of the event

const SOCKET_SERVER_URL = window.location.origin;
// const SOCKET_SERVER_URL = "http://localhost:4000";
const DraggableComponent = (props) => {
  const roomId = props.roomId;

  const socketRef = useRef();
  const [xPosition, setXposition] = useState(0);
  const [yPosition, setYposition] = useState(0);
  const [assumptions, setAssumptions] = useState([]);
  const [currentlyDragged, setCurrentlyDragged] = useState("");
  const [hover, setHover] = useState("false");
  const ref = useRef([]);

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

    socketRef.current.emit(RECEIVE_POSITION, {
      assumption: currentlyDragged,
      xPosition: xPosition,
      yPosition: yPosition,
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, xPosition, yPosition, currentlyDragged]);

  const handleDrag = (e, info) => {
    setXposition(info.offset.x);
    setYposition(info.offset.y);
    console.log(info);
  };

  return (
    <div>
      {assumptions !== null &&
        assumptions.map((assumption, i) => (
          <motion.div
            drag
            whileDrag={{ scale: 1.1 }}
            key={i}
            ref={ref}
            dragTransition={{ power: 0 }}
            id={props.id}
            onDragEnd={handleDrag}
            style={{
              x: assumption.xPosition,
              y: assumption.yPosition,
              opacity: 1,
            }}
            onMouseEnter={(event) => {
              setHover(true);
            }}
            onMouseUp={(event) => {
              setCurrentlyDragged(assumption.assumption);
            }}
            className={`assumption-card z-40 w-32 h-32 p-4 m-2 text-black bg-yellow-100 border-2 border-black rounded-md cursor-pointer hover:z-50 text-xs font-open-sans`}
          >
            <div className={"`message-item"}>{assumption.assumption}</div>
          </motion.div>
        ))}
    </div>
  );
};

export default DraggableComponent;
