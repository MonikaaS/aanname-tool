import React from "react";
import Users from "../users-in-room";
import { useParams, Link } from "react-router-dom";
import DraggableComponent from "../../compontents/drag-assumptions/index.js";

import Timer from "../timer/index";

const Header = () => {
  const { roomId } = useParams(); // Gets roomId from URL

  return (
    <>
      <div
        className={`relative ${
          window.location.pathname === "/" + roomId ? "hidden" : ""
        } w-56 text-center`}
      >
        <div className="fixed top-10 right-10">
          <Users></Users>
        </div>
        <header className="fixed top-0 z-20 flex flex-col justify-between w-56 h-full overflow-y-hidden bg-white shadow-md ">
          <div className="mt-10">
            <span className="relative z-10 ml-5 text-2xl font-black text-center font-playfair-display">
              {roomId}
            </span>
            <div className="relative mt-40">
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
          </div>
          {window.location.pathname === "/" + roomId + "/setup" ? (
            <div className="flex justify-center mb-10">
              <Timer roomId={roomId}></Timer>
            </div>
          ) : null}
        </header>
      </div>
      {window.location.pathname === "/" + roomId + "/reflect" ? (
        <DraggableComponent roomId={roomId}></DraggableComponent>
      ) : null}
    </>
  );
};

export default Header;
