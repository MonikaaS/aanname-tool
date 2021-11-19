import React, { useState, useEffect, } from 'react'
import Draggable from 'react-draggable';

const DraggableComponent = () => { 
 const [yPosition, setYposition] = useState(0)
 const [xPosition, setXposition] = useState(0)


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
