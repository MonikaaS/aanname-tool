import React, { useState, useRef, useEffect, } from 'react'
import Header from '../../compontents/header/index.js';
import { useParams, Link } from 'react-router-dom';
import DraggableComponent from '../../compontents/drag-assumptions/index.js';
import socketIOClient from "socket.io-client";

const ALL_ASSUMPTIONS = "AllAssumptions"; // Name of the event
const RECEIVE_POSITION = "ReceivePosition"; // Name of the event

const SOCKET_SERVER_URL = window.location.origin;
//const SOCKET_SERVER_URL = "http://localhost:4000";

const Reflect = (props) => {
  const { roomId } = useParams(); // Gets roomId from URL
  const [assumptions, setAssumptions] = useState([])
  
  const socketRef = useRef();

  useEffect(() => {
   
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
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
  
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };

  }, [roomId]);

  return (
    <div className="relative h-screen overflow-hidden">
      <Header></Header>
     <h1>Reflecteren</h1>
     {assumptions !== null && assumptions.map((assumption, i) => 
     (
      <DraggableComponent key={i} id={i} roomId={roomId} assumption={assumption}></DraggableComponent>
      )
     )}
     <div className="relative w-screen h-screen mt-5">
     <div className="absolute mr-5 text-2xl font-black text-center transform -translate-x-1/2 font-playfair-display top-1/10 left-1/2">Onzeker</div>
      <div className="absolute ml-5 text-2xl font-black text-center transform -translate-y-1/2 font-playfair-display top-1/2 right-1/10 ">Lage risico</div>
      <div className="absolute mr-5 text-2xl font-black text-center transform -translate-y-1/2 font-playfair-display top-1/2 left-1/10 ">Hoge risico</div>
      <div className="absolute ml-5 text-2xl font-black text-center transform -translate-x-1/2 font-playfair-display bottom-1/10 left-1/2">Zeker</div>
     <div className="absolute w-3/6 transform -translate-x-1/2 -translate-y-1/2 border-2 border-black top-1/2 left-1/2"></div>
     <div className="absolute transform -translate-x-1/2 -translate-y-1/2 border-2 border-black h-4/6 top-1/2 left-1/2"></div>
     </div>
    </div>
  )};

export default Reflect;