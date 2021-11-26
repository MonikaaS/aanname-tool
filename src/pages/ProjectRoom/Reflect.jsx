import React, { useState, useRef, useEffect, } from 'react'
import Header from '../../compontents/header/index.js';
import { useParams, Link } from 'react-router-dom';
import DraggableComponent from '../../compontents/drag-assumptions/index.js';
import socketIOClient from "socket.io-client";

const ALL_ASSUMPTIONS = "AllAssumptions"; // Name of the event
const RECEIVE_POSITION = "ReceivePosition"; // Name of the event

const SOCKET_SERVER_URL = window.location.origin;

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
    </div>
  )};

export default Reflect;