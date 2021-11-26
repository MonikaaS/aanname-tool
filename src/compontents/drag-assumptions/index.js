import React, { useState, useRef, useEffect, } from 'react'
import Draggable from 'react-draggable';
import socketIOClient from "socket.io-client";

const RECEIVE_POSITION = "ReceivePosition"; // Name of the event
const SOCKET_SERVER_URL = window.location.origin;

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
  const [refCurrent, setRefCurrent] = useState([]);
  const [targetId, setTargetId] = useState(null)
  const ref = useRef(null);

useEffect(() => {
   
  // Creates a WebSocket connection
  socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
    query: { roomId },
  });

  socketRef.current.on(RECEIVE_POSITION, (data) => {
    //console.log(ref.current.style.transform)
    console.log(data.targetId)
    //console.log(ref.current.id)
    if(targetId){
      console.log('yes')
    }
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

function onMouseMove(e) {
  if (!isDragging) return;
  setPos({
    x: e.x - ref.current.offsetWidth / 2,
    y: e.y - ref.current.offsetHeight / 2,
  });
  e.stopPropagation();
  e.preventDefault();
}

function onMouseUp(e) {
  setIsDragging(false);
  e.stopPropagation();
  e.preventDefault();
}

function onMouseDown(e) {
  if (e.button !== 0) return;
  setIsDragging(true);

  setPos({
    x: e.x,
    y: e.y,
  });

  e.stopPropagation();
  e.preventDefault();
}

// When the element mounts, attach an mousedown listener
useEffect(() => {
  ref.current.addEventListener("mousedown", onMouseDown);

  console.log(ref.current)

  setRefCurrent(ref.current)
  setTargetId(ref.current.id)

  return () => {
    ref.current.removeEventListener("mousedown", onMouseDown);
  };
}, [ref.current]);

useEffect(() => {
  if (isDragging) {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
  } else {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
  }
  return () => {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
  };
}, [isDragging]);

//console.log(refCurrent)
    
  return (
   <div 
   id={props.id}
   ref={ref}
   style={{
     transform: `translate(${pos.x}px, ${pos.y}px)` 
   }}
   className="w-48 h-48 p-4 m-2 font-medium text-black bg-yellow-100 border-2 border-black rounded-md cursor-pointer box-shadow-card font-open-sans">
    <div
    className={"`message-item"}
      >
      {props.assumption.assumption}
    </div>
  </div>
  )
}

export default DraggableComponent
