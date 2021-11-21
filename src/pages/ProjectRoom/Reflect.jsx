import React from 'react';
import Header from '../../compontents/header/index.js';
import { useParams, Link } from 'react-router-dom';
import DraggableComponent from '../../compontents/drag-assumptions/index.js';

const Reflect = (props) => {
  const { roomId } = useParams(); // Gets roomId from URL

  return (
    <div className="relative h-screen">
      <Header></Header>
     <h1>Reflecteren</h1>
     <DraggableComponent roomId={roomId} ></DraggableComponent>
    </div>
  )};

export default Reflect;