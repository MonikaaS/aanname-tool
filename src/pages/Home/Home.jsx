import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div>
      <div className="relative w-1/2 mx-auto">
        <h1 className="relative z-10 text-center font-playfair-display font-black text-6xl mt-12">Aanname tool</h1>
        <div className="w-1/2 h-10 bg-yellow-100 mx-auto absolute top-1/2 left-36"></div>
      </div>
      <div className="my-10">
        <p className="font-open-sans font-medium text-lg text-center w-1/3 mx-auto"> Creëer een nieuw project om samen met elkaar aannames over het op te lossen probleem te bespreken</p>
      </div>
      <div className="mx-auto w-1/3 font-open-sans font-medium text-xl relative">
        <input
          type="text"
          placeholder="Projectnaam"
          value={roomName}
          onChange={handleRoomNameChange}
          className="box-shadow p-6 font-open-sans font-medium text-xl w-full h-10 pl-3 pr-8 placeholder-black border-black border-2 rounded-lg focus:outline-none"
        />
        <Link to={`/${roomName.replace(/\s/g, '-').toLowerCase()}`} className="p-6 absolute inset-y-0 right-0 flex items-center px-4 bg-yellow-100 rounded-r-lg border-black border-2 focus:outline-none ">
          Creër project
        </Link>
      </div>
    </div>
  );
};

export default Home;