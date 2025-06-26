import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTimer } from '../hooks/useTimer';
import { TimerState } from '../../../shared/types';
import { ReactComponent as TopLeft } from '../assets/svg/top-left.svg';
import { ReactComponent as TopRight } from '../assets/svg/top-right.svg';
import { ReactComponent as BottomRight } from '../assets/svg/bottom-right.svg';
import { ReactComponent as BottomLeft } from '../assets/svg/bottom-left.svg';

const Timer: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const {
    time,
    isRunning,
    timerState,
    startTimer,
    stopTimer,
    addTime,
    removeTime,
    formatTime,
  } = useTimer();

  const handleToggleTimer = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  return (
    <div>
      <div className="p-5 rounded-lg box-shadow-timer">
        <p className="mb-2 text-xl font-bold font-poppins">
          {formatTime(time)}
        </p>
        <div className="flex justify-between w-full">
          <button
            onClick={() => removeTime(30)}
            className="w-10 p-2 mx-auto mr-2 font-medium bg-yellow-100 border-2 border-black rounded-lg box-shadow-timer-button font-poppins"
          >
            -
          </button>
          <button
            onClick={() => addTime(30)}
            className="w-10 p-2 mx-auto mr-2 font-medium bg-yellow-100 border-2 border-black rounded-lg box-shadow-timer-button font-poppins"
          >
            +
          </button>
          <button
            onClick={handleToggleTimer}
            className="w-10 p-2 mx-auto font-medium bg-yellow-100 border-2 border-black rounded-lg box-shadow-timer-button font-poppins"
          >
            <div
              className={`${isRunning ? 'play-stop' : 'play-button'} mx-auto`}
            ></div>
          </button>
        </div>
      </div>
      <div className="relative">
        <div
          className={` ${
            timerState === TimerState.COMPLETED ? 'fixed' : 'hidden'
          } box-shadow-timer-button w-1/4 p-5 border-2 border-black rounded-lg transform -translate-x-1/2 left-1/2 bottom-20 bg-white m-2 z-50`}
        >
          <p className="text-2xl font-bold font-poppins">Time's up!</p>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-10/12 mx-auto text-xs font-normal font-poppins"
          >
            <div className="flex flex-wrap w-full mt-5">
              <button
                onClick={handleToggleTimer}
                className="w-40 p-2 m-2 mx-auto font-medium bg-gray-100 border-2 border-black rounded-lg lg:w-28 box-shadow-timer-button font-poppins"
              >
                Again
              </button>
              <Link
                to={`/${roomId}/criticize`}
                className="w-40 p-2 m-2 mx-auto font-medium bg-yellow-100 border-2 border-black rounded-lg lg:w-28 box-shadow-timer-button font-poppins"
              >
                To Critique
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
      </div>
    </div>
  );
};

export default Timer;
