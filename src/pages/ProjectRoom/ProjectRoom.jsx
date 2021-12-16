import { useState } from "react";
import { useParams, Route, Routes, Link } from "react-router-dom";

import Header from "../../compontents/header/index.js";
import useUsers from "../../client/users/index";
import Criticize from "./Criticize";
import Reflect from "./Reflect";
import AddName from "./AddName";
import SetUpAssumptions from "./SetUpAssumptions";

const ProjectRoom = () => {
  const { roomId } = useParams(); // Gets roomId from URL

  const [haveName, setHaveName] = useState(false);
  const { users, sendUser } = useUsers(roomId); // Creates a websocket and manages messaging
  const [newUser, setNewUser] = useState(""); // Message to be sent

  const handleSendUser = () => {
    sendUser(newUser);
    setNewUser("");
  };

  return (
    <div
      className={`relative flex flex-row ${
        window.location.pathname === "/" + roomId + "/reflect"
          ? "h-screen overflow-hidden"
          : "min-h-screen"
      }`}
    >
      <Header users={users}></Header>
      <Routes>
        <Route path="/" element={<AddName />} />
        <Route path="/setup" element={<SetUpAssumptions />} />
        <Route path="/criticize" element={<Criticize />} />
        <Route path="/reflect" element={<Reflect />} />
      </Routes>
    </div>
  );
};

export default ProjectRoom;
