import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactComponent as OneNote } from "../../assets/svg/one-note.svg";
import { ReactComponent as TwoNotes } from "../../assets/svg/two-notes.svg";
import { ReactComponent as ArrowLoop } from "../../assets/svg/arrow-loop.svg";
import { ReactComponent as SquiqlyLine } from "../../assets/svg/squiqly-line.svg";

const Home = () => {
  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div>
      <div>
        <div className="relative w-1/2 mx-auto">
          <motion.div
            animate={{ y: [0, -10], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.2, delay: 0.2 }}
            className="absolute"
          >
            {" "}
            <OneNote></OneNote>
          </motion.div>
          <motion.div
            className="absolute right-0"
            animate={{ y: [0, -10], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.2, delay: 0.2 }}
          >
            <TwoNotes></TwoNotes>
          </motion.div>
          <motion.h1
            animate={{ y: [0, -10] }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="relative z-10 mt-20 text-6xl font-semibold text-center item font-poppins"
          >
            Aanname tool
          </motion.h1>
          <div className="absolute w-1/2 h-10 mx-auto bg-yellow-100 top-1/2 left-36"></div>
        </div>
      </div>
      <motion.div
        animate={{ y: [0, -10], opacity: [0, 1] }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
        className="relative w-5/12 mx-auto mt-40 mb-10"
      >
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.7 }}
          className="absolute -left-24 top-5"
        >
          <ArrowLoop></ArrowLoop>
        </motion.div>
        <p className="w-11/12 mx-auto text-lg font-normal text-center font-poppins">
          {" "}
          Creëer een nieuw project om samen met elkaar aannames over het op te
          lossen probleem te bespreken
        </p>
        <SquiqlyLine className="w-full mx-auto mb-10"></SquiqlyLine>
      </motion.div>
      <motion.div
        animate={{ y: [0, -10], opacity: [0, 1] }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
        className="relative w-5/12 mx-auto text-xl font-medium hover-box font-poppins"
      >
        <input
          type="text"
          placeholder="Projectnaam"
          value={roomName}
          onChange={handleRoomNameChange}
          className="w-full h-10 p-6 pl-3 pr-8 text-xl font-normal placeholder-black border-2 border-black rounded-lg box-shadow font-poppins focus:outline-none"
        />
        <Link
          to={`/${roomName.replace(/\s/g, "-").toLowerCase()}`}
          className="absolute inset-y-0 right-0 flex items-center p-6 px-4 bg-yellow-100 border-2 border-black rounded-r-lg focus:outline-none "
        >
          Creër project
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
