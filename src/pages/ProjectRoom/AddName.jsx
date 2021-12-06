import { useState } from 'react';
import { useParams, Route, Link } from 'react-router-dom';

import useUsers from '../../client/users/index'

const AddName = () => {
  const { roomId } = useParams(); // Gets roomId from URL

  const [haveName, setHaveName] = useState(false)
  const { users, sendUser} = useUsers(roomId); // Creates a websocket and manages messaging
  const [newUser, setNewUser] = useState(""); // Message to be sent

 
  const handleSendUser = () => {
   sendUser(newUser);
   setNewUser("");
 
 };

  return (
    <div className={`relative ${haveName ? 'hidden' : ''} text-center w-full`}>
     <div className="relative w-1/2 mx-auto">
        <h1 className="relative z-10 mt-12 mb-40 text-6xl font-black text-center font-playfair-display">{roomId}</h1>
       <div className="absolute w-1/2 h-10 mx-auto bg-yellow-100 top-1/2 left-36"></div>
     </div>
     <div className={`mt-10 relative w-1/3 mx-auto text-xl font-medium font-open-san`}>        
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
       </div>   
      <div className={`my-20 relative w-1/3 mx-auto text-xl font-medium font-open-san`}>     
       <input
           value={window.location.href}
           placeholder="Wat is je naam?"
           className={` ${haveName ? 'hidden' : ''} cursor-pointer box-shadow p-6 font-open-sans font-medium text-xl w-full h-10 pl-3 pr-8 placeholder-black border-black border-2 rounded-lg focus:outline-none`}
         />
       <button onClick={() =>  navigator.clipboard.writeText(window.location.href)}
          className="absolute inset-y-0 right-0 flex items-center p-6 px-4 text-xl font-medium bg-yellow-100 border-2 border-black rounded-r-lg font-open-sans focus:outline-none ">
          Kopier link
        </button>
       </div>
       <Link to={`/${roomId}/criticize`} onClick={event => {
                         handleSendUser()
                         setHaveName(true)
         }} 
         className="w-full p-4 px-4 mx-auto mt-10 text-xl font-medium bg-yellow-100 border-2 border-black rounded-lg font-open-sans box-shadow focus:outline-none ">
           Start de sessie
         </Link>
      </div>

  )};

export default AddName;