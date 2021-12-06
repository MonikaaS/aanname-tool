import React, { useCallback, useState, useRef, useEffect, } from 'react'
import { motion, useMotionValue, useTransform } from "framer-motion";
import socketIOClient from "socket.io-client";

const RECEIVE_POSITION = "ReceivePosition"; // Name of the event
const ALL_ASSUMPTIONS = "AllAssumptions"; // Name of the event

const SOCKET_SERVER_URL = window.location.origin;
//const SOCKET_SERVER_URL = "http://localhost:4000";

const DraggableComponent = (props) => { 

 const roomId = props.roomId

 const socketRef = useRef();
 const [xPosition, setXposition] = useState(0)
 const [yPosition, setYposition] = useState(0)
 const [assumptions, setAssumptions] = useState([])
 const [currentlyDragged, setCurrentlyDragged] = useState('')
 const ref = useRef([]);  

useEffect(() => {
   
  // Creates a WebSocket connection
  socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
    query: { roomId },
  });

  socketRef.current.on(RECEIVE_POSITION, (data) => {
    console.log(data)
 });

 socketRef.current.on(ALL_ASSUMPTIONS, (assumption) => {
  const filteredUsers = Object.keys(assumption)
        .filter(key => [roomId].includes(key))
        .reduce((obj, key) => {
          obj[key] = assumption[key];
          return obj;
        }, {});
        setAssumptions([...filteredUsers[roomId]]);
});

  socketRef.current.emit(RECEIVE_POSITION, {
    assumption: currentlyDragged,
    xPosition: xPosition, 
    yPosition: yPosition
   });
     
  // Destroys the socket reference
  // when the connection is closed
  return () => {
    socketRef.current.disconnect();
  };
}, [roomId, xPosition, yPosition, currentlyDragged]);

const handleDrag = (e, info) => {
  //ref.current[i].focus();
  //console.log(ref)
  //console.log(ref.current.textContent)
  //setCurrentlyDragged(e.explicitOriginalTarget.textContent)
  console.log(e.clientX)
  setXposition(e.clientX - 189)
  setYposition(e.clientY - 208)
}

console.log(assumptions)

  return (
    <div>
      {assumptions !== null && assumptions.map((assumption, i) => 
        (
        <motion.div 
        drag
        whileDrag={{ scale: 1.1 }}
        key={i}
        ref={ref}
        dragTransition={{ power: 0 }}
        id={props.id}
        onDragEnd={handleDrag}
        style={{x: assumption.xPosition, y: assumption.yPosition, opacity: 1 }}
        onMouseUp = {event => {
          console.log(assumption.assumption)
         setCurrentlyDragged(assumption.assumption)   
        }}
        className="absolute z-30 w-48 h-48 p-4 m-2 font-medium text-black bg-yellow-100 border-2 border-black rounded-md cursor-pointer top-28 left-10 box-shadow-card font-open-sans">
        <div
        className={"`message-item"}
          >
          {assumption.assumption}
        </div>
      </motion.div>
      ))}
    </div>
  )
}

export default DraggableComponent
