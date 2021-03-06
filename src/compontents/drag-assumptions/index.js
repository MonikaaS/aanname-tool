import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import socketIOClient from "socket.io-client";

const RECEIVE_POSITION = "ReceivePosition"; // Name of the event
const ALL_ASSUMPTIONS = "AllAssumptions"; // Name of the event

const SOCKET_SERVER_URL = window.location.origin;

// const SOCKET_SERVER_URL = "http://localhost:4000";

const DraggableComponent = (props) => {
  const roomId = props.roomId;

  const socketRef = useRef();
  const nodeRef = React.useRef(null);

  const [xPosition, setXposition] = useState(0);
  const [yPosition, setYposition] = useState(0);
  const [assumptions, setAssumptions] = useState([]);
  const [currentlyDragged, setCurrentlyDragged] = useState("");
  const [clientHeight, setClientHeight] = useState(0);
  const [clientwidth, setClientWidth] = useState(0);
  const { height, width } = useWindowDimensions();

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

    socketRef.current.on(RECEIVE_POSITION, (assumption) => {
      const filteredUsers = Object.keys(assumption)
        .filter((key) => [roomId].includes(key))
        .reduce((obj, key) => {
          obj[key] = assumption[key];
          return obj;
        }, {});
      setAssumptions([...filteredUsers[roomId]]);
    });

    if (currentlyDragged !== "") {
      socketRef.current.emit(RECEIVE_POSITION, {
        assumption: currentlyDragged,
        xPosition: xPosition,
        yPosition: yPosition,
        screenheight: clientHeight,
        screenwidth: clientwidth,
      });
    }
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [
    roomId,
    xPosition,
    yPosition,
    currentlyDragged,
    clientHeight,
    clientwidth,
  ]);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  const handleDrag = (e, data) => {
    e.preventDefault();
    setXposition(data.x);
    setYposition(data.y);
    setClientWidth(width);
    setClientHeight(height);
    setCurrentlyDragged(data.node.innerText);
  };

  return (
    <div>
      {assumptions !== null &&
        assumptions.map((assumption, i) => (
          <Draggable
            key={assumption.assumption}
            ref={nodeRef}
            onStop={handleDrag}
            position={{
              x:
                assumption.xPosition === 0
                  ? assumption.xPosition
                  : assumption.xPosition * (width / assumption.screenwidth),
              y:
                assumption.yPosition === 0
                  ? assumption.yPosition
                  : assumption.yPosition * (height / assumption.screenheight),
            }}
            defaultPosition={{
              x: assumption.xPosition,
              y: assumption.yPosition,
            }}
          >
            <div
              className={`assumption-card z-40 w-32 h-32 p-4 m-2 text-black bg-yellow-100 border-2 border-black rounded-md cursor-pointer hover:z-50 text-xs font-poppins`}
            >
              {" "}
              <div className={"`message-item"}>{assumption.assumption}</div>
            </div>
          </Draggable>
        ))}
      <div
        className={`assumption-card-last z-20 w-32 h-32 p-4 m-2 text-black rounded-md text-xs font-poppins`}
      >
        {" "}
        <div className={"`message-item mx-auto w-9/12"}>
          Er zijn geen aannames (meer)
        </div>
      </div>
    </div>
  );
};

export default DraggableComponent;
