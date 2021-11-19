import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import AssumptionMessage from "../../compontents/assumption-message/index.js";
import Header from '../../compontents/header/index.js';
import Timer from '../../compontents/timer/index.js';
import useUsers from '../../client/users/index'
import AssumptionQuestion from '../../compontents/assumption-questions/index.js';

const Criticize = () => {
  const { roomId } = useParams(); // Gets roomId from URL

  const [haveName, setHaveName] = useState(false)
  const { users, sendUser} = useUsers(roomId); // Creates a websocket and manages messaging
  const [newUser, setNewUser] = useState(""); // Message to be sent

 
  const handleSendUser = () => {
   sendUser(newUser);
   setNewUser("");
 
 };

  return (
    <div className="relative">
      <div className={` ${haveName ? 'hidden' : '' } overflow-hidden bg-white w-screen fixed top-0 h-screen z-20`}>
      <div className={`w-1/3 font-open-sans font-medium text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>        
      <input
          value={newUser}
          placeholder="Wat is je naam?"
          className={` ${haveName ? 'hidden' : ''} box-shadow p-6 font-open-sans font-medium text-xl w-full h-10 pl-3 pr-8 placeholder-black border-black border-2 rounded-lg focus:outline-none`}
          onChange={event => {
          setNewUser(event.target.value)
          }}
          onKeyPress={event => {
                      if (event.key === 'Enter') {
                        handleSendUser()
                        setHaveName(true)
                      }
                    }}
        />
        <button onClick={event => {
                        handleSendUser()
                        setHaveName(true)
        }} 
        className="p-6 absolute inset-y-0 right-0 flex items-center px-4 bg-yellow-100 rounded-r-lg border-black border-2 focus:outline-none ">
          Start de sessie
        </button>
        </div>
      </div>
      <Header users={users}>
        
      </Header>
      <AssumptionMessage
          roomId={roomId}
      >
      </AssumptionMessage>
      <Link
        to={{
          pathname: `/${roomId}/reflect`,
        }}
        >
          Reflecteren
        </Link>
      <AssumptionQuestion></AssumptionQuestion>
      <Timer roomId={roomId}></Timer>
    </div>
  )};

export default Criticize;