import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import socketIOClient from "socket.io-client";

const SEND_TIME = "SendTime"; // Name of the event

// const SOCKET_SERVER_URL = window.location.origin;
const SOCKET_SERVER_URL = "http://localhost:4000";

const Walkthrough = (props) => {
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
    const session = "test";
    const [showModal, setShowModal] = useState(false);
    const hideModal = () => {
      const modalKey = "modalSession";
      localStorage.setItem(modalKey, session);
      setShowModal(false);
    };

    useEffect(() => {
      const modalKey = "modalSession";
      const modalSession = localStorage.getItem(modalKey);
      setShowModal(modalSession !== session);
    }, []);
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
      <div className="z-40 inline">
        {" "}
        <motion.div
          initial={{ y: 0, x: 60, opacity: 1 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          exit={{ y: 40, x: 0, opacity: 0 }}
          className={` shadow-xl absolute bottom-20 left-28 w-48 h-18 p-4 m-2 font-sm text-black bg-white border-2 border-black rounded-md font-poppins`}
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
      </div>
    )
  );
};

export default Walkthrough;
