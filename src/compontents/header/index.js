import React from "react";
import Users from "../users-in-room";
import { useParams, Link } from "react-router-dom";
import DraggableComponent from "../../compontents/drag-assumptions/index.js";
import { ReactComponent as SmallLine } from "../../assets/svg/small-line.svg";

import Timer from "../timer/index";

const Header = () => {
  const { roomId } = useParams(); // Gets roomId from URL

  return (
    <>
      <div className="fixed top-10 right-10">
        <Users></Users>
      </div>
      <div
        className={`relative ${
          window.location.pathname === "/" + roomId ||
          window.location.pathname === "/" + roomId + "/"
            ? "hidden"
            : "hidden md:block"
        } w-56 text-center`}
      >
        {window.location.pathname === "/" + roomId ? (
          <DraggableComponent roomId={roomId}></DraggableComponent>
        ) : null}
        <header
          style={{ backgroundColor: "#FBF9F5" }}
          className={`fixed top-0 z-20 flex flex-col justify-between h-full overflow-y-hidden shadow rounded-2xl w-52 `}
        >
          <div className="mt-10">
            <span className="relative z-10 text-xl font-bold text-center font-poppins">
              {roomId.replace("-", " ")}
            </span>
            <SmallLine className="w-9/12 mx-auto"></SmallLine>
            <div className="relative mt-40">
              <Link
                className={`${
                  window.location.pathname === "/" + roomId + "/setup"
                    ? "border-b-4 border-yellow-300"
                    : ""
                } mx-auto my-5 block w-2/4 font-semibold text-base font-poppins`}
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
                } mx-auto my-5 block w-2/4 font-semibold text-base font-poppins`}
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
                } mx-auto my-5 block w-2/4 font-semibold text-base font-poppins`}
                to={{
                  pathname: `/${roomId}/reflect`,
                }}
              >
                Reflecteren
              </Link>
            </div>
          </div>
          <div className="mb-10">
            {window.location.pathname === "/" + roomId + "/setup" ? (
              <div className="flex justify-center mb-10">
                <Timer roomId={roomId}></Timer>
              </div>
            ) : null}
            <Link
              to="/"
              className="relative z-10 mb-10 text-xs font-bold text-center font-poppins hover:text-indigo-600"
            >
              Aanname tool
            </Link>
          </div>
        </header>
      </div>
      {window.location.pathname === "/" + roomId + "/reflect" ? (
        <DraggableComponent roomId={roomId}></DraggableComponent>
      ) : null}
    </>
  );
};

export default Header;
