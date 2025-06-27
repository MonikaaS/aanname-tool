import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Assumption } from '../types';
import { ReactComponent as BigLine } from '../assets/svg/big-line.svg';

const useFocus = () => {
  const htmlElRef = useRef<HTMLTextAreaElement>(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus] as const;
};

interface AssumptionMessageProps {
  assumptions: Assumption[];
  addAssumption: (text: string) => void;
  deleteAssumption: (assumptionId: string) => void;
  selectAssumption: (assumptionId: string, isSelected: boolean) => void;
  location: 'setup' | 'criticize';
}

const AssumptionMessage: React.FC<AssumptionMessageProps> = ({
  assumptions,
  addAssumption,
  deleteAssumption,
  selectAssumption,
  location,
}) => {
  const assumptionsTips = [
    'How do you think the solution will be used?',
    'In what situation do you think the solution will be used?',
    'What do you think the solution will be?',
    'What do you think the client wants?',
    'What do you think the final product will be?',
    'What do you think the user wants?',
  ];

  const [newMessage, setNewMessage] = useState('');
  const [currentAssumptionTip, setCurrentAssumptionTip] = useState(0);
  const [help, setHelp] = useState(false);
  const [inputRef, setInputFocus] = useFocus();
  const [hasSelected, setHasSelected] = useState(false);

  const messageRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      addAssumption(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleAssigneeOnClick = () => {
    setCurrentAssumptionTip((prev) => (prev + 1) % assumptionsTips.length);
  };

  useEffect(() => {
    if (assumptions.some((e) => e.isSelected === true)) {
      setHasSelected(true);
    } else {
      setHasSelected(false);
    }
  }, [setHasSelected, assumptions]);

  const item = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
    },
  };

  const selectedAssumptions = assumptions.filter((a) => a.isSelected);
  const unselectedAssumptions = assumptions.filter((a) => !a.isSelected);

  return (
    <div className="w-10/12 pt-6 mx-auto">
      {location === 'criticize' ? (
        <div></div>
      ) : (
        <div className="w-full md:flex">
          <div className="w-56 h-56 p-2 m-2 mb-12 font-medium text-black bg-yellow-100 border-2 border-black rounded-md md:w-48 md:h-48 box-shadow-card font-poppins">
            <textarea
              ref={inputRef}
              value={newMessage}
              placeholder="Write your assumption here..."
              className="w-full p-4 placeholder-black bg-yellow-100 rounded-md resize-none pt-7 h-36 hover:bg-white hover:bg-opacity-25 focus:outline-none"
              onChange={(event) => {
                setNewMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <motion.div
              className="flex mr-auto cursor-pointer"
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setHelp(true);
                handleAssigneeOnClick();
              }}
            >
              <button className="pr-2 ml-auto text-xs font-semibold">
                Need a nudge?
              </button>
            </motion.div>
          </div>
          <AnimatePresence>
            {help && (
              <motion.div
                initial={{ y: 0, x: -30, opacity: 0 }}
                animate={{ y: 0, x: 0, opacity: 1 }}
                exit={{ y: 0, x: -30, opacity: 0 }}
                className={`${
                  help ? 'show' : ''
                } relative w-56 h-56 p-2 m-2 mb-12 font-medium text-black bg-white border-2 border-black rounded-md md:w-48 md:h-48 font-poppins`}
              >
                <motion.button
                  onClick={() => {
                    setHelp(false);
                    handleAssigneeOnClick();
                  }}
                  className="absolute top-0 right-0 w-8 h-8 text-center text-black rounded-full"
                >
                  x
                </motion.button>
                <motion.p className="w-full p-4 pt-2 pb-0 text-xs font-bold">
                  Hint
                </motion.p>
                <motion.p className="w-full p-4 pt-0 pr-2 font-medium placeholder-black bg-white rounded-md resize-none h-28 hover:bg-opacity-25 focus:outline-none">
                  {assumptionsTips[currentAssumptionTip]}
                </motion.p>
                <div
                  onClick={() => {
                    handleAssigneeOnClick();
                  }}
                  className="flex w-full mt-auto"
                >
                  <motion.button className="pt-2 ml-auto text-xs font-semibold">
                    next
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {location === 'criticize' && (
        <div className="w-full p-5 mb-5 rounded-md min-h-[240px]">
          {selectedAssumptions.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              {selectedAssumptions.map((message) => (
                <motion.div
                  key={message.id}
                  ref={messageRef}
                  variants={item}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    scale: 1.05,
                  }}
                  onClick={() => {
                    selectAssumption(message.id, !message.isSelected);
                  }}
                  className={`${
                    message.isSelected
                      ? 'border-black box-shadow-card-selected'
                      : 'border-black box-shadow-card'
                  } relative w-48 h-48 p-4 m-2 font-medium text-black bg-yellow-100 border-2 rounded-md cursor-pointer item font-poppins`}
                >
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      deleteAssumption(message.id);
                    }}
                    className="absolute top-0 right-0 w-8 h-8 text-center text-black rounded-full hover:bg-red-200"
                  >
                    ×
                  </button>
                  <p className="overflow-hidden message-item">{message.text}</p>
                  <div className="absolute bottom-2 right-2 text-xs text-gray-600">
                    {message.authorName}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="w-full my-10 text-xs text-center font-poppins">
              Select assumptions below to discuss during the critique questions
            </p>
          )}
        </div>
      )}

      {(location === 'criticize' || location === 'setup') && (
        <div className="container flex-wrap w-full p-5 mb-5 rounded-md md:flex transition-all">
          {unselectedAssumptions.length > 0
            ? unselectedAssumptions.map((message) => (
                <motion.div
                  key={message.id}
                  ref={messageRef}
                  variants={item}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    scale: 1.05,
                  }}
                  onClick={() => {
                    selectAssumption(message.id, !message.isSelected);
                  }}
                  className={`${
                    message.isSelected
                      ? 'border-black box-shadow-card-selected'
                      : 'border-black box-shadow-card'
                  } relative w-48 h-48 p-4 m-2 font-medium text-black bg-yellow-100 border-2 rounded-md cursor-pointer item font-poppins`}
                >
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      deleteAssumption(message.id);
                    }}
                    className="absolute top-0 right-0 w-8 h-8 text-center text-black rounded-full hover:bg-red-200"
                  >
                    ×
                  </button>
                  <p className="message-item overflow-hidden">{message.text}</p>
                  <div className="absolute bottom-2 right-2 text-xs text-gray-600">
                    {message.authorName}
                  </div>
                </motion.div>
              ))
            : location === 'setup' && (
                <div className="w-full text-center">
                  <h1 className="w-full pt-6 mx-auto mt-5 mb-2 text-xl font-bold text-indigo-600">
                    There are no assumptions yet
                  </h1>
                  <h2 className="w-10/12 mx-auto text-xs font-light font-poppins">
                    Start by drafting assumptions
                  </h2>
                </div>
              )}
        </div>
      )}
    </div>
  );
};

export default AssumptionMessage;
