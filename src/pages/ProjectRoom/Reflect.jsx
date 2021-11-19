import React from 'react';
import Header from '../../compontents/header/index.js';
import DraggableComponent from '../../compontents/drag-assumptions/index.js';

const Reflect = (props) => {
  return (
    <div className="relative h-screen">
      <Header></Header>
     <h1>Reflecteren</h1>
     <DraggableComponent></DraggableComponent>
    </div>
  )};

export default Reflect;