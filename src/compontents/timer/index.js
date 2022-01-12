import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { motion } from "framer-motion";
import { ReactComponent as TopLeft } from "../../assets/svg/top-left.svg";
import { ReactComponent as TopRight } from "../../assets/svg/top-right.svg";
import { ReactComponent as BottomRight } from "../../assets/svg/bottom-right.svg";
import { ReactComponent as BottomLeft } from "../../assets/svg/bottom-left.svg";

const SEND_TIME = "SendTime"; // Name of the event
const ADD_TIME = "AddTime";
const REMOVE_TIME = "RemoveTime";
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
      setCounterText("");
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
      //setAddTime(data.addTime);

      if (data.addTime === true) {
        setCountDown(countDown + 30);
        setAddTime(false);
        //console.log("yo");
      }
    });

    socketRef.current.on(REMOVE_TIME, (data) => {
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
      setRunTimer(false);
      setCountDown(0);
      setCounterText("Tijd is om!");
    }
  }, [countDown, runTimer]);

  const togglerTimer = () => setRunTimer((t) => !t);

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  return (
    <div>
      <div className="p-5 rounded-lg box-shadow-timer">
        <p className="mb-2 text-xl font-bold font-poppins">
          {minutes} : {seconds}
        </p>
        <div className="flex justify-between w-full">
          <button
            onClick={(e) => {
              e.preventDefault();
              setRemoveTime(true);
            }}
            className="w-10 p-2 mx-auto mr-2 font-medium bg-yellow-100 border-2 border-black rounded-lg box-shadow-timer-button font-poppins"
          >
            -
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setAddTime(true);
            }}
            className="w-10 p-2 mx-auto mr-2 font-medium bg-yellow-100 border-2 border-black rounded-lg box-shadow-timer-button font-poppins"
          >
            +
          </button>
          <button
            onClick={() => {
              togglerTimer();
              localStorage.setItem("SetUp", "SetUp");
            }}
            className="w-10 p-2 mx-auto font-medium bg-yellow-100 border-2 border-black rounded-lg box-shadow-timer-button font-poppins"
          >
            <div
              className={`${runTimer ? "play-stop" : "play-button"} mx-auto`}
            ></div>
          </button>
        </div>
      </div>
      <div className="relative">
        <div
          className={` ${
            runTimer === true || counterText === "Tijd is om!" ? "" : "hidden"
          } box-shadow-timer-button  fixed w-1/4 p-5 border-2 border-black rounded-lg transform -translate-x-1/2 left-1/2 bottom-20 bg-white m-2`}
        >
          {" "}
          <p className="text-3xl font-bold font-poppins">
            {runTimer ? ` ${minutes} : ${seconds} ` : "Tijd is om!"}
          </p>
          {counterText === "Tijd is om!" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-10/12 mx-auto text-xs font-normal font-poppin"
            >
              {runTimer ? (
                ""
              ) : (
                <div className="flex w-full mt-5">
                  <button
                    onClick={() => {
                      togglerTimer();
                    }}
                    className="p-2 mx-auto font-medium bg-gray-100 border-2 border-black rounded-lg w-28 box-shadow-timer-button font-poppins"
                  >
                    nog een keer
                  </button>
                  <Link
                    to={{
                      pathname: `/${roomId}/criticize`,
                    }}
                    className="p-2 mx-auto font-medium bg-yellow-100 border-2 border-black rounded-lg w-28 box-shadow-timer-button font-poppins"
                  >
                    Naar bekritiseren
                  </Link>
                </div>
              )}
            </motion.div>
          )}
          {counterText === "Tijd is om!" && (
            <div className="relative">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="fixed -left-10 bottom-40"
              >
                <TopLeft></TopLeft>
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="fixed -right-10 bottom-40"
              >
                <TopRight></TopRight>
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="fixed -right-10 -bottom-5"
              >
                <BottomRight></BottomRight>
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="fixed -left-10 -bottom-5"
              >
                <BottomLeft></BottomLeft>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
