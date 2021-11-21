import React, { useState, useRef, useEffect, } from 'react'
import Draggable from 'react-draggable';
import socketIOClient from "socket.io-client";

const RECEIVE_POSITION = "ReceivePosition"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";

const DraggableComponent = (props) => { 
 const [yPosition, setYposition] = useState(0)
 const [xPosition, setXposition] = useState(0)
 const roomId = props.roomId

 const socketRef = useRef();

 useEffect(() => {
   
  // Creates a WebSocket connection
  socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
    query: { roomId },
  });

  socketRef.current.on(RECEIVE_POSITION, (data) => {
   setYposition(data.yPosition)
   setXposition(data.xPosition)
 });

 socketRef.current.emit(RECEIVE_POSITION, {
   yPosition: yPosition,
   xPosition: xPosition
 });
     
  // Destroys the socket reference
  // when the connection is closed
  return () => {
    socketRef.current.disconnect();
  };
}, [roomId, yPosition, xPosition]);

 const eventLogger = (e, data) => {
  setYposition(data.y)
  setXposition(data.x)
  console.log(data)
  //console.log('defaultPosition', { valueX: data.x, valueY: data.y });
};

console.log(yPosition)

  return (
   <div className="mt-24">
    <Draggable position={{x: xPosition, y: yPosition}} defaultPosition={{ x: xPosition, y: yPosition }} onStop={eventLogger}>
      <h2 style={{ cursor: 'grab' }}>
        dragable
      </h2>
    </Draggable>
    </div>
  )
}

export default DraggableComponent
