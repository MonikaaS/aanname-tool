import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const SEND_TIME = "SendTime"; // Name of the event
const RECEIVE_TIME = "ReceiveTime"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";

const Timer = (props) => {
 const roomId = props.roomId
 const [countDown, setCountDown] = useState(0);
 const [runTimer, setRunTimer] = useState(false);

 const socketRef = useRef();

 socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
  query: { roomId },
  });

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
  if (countDown < 0 && runTimer) {
    console.log("expired");
    setRunTimer(false);
    setCountDown(0);
  }
}, [countDown, runTimer]);

const togglerTimer = () => setRunTimer((t) => !t);

const seconds = String(countDown % 60).padStart(2, 0);
const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

// socketRef.current.on(RECEIVE_TIME, (data) => {
//   console.log(data)
// });

// socketRef.current.emit(SEND_TIME, (data) => {
//   console.log(data)
//  });

 return (
  <div className="">
   <button onClick={ () => {
            togglerTimer();
        }}  className="font-open-sans font-medium bg-yellow-100 p-5 box-shadow border-2 rounded-lg border-black fixed bottom-10 left-1/2 mx-auto transform -translate-x-1/2">
    {runTimer ? ` ${minutes} : ${seconds} `: "Start"}
    </button>
  </div>

 )};

 export default Timer;