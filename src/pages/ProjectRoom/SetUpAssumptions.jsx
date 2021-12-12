import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import AssumptionMessage from "../../compontents/assumption-message/index.js";
import useUsers from "../../client/users/index";

const SetUpAssumptions = () => {
  const { roomId } = useParams(); // Gets roomId from URL

  const { users, sendUser } = useUsers(roomId); // Creates a websocket and manages messaging

  return (
    <div className="relative w-full">
      <div>
        <h1 className="w-10/12 pt-6 pl-6 mx-auto mt-5 mb-2 text-xl font-bold">
          Opstellen
        </h1>
        <h2 className="w-10/12 pl-6 mx-auto text-xs font-light">
          Voeg anonieme aannames over het probleem/project toe!
        </h2>
      </div>
      <AssumptionMessage
        roomId={roomId}
        message={"Aannames opstellen:"}
        location={"setup"}
      ></AssumptionMessage>
    </div>
  );
};

export default SetUpAssumptions;
