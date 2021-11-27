import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"


const Home = () => {
  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };



  return (
    <div>
      <div className="relative w-1/2 mx-auto">
        <motion.h1 animate={{ y: [0, -10] }} transition={{ ease: "easeOut", duration: 0.2 }} className="relative z-10 mt-12 text-6xl font-black text-center item font-playfair-display">Aanname tool</motion.h1>
        <div className="absolute w-1/2 h-10 mx-auto bg-yellow-100 top-1/2 left-36"></div>
      </div>
      <div className="my-10">
        <p className="w-1/3 mx-auto text-lg font-medium text-center font-open-sans"> Creëer een nieuw project om samen met elkaar aannames over het op te lossen probleem te bespreken</p>
      </div>
      <div className="relative w-1/3 mx-auto text-xl font-medium font-open-sans">
        <input
          type="text"
          placeholder="Projectnaam"
          value={roomName}
          onChange={handleRoomNameChange}
          className="w-full h-10 p-6 pl-3 pr-8 text-xl font-medium placeholder-black border-2 border-black rounded-lg box-shadow font-open-sans focus:outline-none"
        />
        <Link to={`/${roomName.replace(/\s/g, '-').toLowerCase()}`} className="absolute inset-y-0 right-0 flex items-center p-6 px-4 bg-yellow-100 border-2 border-black rounded-r-lg focus:outline-none ">
          Creër project
        </Link>
      </div>
    </div>
  );
};

export default Home;