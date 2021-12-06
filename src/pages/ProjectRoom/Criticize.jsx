import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import AssumptionMessage from "../../compontents/assumption-message/index.js";
import useUsers from '../../client/users/index'
import AssumptionQuestion from '../../compontents/assumption-questions/index.js';

const Criticize = () => {
  const { roomId } = useParams(); // Gets roomId from URL

  const { users, sendUser} = useUsers(roomId); // Creates a websocket and manages messaging


  return (
    <div className="relative w-full">
      <AssumptionQuestion roomId={roomId} ></AssumptionQuestion>
      <AssumptionMessage
          roomId={roomId}
      >
      </AssumptionMessage>
    </div>
  )};

export default Criticize;