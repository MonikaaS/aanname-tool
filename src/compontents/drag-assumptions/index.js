import React, { useState, useRef, useEffect, } from 'react'
import { motion, useMotionValue, useTransform } from "framer-motion";
import socketIOClient from "socket.io-client";

const RECEIVE_POSITION = "ReceivePosition"; // Name of the event
const SOCKET_SERVER_URL = window.location.origin;
//const SOCKET_SERVER_URL = "http://localhost:4000";

const DraggableComponent = (props) => { 

 const roomId = props.roomId
 const [newClientX, setNewClientX] = useState(0)
 const [newClientY, setNewClientY] = useState(0)
 const [transform, setTransform] = useState(undefined)
 const [hasClicked, setHasclicked] = useState(false)
 const [pressed, setPressed] = useState(false)
 const [position, setPosition] = useState({x: 0, y: 0})


 const socketRef = useRef();

//  useEffect(() => {
   
//   // Creates a WebSocket connection
//   socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
//     query: { roomId },
//   });

//   socketRef.current.on(RECEIVE_POSITION, (data) =>{ 
//     console.log(props.assumption.xPosition)
//     console.log(data.xPosition)

//     if(props.assumption.xPosition === data.xPosition){
//       setPosition({x: props.assumption.xPosition, y: props.assumption.yPosition})
//     }
//   })

//   socketRef.current.emit(RECEIVE_POSITION, { 
//     assumption: props.assumption.assumption,
//     xPosition: xPosition, 
//     yPosition: yPosition
//   })

//   // Destroys the socket reference
//   // when the connection is closed
//   return () => {
//     socketRef.current.disconnect();
//   };
// }, [roomId]);

// const onStop= (e, data) => {

//   setYposition(data.y)
//   setXposition(data.x)

//   setPosition({x: data.y, y:  data.x})
// }

// const handleDrag= (e, data) => {

//     setYposition(data.y)
//     setXposition(data.x)

//     setPosition({x: data.y, y:  data.x})
// }

const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [targetId, setTargetId] = useState(null)
  const ref = useRef(null);

useEffect(() => {
   
  // Creates a WebSocket connection
  socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
    query: { roomId },
  });

  socketRef.current.on(RECEIVE_POSITION, (data) => {
 });

 socketRef.current.emit(RECEIVE_POSITION, {
  targetId: targetId,
 });
     
  // Destroys the socket reference
  // when the connection is closed
  return () => {
    socketRef.current.disconnect();
  };
}, [roomId, targetId, pos]);

    
  return (
   <motion.div 
   drag
   dragTransition={{ power: 0 }}
   id={props.id}
   ref={ref}
   className="absolute z-20 w-48 h-48 p-4 m-2 font-medium text-black bg-yellow-100 border-2 border-black rounded-md cursor-pointer top-28 left-10 box-shadow-card font-open-sans">
    <div
    className={"`message-item"}
      >
      {props.assumption.assumption}
    </div>
  </motion.div>
  )
}

export default DraggableComponent
