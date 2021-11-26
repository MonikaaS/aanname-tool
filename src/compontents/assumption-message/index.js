import { useState } from 'react';
import useAssumptions from "../../client/assumptions/index";

const AssumptionMessage = (props) => {
 const roomId = props.roomId;


 const { messages, sendMessage } = useAssumptions(roomId); // Creates a websocket and manages messaging
 const [newMessage, setNewMessage] = useState(""); // Message to be sent

 const handleSendMessage = () => {
   sendMessage(newMessage);
   setNewMessage("");

 };

 return (
   <div className="h-full w-full mt-20">
     <div className="relative w-1/2 mx-auto">
       <h1 className="relative z-10 text-center font-playfair-display font-black text-6xl mt-12">{roomId}</h1>
       <div className="w-1/2 h-10 bg-yellow-100 mx-auto absolute top-1/2 left-36"></div>
     </div>
     <div className="p-6 mt-10 flex flex-wrap w-10/12 mx-auto">
       <div className="box-shadow-card border-black border-2 m-2 p-4 bg-yellow-100 w-48 h-48 rounded-md font-open-sans font-medium text-black"> 
           <textarea
             value={newMessage}
             placeholder="Schrijf hier je aanname..."
             className="w-full h-full resize-none focus:outline-none bg-yellow-100 placeholder-black"
             onChange={event => {
              setNewMessage(event.target.value)
             }}
             onKeyPress={event => {
                         if (event.key === 'Enter') {
                           handleSendMessage()
                         }
                       }}
           />
         </div>

         {messages.map((message, i) => (
           <div key={i} className="box-shadow-card border-black border-2 m-2 p-4 bg-yellow-100 w-48 h-48 rounded-md font-open-sans font-medium text-black"> 
             <p
               className={`message-item ${
                 message.ownedByCurrentUser ? "my-message" : "received-message"
               }`}
             >
               {message.assumption}
             </p>
           </div>
         ))}
     </div>
   </div>
 )};

 export default AssumptionMessage;