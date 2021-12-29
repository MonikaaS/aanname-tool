import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const SEND_TIME = "SendTime"; // Name of the event
// const SOCKET_SERVER_URL = window.location.origin;
const SOCKET_SERVER_URL = "http://localhost:4000";
const Timer = (props) => {
  const roomId = props.roomId;
  const [countDown, setCountDown] = useState(60 * 5);
  const [runTimer, setRunTimer] = useState(false);
  const [counterText, setCounterText] = useState("start de timer");

  const socketRef = useRef();

  useEffect(() => {
    let timerId;

    if (runTimer) {
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 2000);
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
      setRunTimer(data.runTimer);
      setCountDown(data.countDown);
    });

    socketRef.current.emit(SEND_TIME, {
      runTimer: runTimer,
      countDown: countDown,
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, runTimer, countDown]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCountDown(60 * 5);
      setCounterText("Tijd is om!");
    }
  }, [countDown, runTimer]);

  const togglerTimer = () => setRunTimer((t) => !t);

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  return (
    <div>
      <div className="">
        <button
          onClick={() => {
            setCountDown(countDown - 30);
          }}
          className="w-full p-5 mx-auto font-medium bg-yellow-100 border-2 border-black rounded-lg font-open-sans box-shadow"
        >
          -
        </button>
        <button
          onClick={() => {
            setCountDown(countDown + 30);
          }}
          className="w-full p-5 mx-auto font-medium bg-yellow-100 border-2 border-black rounded-lg font-open-sans box-shadow"
        >
          +
        </button>
        <button
          onClick={() => {
            togglerTimer();
          }}
          className="w-full p-5 mx-auto font-medium bg-yellow-100 border-2 border-black rounded-lg font-open-sans box-shadow"
        >
          {runTimer ? ` []` : ">"}
        </button>
        <p>
          {minutes} : {seconds}
        </p>
      </div>
      <div className="relative">
        <div
          className={` ${
            runTimer ? "" : "hidden"
          } fixed w-1/3 p-5 border-2 border-black rounded-lg right-40 top-40 box-shadow`}
        >
          {" "}
          <p>{runTimer ? `${minutes} : ${seconds}` : `${counterText}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Timer;
