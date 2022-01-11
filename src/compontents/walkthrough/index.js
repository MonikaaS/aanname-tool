import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import socketIOClient from "socket.io-client";

import { ReactComponent as ArrowLine } from "../../assets/svg/arrow-line.svg";
import { ReactComponent as TopLeft } from "../../assets/svg/top-left.svg";
import { ReactComponent as TopRight } from "../../assets/svg/top-right.svg";
import { ReactComponent as BottomRight } from "../../assets/svg/bottom-right.svg";
import { ReactComponent as BottomLeft } from "../../assets/svg/bottom-left.svg";

const SEND_TIME = "SendTime"; // Name of the event

const SOCKET_SERVER_URL = window.location.origin;
// const SOCKET_SERVER_URL = "http://localhost:4000";

const Walkthrough = (props) => {
  console.log(props.localkey);
  const socketRef = useRef();
  const roomId = props.roomId;
  const [runTimer, setRunTimer] = useState(false);

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(SEND_TIME, (data) => {
      setRunTimer(data.runTimer);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const useSessionModal = () => {
    const session = props.localkey;
    const [showModal, setShowModal] = useState(false);
    const hideModal = () => {
      const modalKey = props.localkey;
      localStorage.setItem(modalKey, session);
      setShowModal(false);
    };

    useEffect(() => {
      const modalKey = props.localkey;
      const modalSession = localStorage.getItem(modalKey);
      setShowModal(modalSession !== session);
    }, [session]);
    return [showModal, hideModal];
  };

  const [showModal, hideModal] = useSessionModal();

  useEffect(() => {
    if (runTimer) {
      hideModal();
    }
  }, [showModal, runTimer, hideModal]);

  return (
    showModal && (
      <div className="relative z-50 hidden md:inline">
        {" "}
        <motion.div
          initial={{ y: 0, x: 60, opacity: 0 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={` shadow-xl fixed bottom-20 left-92 w-48 h-18 p-4 m-2 font-sm text-black bg-white border-2 border-black rounded-md font-poppins`}
        >
          <button
            className="absolute top-0 right-0 w-8 h-8 text-center text-black rounded-full font-sm"
            onClick={hideModal}
          >
            x
          </button>
          <motion.p className="w-full h-full pt-2 text-sm text-black bg-white resize-none focus:outline-none">
            {props.text}
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ y: 0, x: 60, opacity: 0 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed left-56 bottom-28"
        >
          <ArrowLine></ArrowLine>
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed left-80 bottom-56"
        >
          <TopLeft></TopLeft>
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed left-36rem bottom-56"
        >
          <TopRight></TopRight>
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed left-36rem bottom-20"
        >
          <BottomRight></BottomRight>
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed left-80 bottom-20"
        >
          <BottomLeft></BottomLeft>
        </motion.div>
      </div>
    )
  );
};

export default Walkthrough;
