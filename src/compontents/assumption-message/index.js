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
   <div className="w-10/12 p-6 mx-auto mt-5 ">
     <h2 className="font-bold">Opstellen:</h2>
     <div className="flex flex-wrap w-full">
       <div className="w-48 h-48 p-4 m-2 font-medium text-black bg-yellow-100 border-2 border-black rounded-md box-shadow-card font-open-sans"> 
           <textarea
             value={newMessage}
             placeholder="Schrijf hier je aanname..."
             className="w-full h-full placeholder-black bg-yellow-100 resize-none focus:outline-none"
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
           <div key={i} className="w-48 h-48 p-4 m-2 font-medium text-black bg-yellow-100 border-2 border-black rounded-md box-shadow-card font-open-sans"> 
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