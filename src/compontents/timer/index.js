import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const SEND_TIME = "SendTime"; // Name of the event
const SOCKET_SERVER_URL = window.location.origin;
//const SOCKET_SERVER_URL = "http://localhost:4000";

const Timer = (props) => {
 const roomId = props.roomId
 const [countDown, setCountDown] = useState(0);
 const [runTimer, setRunTimer] = useState(false);

 const socketRef = useRef();

 useEffect(() => {
  let timerId;

  if (runTimer) {
    setCountDown(60 * 2);
    timerId = setInterval(() => {
      setCountDown((countDown) => countDown - 1);
    }, 1000);
  } else {
    clearInterval(timerId);
  }

  return () => clearInterval(timerId);
}, [runTimer]);

useEffect(() => {
   
  // Creates a WebSocket connection
  socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
    query: { roomId },
  });

  socketRef.current.on(SEND_TIME, (data) => {
    setRunTimer(data.runTimer)
 });

 socketRef.current.emit(SEND_TIME, {
   runTimer: runTimer
 });
     
  // Destroys the socket reference
  // when the connection is closed
  return () => {
    socketRef.current.disconnect();
  };
}, [roomId, runTimer]);

useEffect(() => {
  if (countDown < 0 && runTimer) {
    console.log("expired");
    setRunTimer(false);
    setCountDown(0);
  }
}, [countDown, runTimer]);

const togglerTimer = () => setRunTimer((t) => !t);

const seconds = String(countDown % 60).padStart(2, 0);
const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

 return (
  <div className="">
   <button onClick={ () => {
            togglerTimer();
        }}  className="fixed p-5 mx-auto font-medium transform -translate-x-1/2 bg-yellow-100 border-2 border-black rounded-lg font-open-sans box-shadow bottom-10 left-1/2">
    {runTimer ? ` ${minutes} : ${seconds} `: "Start"}
    </button>
  </div>

 )};

 export default Timer;