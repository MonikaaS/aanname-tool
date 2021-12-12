import React, { useState, useRef, useEffect } from "react";
import Header from "../../compontents/header/index.js";
import { useParams, Link } from "react-router-dom";
import DraggableComponent from "../../compontents/drag-assumptions/index.js";
import socketIOClient from "socket.io-client";
import Tooltip from "../../compontents/tooltip/index.js";

const ALL_ASSUMPTIONS = "AllAssumptions"; // Name of the event

//const SOCKET_SERVER_URL = window.location.origin;
const SOCKET_SERVER_URL = "http://localhost:4000";

const Reflect = (props) => {
  const { roomId } = useParams(); // Gets roomId from URL
  const [assumptions, setAssumptions] = useState([]);

  const socketRef = useRef();

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
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  console.log(assumptions.length === 0);
  return (
    <div className="relative w-full h-screen md:overflow-hidden">
      <div>
        <div className="flex w-10/12 mx-auto mt-5">
          <h1 className="inline-block mb-2 text-xl font-bold">Reflecteren</h1>
          <Tooltip
            text="Het doel van deze stap is om als groep te kijken waar elk kaartje het beste past op de as. Bespreek met elkaar of een een aanname al vrij zeker is of niet en of de aname een groot risico is voor het project."
            roomId={roomId}
          ></Tooltip>
        </div>
        <h2 className="w-10/12 pl-6 mx-auto text-xs font-light">
          Sleep de kaartjes naar de juiste positie op de as
        </h2>
      </div>
      <DraggableComponent roomId={roomId}></DraggableComponent>
      {assumptions && assumptions.length === 0 ? (
        <div className="w-full mt-40 text-center fade-in">
          <h1 className="w-full pt-6 mt-5 mb-2 text-xl font-bold text-indigo-600">
            Er zijn nog geen aannames
          </h1>
          <h2 className="w-10/12 mx-auto text-xs font-light">
            Start met het opstellen van aannames
          </h2>
        </div>
      ) : (
        <div className="relative w-full h-screen mx-auto -mt-10">
          <div className="absolute mr-5 text-2xl font-black text-center transform -translate-x-1/2 font-playfair-display top-1/10 left-1/2">
            Onzeker
          </div>
          <div className="absolute ml-5 text-2xl font-black text-center transform -translate-y-1/2 font-playfair-display top-1/2 right-1/10 ">
            Lage risico
          </div>
          <div className="absolute mr-5 text-2xl font-black text-center transform -translate-y-1/2 font-playfair-display top-1/2 left-1/10 ">
            Hoge risico
          </div>
          <div className="absolute ml-5 text-2xl font-black text-center transform -translate-x-1/2 font-playfair-display bottom-1/10 left-1/2">
            Zeker
          </div>
          <div className="absolute w-3/6 transform -translate-x-1/2 -translate-y-1/2 border-2 border-black top-1/2 left-1/2"></div>
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 border-2 border-black h-4/6 top-1/2 left-1/2"></div>
        </div>
      )}
    </div>
  );
};

export default Reflect;
