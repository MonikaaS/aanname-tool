import { useState } from 'react';

const AssumptionQuestion = () => {

 const questions = ["Hoe ben je op je aanname gekomen?", "Hoe kan de aanname NIET waar zijn?", "Kun je fout zitten door te denken dat deze oplossing iets is wat de gebruiker nodig heeft?"];
 
 const [currentQuestion, setCurrentQuestion] = useState(1);
 const [showQuestion, setShowQuestion] = useState(false)
  
 const handleAssigneeOnClick = () => {
   setCurrentQuestion(prev => (prev + 1) % 3);
 };

 return (
     <div className="relative">
       <button onClick = {event => {
                      setShowQuestion(true)
                      handleAssigneeOnClick()
                    }} className="box-shadow-card-q border-black border-2 m-2 p-4 bg-indigo-600 w-48 h-48 rounded-md font-open-sans font-medium text-black"> 
           <p className="w-full h-full resize-none focus:outline-none bg-indigo-600 text-white">
           kritische vragen
            </p>
         </button>

       <div className={`${showQuestion ? 'show' : 'hidden'} bg-opacity-80 fixed bg-black w-screen h-screen -top-0 backdrop-opacity-50 overflow-hidden z-40`}>
         <div className={` ${showQuestion ? 'show' : 'hidden'} border-2 border-black rounded-md z-50 bg-white p-8 w-72 h-72 font-open-sans font-medium text-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>    
           <button onClick = {event => {
                      setShowQuestion(false)
                      handleAssigneeOnClick()
                    }}
                    className="-right-2 -top-2 absolute rounded-full h-8 w-8 bg-gray-400 text-center text-black border-2 border-black"> x </button>    
           <p className="w-full h-full resize-none focus:outline-none text-black">
           {questions[currentQuestion]}
            </p>
         </div>
        </div>
     </div>
 )};

 export default AssumptionQuestion;