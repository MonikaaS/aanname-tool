import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Tooltip from "../../compontents/tooltip/index.js";
import { ReactComponent as BigLineVertical } from "../../assets/svg/big-line-vertical.svg";
import { ReactComponent as BigLineHorizontal } from "../../assets/svg/big-line-horizontal.svg";
import Walkthrough from "../../compontents/walkthrough/index.js";

const ALL_ASSUMPTIONS = "AllAssumptions"; // Name of the event
// const SOCKET_SERVER_URL = window.location.origin;

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="relative w-full h-screen pt-6 pl-6 md:overflow-hidden"
    >
      <div>
        <div className="flex w-10/12 mx-auto mt-5">
          <h1 className="inline-block mt-20 mb-2 text-xl font-bold md:mt-0">
            Reflecteren
          </h1>
          <Tooltip
            text="Het doel van deze stap is om als groep te kijken waar elk kaartje het beste past op de as."
            text2="Bespreek met elkaar of een een aanname al vrij zeker is of niet en of de aanname een groot risico is voor het project."
            roomId={roomId}
          ></Tooltip>
        </div>
        <h2 className="w-10/12 pl-8 text-xs font-light md:pl-12 lg:w-10/12 md:w-2/5 lg:pl-0 lg:mx-auto font-poppins">
          Sleep de kaartjes naar de juiste positie op de as
        </h2>
      </div>
      <div className="relative w-full h-screen mx-auto -mt-10">
        <div className="absolute flex mr-3 transform -translate-x-1/2 top-1/10 left-1/2">
          <span className="text-2xl font-black text-center font-poppins">
            Onzeker
          </span>
          <Tooltip
            drag
            text="Je weet nog niet of deze aanname waar is of niet"
          ></Tooltip>
        </div>
        <div className="absolute flex ml-5 transform -translate-y-1/2 font-poppins top-1/2 right-1/10 ">
          <span className="text-2xl font-black text-center font-poppins">
            {" "}
            Lage risico
          </span>
          <Tooltip
            drag
            text="Wanneer deze aanname niet waar blijkt te zijn, heeft het weinig invloed op het project"
          ></Tooltip>
        </div>
        <div className="absolute flex mr-5 transform -translate-y-1/2 font-poppins top-1/2 left-1/10 ">
          <span className="text-2xl font-black text-center font-poppins">
            {" "}
            Hoge risico
          </span>
          <Tooltip
            drag
            text="Wanneer deze aanname niet waar blijkt te zijn, heeft dit grote gevolgen voor het project"
          ></Tooltip>
        </div>
        <div className="absolute flex ml-2 transform -translate-x-1/2 font-poppins bottom-1/10 left-1/2">
          <span className="text-2xl font-black text-center font-poppins">
            {" "}
            Zeker
          </span>
          <Tooltip
            drag
            text="je bent er zeker van dat deze aanname waar is"
          ></Tooltip>
        </div>
        <div
          style={{ zIndex: -1 }}
          className="absolute z-0 w-1/4 transform -translate-x-1/2 -translate-y-1/2 lg:w-3/6 top-1/2 left-1/2"
        >
          {" "}
          <BigLineHorizontal className="w-full h-full"></BigLineHorizontal>
        </div>
        <div
          style={{ zIndex: -1 }}
          className="absolute z-0 transform -translate-x-1/2 -translate-y-1/2 h-1/4 lg:h-4/6 top-1/2 left-1/2"
        >
          <BigLineVertical className="h-full "></BigLineVertical>
        </div>
        <Walkthrough
          localkey="reflect"
          roomId={roomId}
          text="Sleep hier de kaartjes naar de juiste positie op de as!"
        ></Walkthrough>
      </div>
    </motion.div>
  );
};

export default Reflect;
