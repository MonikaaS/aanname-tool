import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import useUsers from "../../client/users/index";
import Modal from "../../compontents/modal/index.js";

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
    <div className="relative grid w-full grid-cols-2 gap-2 ">
      <Modal></Modal>
      <div
        className={`relative ${haveName ? "hidden" : ""} text-center w-full`}
      >
        <div className="relative w-1/2 mx-auto">
          <h1 className="relative z-10 mt-40 mb-20 text-6xl font-bold text-center font-poppins">
            {roomId}
          </h1>
          <div className="absolute w-1/2 h-10 mx-auto bg-yellow-100 top-1/2 left-36"></div>
        </div>
        <div
          className={`mt-10 relative w-8/12 mx-auto text-xl font-normal font-poppins`}
        >
          <input
            value={newUser}
            placeholder="Wat is je naam?"
            className={` ${
              haveName ? "hidden" : ""
            } box-shadow p-6 font-poppins font-normal text-lg w-full h-10 pl-3 pr-8 placeholder-black border-black border-2 rounded-lg focus:outline-none`}
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
        </div>
        <div
          className={`hover-box my-20 relative w-8/12 mx-auto text-lg font-medium font-poppins`}
        >
          <input
            value={window.location.href}
            placeholder="Wat is je naam?"
            className={` ${
              haveName ? "hidden" : ""
            } cursor-pointer box-shadow p-6 font-poppins font-normal text-lg w-full h-10 pl-3 pr-8 placeholder-black border-black border-2 rounded-lg focus:outline-none`}
          />
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="absolute inset-y-0 right-0 flex items-center p-6 px-4 text-xl font-medium bg-yellow-100 border-2 border-black rounded-r-lg font-poppins focus:outline-none "
          >
            Kopier link
          </button>
        </div>
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
      </div>
    </div>
  );
};

export default AddName;
