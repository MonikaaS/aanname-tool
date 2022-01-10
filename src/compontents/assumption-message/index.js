import { useState, useEffect, useRef } from "react";
import useAssumptions from "../../client/assumptions/index";
import { motion, AnimatePresence } from "framer-motion";
import socketIOClient from "socket.io-client";

const ALL_ASSUMPTIONS = "AllAssumptions"; // Name of the event
const DELETE_ASSUMPTIONS = "DeleteAssumptions";
const SELECTED_ASSUMPTION = "SelectedAssumption";
// const SOCKET_SERVER_URL = window.location.origin;

const SOCKET_SERVER_URL = "http://localhost:4000";
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const AssumptionMessage = (props) => {
  const roomId = props.roomId;

  const assumptionsTips = [
    "Hoe denk jij dat de oplossing gebruikt gaat worden?",
    "In welke situatie denk jij dat de oplossing gebruikt gaat worden?",
    "Wat denk jij dat dat de oplossing gaat zijn?",
    "Wat denk jij dat de opdrachtgever wilt?",
    "Wat denk jij dat het eindproduct gaat worden?",
    "Wat denk jij dat de gebruiker wilt?",
  ];

  const socketRef = useRef();
  const messageRef = useRef();
  const [assumptions, setAssumptions] = useState([]);
  const { messages, sendMessage } = useAssumptions(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(""); // Message to be sent
  const [currentAssumptionTip, setCurrentAssumptionTip] = useState(1);
  const [help, setHelp] = useState(false);
  const [inputRef, setInputFocus] = useFocus();
  const [deleteMessage, setDeleteMessage] = useState("");
  const [selected, setSelected] = useState("");
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  const handleAssigneeOnClick = () => {
    setCurrentAssumptionTip((prev) => (prev + 1) % assumptionsTips.length);
  };

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(ALL_ASSUMPTIONS, (assumption) => {
      const filteredUsers = Object.keys(assumption)
        .filter((key) => [roomId].includes(key))
        .reduce((obj, key) => {
          obj[key] = assumption[key];
          return obj;
        }, {});
      setAssumptions([...filteredUsers[roomId]]);

      if ([...filteredUsers[roomId]].length < 1) {
        setLoading(false);
        setEmpty(true);
      }

      if ([...filteredUsers[roomId]].length > 0) {
        setLoading(false);
        setEmpty(false);
      }
    });

    socketRef.current.on(DELETE_ASSUMPTIONS, (assumption) => {
      const filteredUsers = Object.keys(assumption)
        .filter((key) => [roomId].includes(key))
        .reduce((obj, key) => {
          obj[key] = assumption[key];
          return obj;
        }, {});
      setAssumptions([...filteredUsers[roomId]]);

      if ([...filteredUsers[roomId]].length < 1) {
        setLoading(false);
        setEmpty(true);
      }

      if ([...filteredUsers[roomId]].length > 0) {
        setLoading(false);
        setEmpty(false);
      }
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

    socketRef.current.emit(DELETE_ASSUMPTIONS, {
      assumption: deleteMessage,
    });

    socketRef.current.emit(SELECTED_ASSUMPTION, {
      assumption: selected,
      active: active,
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, deleteMessage, active, selected]);

  const item = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
    },
  };

  useEffect(() => {
    if (assumptions.some((e) => e.active === true)) {
      setHasSelected(true);
    } else {
      setHasSelected(false);
    }
  }, [setHasSelected, assumptions]);

  return (
    <div className="w-10/12 pt-6 mx-auto ">
      {props.location === "criticize" ? (
        <div></div>
      ) : (
        <div className="flex w-full">
          <div className="w-56 h-56 p-2 m-2 mb-12 font-medium text-black bg-yellow-100 border-2 border-black rounded-md md:w-48 md:h-48 box-shadow-card font-open-sans">
            <textarea
              ref={inputRef}
              value={newMessage}
              placeholder={`${"Schrijf hier je aanname..."}`}
              className="w-full p-4 placeholder-black bg-yellow-100 rounded-md resize-none pt-7 h-36 hover:bg-white hover:bg-opacity-25 focus:outline-none"
              onChange={(event) => {
                setNewMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <motion.div
              className="flex mr-auto cursor-pointer"
              whileTap={{ scale: 0.9 }}
              onClick={(event) => {
                setHelp(true);
                handleAssigneeOnClick();
              }}
            >
              {" "}
              <button className="pr-2 ml-auto text-xs">zetje nodig ?</button>
            </motion.div>
          </div>
          <AnimatePresence>
            {help && (
              <motion.div
                initial={{ y: 0, x: -30, opacity: 0 }}
                animate={{ y: 0, x: 0, opacity: 1 }}
                exit={{ y: 0, x: -30, opacity: 0 }}
                className={` ${
                  help ? "show" : ""
                } relative w-56 h-56 p-2 m-2 mb-12 font-medium text-black bg-white border-2 border-black rounded-md md:w-48 md:h-48 font-open-sans`}
              >
                <motion.button
                  onClick={(event) => {
                    setHelp(false);
                    handleAssigneeOnClick();
                  }}
                  className="absolute top-0 right-0 w-8 h-8 text-center text-black rounded-full"
                >
                  {" "}
                  x{" "}
                </motion.button>
                <motion.p className="w-full p-4 pt-2 pb-0 text-xs font-bold">
                  Geheugensteuntje
                </motion.p>
                <motion.p className="w-full p-4 pt-0 placeholder-black bg-white rounded-md resize-none h-28 hover:bg-opacity-25 focus:outline-none">
                  {assumptionsTips[currentAssumptionTip]}
                </motion.p>
                <div
                  onClick={(event) => {
                    handleAssigneeOnClick();
                  }}
                  className="flex w-full mt-auto"
                >
                  <motion.button className="pt-2 ml-auto text-xs">
                    volgende
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div
        className={`${
          props.location === "criticize" ? "md:flex" : "hidden"
        } container flex-wrap hidden w-full p-5 mb-5 bg-gray-100 rounded-md hover:bg-yellow-50 border-2 border-gray-100 border-dashed hover:border-black`}
      >
        <p
          className={` ${hasSelected ? "hidden" : ""} text-center w-full my-20`}
        >
          selecteer aannames om bij de kiritsche vraag te bespreken
        </p>
        {assumptions.map((message) => {
          if (message.active === true && props.location === "criticize") {
            return (
              <motion.div
                key={message.assumption}
                ref={messageRef}
                variants={item}
                whileHover={{
                  scale: 1.05,
                }}
                onClick={(event) => {
                  setSelected(event.target.lastChild.innerHTML);
                  setActive(!message.active);
                }}
                className={` ${
                  message.active
                    ? "border-black box-shadow-card-selected"
                    : "bg-gray-800 box-shadow-card"
                } relative w-48 h-48 p-4 m-2 font-medium text-black bg-yellow-100 border-2  rounded-md cursor-pointer item font-open-sans`}
              >
                <p
                  className={`message-item ${
                    message.ownedByCurrentUser
                      ? "my-message"
                      : "received-message"
                  }`}
                >
                  {message.assumption}
                </p>
              </motion.div>
            );
          }
        })}
      </div>

      <div className="container flex-wrap hidden w-full md:flex">
        {loading === false && empty === false ? (
          assumptions.map((message, index) => (
            <motion.div
              key={index}
              ref={messageRef}
              variants={item}
              whileHover={{
                scale: 1.05,
              }}
              onClick={(event) => {
                setSelected(event.target.lastChild.innerHTML);
                setActive(!message.active);
              }}
              className={` ${
                message.active
                  ? "border-black box-shadow-card-selected "
                  : "border-black box-shadow-card"
              } relative w-48 h-48 p-4 m-2 font-medium text-black bg-yellow-100 border-2  rounded-md cursor-pointer item font-open-sans`}
            >
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setDeleteMessage(event.target.nextSibling.innerHTML);
                }}
                className="absolute top-0 right-0 w-8 h-8 text-center text-black rounded-full"
              >
                {" "}
                x{" "}
              </button>
              <p
                className={`message-item ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              >
                {message.assumption}
              </p>
            </motion.div>
          ))
        ) : (
          <div></div>
        )}
        {loading === false && empty === true ? (
          <div className="w-full text-center">
            <h1 className="w-full pt-6 mx-auto mt-5 mb-2 text-xl font-bold text-indigo-600">
              Er zijn nog geen aannames
            </h1>
            <h2 className="w-10/12 mx-auto text-xs font-light">
              Start met het opstellen van aannames
            </h2>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default AssumptionMessage;
