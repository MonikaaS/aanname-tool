import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const SEND_TIME = "SendTime"; // Name of the event
const ADD_TIME = "AddTime";
const CURRENT_TIME = "CurrentTime";
const REMOVE_TIME = "RemoveTime";
const RUN_TIMER = "RunTime";
// const SOCKET_SERVER_URL = window.location.origin;

const SOCKET_SERVER_URL = "http://localhost:4000";
const Timer = (props) => {
  const roomId = props.roomId;
  const [countDown, setCountDown] = useState(60 * 5);
  const [runTimer, setRunTimer] = useState(false);
  const [counterText, setCounterText] = useState("");
  const [addTime, setAddTime] = useState(false);
  const [removeTime, setRemoveTime] = useState(false);

  const socketRef = useRef();

  useEffect(() => {
    let timerId;

    if (runTimer) {
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
      setCountDown(60 * 5);
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
    });

    socketRef.current.on(ADD_TIME, (data) => {
      setAddTime(data.addTime);

      if (data.addTime === true) {
        setCountDown(countDown + 30);
        setAddTime(false);
      }
    });

    socketRef.current.on(REMOVE_TIME, (data) => {
      setRemoveTime(data.removeTime);

      if (data.removeTime === true) {
        setCountDown(countDown - 30);
        setRemoveTime(false);
      }
    });

    socketRef.current.emit(SEND_TIME, {
      runTimer: runTimer,
    });

    socketRef.current.emit(ADD_TIME, {
      addTime: addTime,
    });

    socketRef.current.emit(REMOVE_TIME, {
      removeTime: removeTime,
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, runTimer, addTime, removeTime, countDown]);

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
    <div>
      <p className="mb-2 text-xl font-bold font-open-sans">
        {minutes} : {seconds}
      </p>
      <div className="flex justify-between w-full">
        <button
          onClick={(e) => {
            e.preventDefault();
            setRemoveTime(true);
          }}
          className="w-10 p-2 mx-auto mr-2 font-medium bg-yellow-100 border-2 border-black rounded-lg font-open-sans"
        >
          -
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setAddTime(true);
          }}
          className="w-10 p-2 mx-auto mr-2 font-medium bg-yellow-100 border-2 border-black rounded-lg font-open-sans"
        >
          +
        </button>
        <button
          onClick={() => {
            togglerTimer();
          }}
          className="w-10 p-2 mx-auto font-medium bg-yellow-100 border-2 border-black rounded-lg font-open-sans"
        >
          <div
            className={`${runTimer ? "play-stop" : "play-button"} mx-auto`}
          ></div>
        </button>
      </div>
      <div className="relative">
        <div
          className={` ${
            runTimer === true || counterText === "Tijd is om!" ? "" : "hidden"
          } fixed w-1/4 p-5 border-2 border-black rounded-lg transform -translate-x-1/2 left-1/2 bottom-10 bg-white`}
        >
          {" "}
          <p className="text-3xl font-bold font-open-sans">
            {minutes} : {seconds}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Timer;
