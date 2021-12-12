import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import AssumptionMessage from "../../compontents/assumption-message/index.js";
import useUsers from "../../client/users/index";
import AssumptionQuestion from "../../compontents/assumption-questions/index.js";

const Criticize = () => {
  const { roomId } = useParams(); // Gets roomId from URL

  const { users, sendUser } = useUsers(roomId); // Creates a websocket and manages messaging

  return (
    <div className="relative w-full">
      <div>
        <h1 className="w-10/12 pt-6 pl-6 mx-auto mt-5 mb-2 text-xl font-bold">
          Bekritiseren
        </h1>
        <h2 className="w-10/12 pl-6 mx-auto text-xs font-light">
          Klik op de kritische vragen om de aannames te Bekritiseren
        </h2>
      </div>
      <AssumptionQuestion roomId={roomId}></AssumptionQuestion>
      <AssumptionMessage
        roomId={roomId}
        message={"Opgestelde aannames:"}
        location={"criticize"}
      ></AssumptionMessage>
    </div>
  );
};

export default Criticize;
