import React from "react";
import Users from "../users-in-room";
import { useParams, Link } from "react-router-dom";

import Timer from "../timer/index";

const Header = () => {
  const { roomId } = useParams(); // Gets roomId from URL

  return (
    <div
      className={`relative ${
        window.location.pathname === "/" + roomId ? "hidden" : ""
      } h-screen text-center flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden shadow-md justify-between`}
    >
      <div className="fixed top-10 right-10">
        <Users></Users>
      </div>
      <header className="fixed top-0 z-20 flex flex-col justify-between w-56 h-full overflow-hidden bg-white shadow-md rounded-r-3xl ">
        <span className="relative z-10 mt-10 ml-5 text-2xl font-black text-center font-playfair-display">
          {roomId}
        </span>
        <div className="relative">
          <Link
            className={`${
              window.location.pathname === "/" + roomId + "/setup"
                ? "border-b-4 border-yellow-300"
                : ""
            } mx-auto my-5 block w-2/4 font-bold text-l font-open-sans`}
            to={{
              pathname: `/${roomId}/setup`,
            }}
          >
            Opstellen
          </Link>
          <Link
            className={`${
              window.location.pathname === "/" + roomId + "/criticize"
                ? "border-b-4 border-yellow-300"
                : ""
            } mx-auto my-5 block w-2/4 font-bold text-l font-open-sans`}
            to={{
              pathname: `/${roomId}/criticize`,
            }}
          >
            Bekritiseren
          </Link>
          <Link
            className={`${
              window.location.pathname === "/" + roomId + "/reflect"
                ? "border-b-4 border-yellow-300"
                : ""
            } mx-auto my-5 block w-2/4 font-bold text-l font-open-sans`}
            to={{
              pathname: `/${roomId}/reflect`,
            }}
          >
            Reflecteren
          </Link>
        </div>
        <div className="flex justify-center mb-10">
          <Timer roomId={roomId}></Timer>
        </div>
      </header>
    </div>
  );
};

export default Header;
