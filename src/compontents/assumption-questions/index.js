import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import socketIOClient from "socket.io-client";
import { ReactComponent as TopLeft } from "../../assets/svg/top-left.svg";
import { ReactComponent as TopRight } from "../../assets/svg/top-right.svg";
import { ReactComponent as BottomRight } from "../../assets/svg/bottom-right.svg";
import { ReactComponent as BottomLeft } from "../../assets/svg/bottom-left.svg";

const QUESTIONS = "questions"; // Name of the event
const SELECTED_ASSUMPTION = "SelectedAssumption";

// const SOCKET_SERVER_URL = window.location.origin;
const SOCKET_SERVER_URL = "http://localhost:4000";

const AssumptionQuestion = (props) => {
  const socketRef = useRef();

  const roomId = props.roomId;
  const questions = [
    "Wie heeft hier baat bij deze aanname?",
    "Wat zou een ander alternatief of oplossing zijn",
    "Wanneer is deze aanname NIET waar? En wanneer wel?",
    "Wanneer zou je hulp voor de aanname moeten vragen",
    "Zijn er soort gelijke oplossingen, concepten, situaties?",
    "Waarom is deze aanname relevant voor het project of doelgroep",
    "Hoe ben je op je aanname gekomen?",
  ];

  const [assumptions, setAssumptions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [showQuestion, setShowQuestion] = useState(false);

  const handleAssigneeOnClick = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
  };

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(QUESTIONS, (data) => {
      setShowQuestion(data.showQuestion);
      setCurrentQuestion(data.currentQuestion);
    });

    socketRef.current.emit(QUESTIONS, {
      showQuestion: showQuestion,
      currentQuestion: currentQuestion,
    });

    socketRef.current.on(SELECTED_ASSUMPTION, (assumption) => {
      const filteredUsers = Object.keys(assumption)
        .filter((key) => [roomId].includes(key))
        .reduce((obj, key) => {
          obj[key] = assumption[key];
          return obj;
        }, {});
      setAssumptions([...filteredUsers[roomId]]);
    });
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, showQuestion, currentQuestion]);

  return (
    <div>
      <div className="w-10/12 pt-6 mx-auto mt-1">
        <div className="relative flex flex-wrap w-full mt-5">
          <motion.button
            onClick={(event) => {
              setShowQuestion(true);
              handleAssigneeOnClick();
            }}
            className="w-48 h-48 p-4 m-2 font-medium text-black bg-indigo-600 border-2 border-black rounded-md box-shadow-card-q font-poppins"
          >
            <motion.p className="w-full h-full pt-2 text-white bg-indigo-600 resize-none focus:outline-none font-poppins">
              klik hier voor kritische vragen
            </motion.p>
          </motion.button>
          <AnimatePresence>
            {showQuestion && (
              <motion.div
                initial={{ y: 0, x: -30, opacity: 0 }}
                animate={{ y: 0, x: 0, opacity: 1 }}
                exit={{ y: 0, x: -30, opacity: 0 }}
                className={` ${
                  showQuestion ? "show" : ""
                } relative w-48 h-48 p-4 m-2 font-medium text-black bg-indigo-600 border-2 border-black rounded-md box-shadow-card-q font-poppins`}
              >
                <motion.button
                  onClick={(event) => {
                    setShowQuestion(false);
                    handleAssigneeOnClick();
                  }}
                  className="absolute top-0 right-0 w-8 h-8 text-center text-white rounded-full"
                >
                  {" "}
                  x{" "}
                </motion.button>
                <motion.p className="w-full h-full pt-2 text-white bg-indigo-600 resize-none focus:outline-none">
                  {questions[currentQuestion]}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {currentQuestion === 3 ? (
        <div
          className={`  hidden box-shadow-timer-button md:block fixed w-1/4 p-5 border-2 border-black rounded-lg transform -translate-x-1/2 left-1/2 bottom-20 bg-white m-2 z-50`}
        >
          <p className="text-2xl font-bold text-center font-poppins">
            Genoeg vragen beantwoord?
          </p>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-10/12 mx-auto text-xs font-normal font-poppin"
          >
            <div className="flex flex-wrap justify-center w-full mt-5">
              <button
                onClick={() => {
                  handleAssigneeOnClick();
                }}
                className="w-40 p-2 m-2 font-medium text-center bg-gray-100 border-2 border-black rounded-lg lg:w-28 box-shadow-timer-button font-poppins"
              >
                Volgende vraag
              </button>
              <Link
                to={{
                  pathname: `/${roomId}/reflect`,
                }}
                className="w-40 p-2 m-2 font-medium text-center bg-yellow-100 border-2 border-black rounded-lg lg:w-28 box-shadow-timer-button font-poppins"
              >
                Naar reflecteren
              </Link>
            </div>
          </motion.div>
          <div className="relative">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="fixed z-50 -left-10 bottom-40"
            >
              <TopLeft></TopLeft>
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="fixed z-50 -right-10 bottom-40"
            >
              <TopRight></TopRight>
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="fixed z-50 -right-10 -bottom-5"
            >
              <BottomRight></BottomRight>
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="fixed z-50 -left-10 -bottom-5"
            >
              <BottomLeft></BottomLeft>
            </motion.div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AssumptionQuestion;
