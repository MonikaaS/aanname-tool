import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactComponent as OneNote } from "../../assets/svg/one-note.svg";
import { ReactComponent as TwoNotes } from "../../assets/svg/two-notes.svg";
import { ReactComponent as ArrowLoop } from "../../assets/svg/arrow-loop.svg";
import { ReactComponent as SquiqlyLine } from "../../assets/svg/squiqly-line.svg";
import { ReactComponent as Grid } from "../../assets/svg/grid.svg";
import { ReactComponent as CornerBottomLeft } from "../../assets/svg/corner-bottom-left.svg";
import { ReactComponent as CornerBottomRight } from "../../assets/svg/corner-bottom-right.svg";
import { ReactComponent as CornerTopRight } from "../../assets/svg/corner-top-right.svg";
import { ReactComponent as CornerTopLeft } from "../../assets/svg/corner-top-left.svg";

const Home = () => {
  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div>
      <motion.div
        animate={{ y: [0, -10], opacity: [0, 1] }}
        transition={{ ease: "easeOut", duration: 0.2, delay: 0.2 }}
        className="absolute md:w-8/12 -right-0 -top-0"
      >
        <Grid className="md:w-full md:h-auto"></Grid>
      </motion.div>
      <div>
        <div className="relative w-full mx-auto md:w-1/2">
          <motion.div
            animate={{ y: [0, -10], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.2, delay: 0.2 }}
            className="absolute -top-32 md:top-0 "
          >
            {" "}
            <OneNote></OneNote>
          </motion.div>
          <motion.div
            className="absolute right-0 -top-28 md:top-0"
            animate={{ y: [0, -10], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.2, delay: 0.2 }}
          >
            <TwoNotes></TwoNotes>
          </motion.div>
          <motion.h1
            animate={{ y: [0, -10] }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="relative z-10 mt-40 text-6xl font-semibold text-center item font-poppins"
          >
            Aanname tool
          </motion.h1>
          <div className="absolute w-3/4 h-10 mx-auto bg-yellow-100 md:w-1/2 top-1/4 md:top-1/2 left-20 md:left-36"></div>
          <div className="absolute left-0 -top-10">
            <CornerTopLeft></CornerTopLeft>
          </div>
          <div className="absolute right-0 -top-10">
            <CornerTopRight></CornerTopRight>
          </div>
          <div className="absolute right-0 -bottom-24">
            <CornerBottomRight></CornerBottomRight>
          </div>
          <div className="absolute left-0 -bottom-24">
            <CornerBottomLeft></CornerBottomLeft>
          </div>
        </div>
      </div>
      <motion.div
        animate={{ y: [0, -10], opacity: [0, 1] }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
        className="relative w-10/12 mx-auto mt-10 mb-10 md:mt-40 md:w-5/12"
      >
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.7 }}
          className="absolute -left-5 top-20 md:-left-24 md:top-5"
        >
          <ArrowLoop></ArrowLoop>
        </motion.div>
        <p className="w-11/12 mx-auto text-xs font-normal text-center md:text-lg font-poppins">
          {" "}
          Creëer een nieuw project om samen met elkaar aannames over het op te
          lossen probleem te bespreken
        </p>
        <SquiqlyLine className="w-full mx-auto mb-10"></SquiqlyLine>
      </motion.div>
      <motion.div
        animate={{ y: [0, -10], opacity: [0, 1] }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
        className="relative w-10/12 mx-auto text-xs font-medium mt-28 md:mt-0 md:w-5/12 hover-box font-poppins"
      >
        <input
          type="text"
          placeholder="Projectnaam"
          value={roomName}
          onChange={handleRoomNameChange}
          className="w-full h-10 p-6 pl-3 pr-8 text-xs font-normal placeholder-black border-2 border-black rounded-lg md:text-lg box-shadow font-poppins focus:outline-none"
        />
        <Link
          to={`/${roomName.replace(/\s/g, "-").toLowerCase()}`}
          className="absolute inset-y-0 right-0 flex items-center p-6 px-4 bg-yellow-100 border-2 border-black rounded-r-lg md:text-lg focus:outline-none "
        >
          Creër project
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
