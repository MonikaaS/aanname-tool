import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useUsers from "../../client/users/index";
import Modal from "../../compontents/modal/index.js";
import { ReactComponent as CornerBottomLeft } from "../../assets/svg/corner-bottom-left.svg";
import { ReactComponent as CornerBottomRight } from "../../assets/svg/corner-bottom-right.svg";
import { ReactComponent as CornerTopRight } from "../../assets/svg/corner-top-right.svg";
import { ReactComponent as CornerTopLeft } from "../../assets/svg/corner-top-left.svg";

const AddName = () => {
  const { roomId } = useParams(); // Gets roomId from URL
  let navigate = useNavigate();

  const [haveName, setHaveName] = useState(false);
  const { users, sendUser } = useUsers(roomId); // Creates a websocket and manages messaging
  const [newUser, setNewUser] = useState(""); // Message to be sent

  const handleSendUser = () => {
    sendUser(newUser);
    setNewUser("");
  };

  return (
    <div className="relative grid w-full grid-cols-1 gap-2 md:grid-cols-2 ">
      <Modal></Modal>
      <div
        className={`relative ${haveName ? "hidden" : ""} text-center w-full`}
      >
        <div className="relative w-full mx-auto md:w-1/2">
          <motion.h1
            animate={{ y: [0, -10], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }}
            className="relative z-10 mt-40 mb-20 text-6xl font-bold text-center font-poppins"
          >
            {roomId.replace("-", " ")}
          </motion.h1>
          <motion.div
            animate={{ y: [0, -10], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.7 }}
            className="absolute w-1/3 h-10 mx-auto bg-yellow-100 left-36 md:w-1/2 top-1/2 md:left-36"
          ></motion.div>
          <motion.div
            animate={{ scale: [0, 1], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.2, delay: 0.2 }}
            className="absolute left-0 -top-0"
          >
            <CornerTopLeft></CornerTopLeft>
          </motion.div>
          <motion.div
            animate={{ scale: [0, 1], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.2, delay: 0.2 }}
            className="absolute right-0 -top-0"
          >
            <CornerTopRight></CornerTopRight>
          </motion.div>
          <motion.div
            animate={{ scale: [0, 1], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.2, delay: 0.2 }}
            className="absolute right-0 -bottom-10"
          >
            <CornerBottomRight></CornerBottomRight>
          </motion.div>
          <motion.div
            animate={{ scale: [0, 1], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.2, delay: 0.2 }}
            className="absolute left-0 -bottom-10"
          >
            <CornerBottomLeft></CornerBottomLeft>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, -10], opacity: [0, 1] }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.7 }}
          className={`mt-10 relative w-8/12 mx-auto text-xs font-normal font-poppins`}
        >
          <input
            value={newUser}
            placeholder="Wat is je naam?"
            className={` ${
              haveName ? "hidden" : ""
            } box-shadow p-6 font-poppins font-normal text-sm md:text-lg w-full h-10 pl-3 pr-8 placeholder-black border-black border-2 rounded-lg focus:outline-none`}
            onChange={(event) => {
              setNewUser(event.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSendUser();
                navigate("/" + roomId + "/setup");
              }
            }}
          />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10], opacity: [0, 1] }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.7 }}
          className={`hover-box my-20 relative w-8/12 mx-auto text-sm md:text-lg font-medium font-poppins`}
        >
          <input
            value={window.location.href}
            placeholder="Wat is je naam?"
            className={` ${
              haveName ? "hidden" : ""
            } cursor-pointer box-shadow p-6 font-poppins font-normal text-sm md:text-lg w-full h-10 pl-3 pr-8 placeholder-black border-black border-2 rounded-lg focus:outline-none`}
          />
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="absolute inset-y-0 right-0 flex items-center p-6 px-4 text-sm font-medium bg-yellow-100 border-2 border-black rounded-r-lg font-poppins focus:outline-none "
          >
            Kopier link
          </button>
        </motion.div>
        <motion.div
          animate={{ y: [0, -10], opacity: [0, 1] }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.7 }}
        >
          <Link
            to={`/${roomId}/setup`}
            onClick={(event) => {
              handleSendUser();
              setHaveName(true);
            }}
            className="w-full p-4 px-4 mx-auto mt-10 text-xl font-medium bg-yellow-100 border-2 border-black rounded-lg font-poppins box-shadow focus:outline-none "
          >
            Start de sessie
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AddName;
