import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useAppContext,
  useAppState,
  useConnectionState,
} from '../contexts/AppContext';
import { SocketEvents } from '../../../shared/types';
import { ReactComponent as TopLeft } from '../assets/svg/top-left.svg';
import { ReactComponent as TopRight } from '../assets/svg/top-right.svg';
import { ReactComponent as BottomRight } from '../assets/svg/bottom-right.svg';
import { ReactComponent as BottomLeft } from '../assets/svg/bottom-left.svg';

interface AssumptionQuestionProps {
  roomId: string;
}

const AssumptionQuestion: React.FC<AssumptionQuestionProps> = ({ roomId }) => {
  const { emit, dispatch } = useAppContext();
  const { showQuestion, currentQuestion } = useAppState();
  const { isConnected } = useConnectionState();

  const questions = [
    'Who benefits from this assumption?',
    'What would be another alternative or solution?',
    'When is this assumption NOT true? And when is it?',
    'When should you ask for help regarding the assumption?',
    'Are there similar solutions, concepts, or situations?',
    'Why is this assumption relevant to the project or target audience?',
    'How did you arrive at your assumption?',
  ];

  const handleAssigneeOnClick = () => {
    const nextQuestion = (currentQuestion + 1) % questions.length;
    const payload = {
      showQuestion: true,
      currentQuestion: nextQuestion,
    };

    // Optimistic UI update: update local state immediately
    dispatch({ type: 'SET_QUESTIONS_STATE', payload });

    // Sync with other clients
    emit(SocketEvents.QUESTIONS, { ...payload, roomId });
  };

  const handleCloseQuestion = () => {
    const payload = {
      showQuestion: false,
      currentQuestion: currentQuestion,
    };
    // Optimistic UI update
    dispatch({ type: 'SET_QUESTIONS_STATE', payload });

    // Sync with other clients
    emit(SocketEvents.QUESTIONS, { ...payload, roomId });
  };

  return (
    <div>
      <div className="w-10/12 pt-6 mx-auto mt-1">
        <div className="relative flex flex-wrap w-full mt-5">
          <motion.button
            onClick={handleAssigneeOnClick}
            disabled={!isConnected}
            className={`w-48 h-48 p-4 m-2 font-medium text-black bg-indigo-600 border-2 border-black rounded-md box-shadow-card-q font-poppins ${
              !isConnected ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <motion.p className="w-full h-full pt-2 text-white bg-indigo-600 resize-none focus:outline-none font-poppins">
              Click here for critical questions
            </motion.p>
          </motion.button>
          <AnimatePresence>
            {showQuestion && (
              <motion.div
                initial={{ y: 0, x: -30, opacity: 0 }}
                animate={{ y: 0, x: 0, opacity: 1 }}
                exit={{ y: 0, x: -30, opacity: 0 }}
                className={`${
                  showQuestion ? 'show' : ''
                } relative w-48 h-48 p-4 m-2 font-medium text-black bg-indigo-600 border-2 border-black rounded-md box-shadow-card-q font-poppins`}
              >
                <motion.button
                  onClick={handleCloseQuestion}
                  className="absolute top-0 right-0 w-8 h-8 text-center text-white rounded-full"
                >
                  x
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
        <div className="hidden box-shadow-timer-button md:block fixed w-1/4 p-5 border-2 border-black rounded-lg transform -translate-x-1/2 left-1/2 bottom-20 bg-white m-2 z-50">
          <p className="text-2xl font-bold text-center font-poppins">
            Answered enough questions?
          </p>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-10/12 mx-auto text-xs font-normal font-poppin"
          >
            <div className="flex flex-wrap justify-center w-full mt-5">
              <button
                onClick={handleAssigneeOnClick}
                className="w-40 p-2 m-2 font-medium text-center bg-gray-100 border-2 border-black rounded-lg lg:w-28 box-shadow-timer-button font-poppins"
              >
                Next question
              </button>
              <Link
                to={`/${roomId}/reflect`}
                className="w-40 p-2 m-2 font-medium text-center bg-yellow-100 border-2 border-black rounded-lg lg:w-28 box-shadow-timer-button font-poppins"
              >
                To Reflect
              </Link>
            </div>
          </motion.div>
          <div className="relative">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="fixed z-50 -left-10 bottom-40"
            >
              <TopLeft />
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="fixed z-50 -right-10 bottom-40"
            >
              <TopRight />
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="fixed z-50 -right-10 -bottom-5"
            >
              <BottomRight />
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="fixed z-50 -left-10 -bottom-5"
            >
              <BottomLeft />
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
