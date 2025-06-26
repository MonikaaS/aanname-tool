import React from 'react';
import { motion } from 'framer-motion';
import Draggable from 'react-draggable';
import Tooltip from '../components/Tooltip';
import { Assumption } from '../types';
import { ReactComponent as BigLineVertical } from '../assets/svg/big-line-vertical.svg';
import { ReactComponent as BigLineHorizontal } from '../assets/svg/big-line-horizontal.svg';

interface ReflectProps {
  assumptions: Assumption[];
  updateAssumptionPosition: (
    assumptionId: string,
    x: number,
    y: number,
    screenWidth: number,
    screenHeight: number
  ) => void;
}

const Reflect: React.FC<ReflectProps> = ({
  assumptions,
  updateAssumptionPosition,
}) => {
  const onStop = (e: any, data: any, assumption: Assumption) => {
    updateAssumptionPosition(
      assumption.id,
      data.x / window.innerWidth,
      data.y / window.innerHeight,
      window.innerWidth,
      window.innerHeight
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="relative w-full h-screen pt-6 pl-6 md:overflow-hidden"
    >
      <div>
        <div className="flex w-10/12 mx-auto mt-5">
          <h1 className="inline-block mt-20 mb-2 text-xl font-bold md:mt-0 font-poppins">
            Reflect
          </h1>
          <Tooltip
            text="The goal of this step is to discuss as a group where each card best fits on the axis."
            text2="Discuss whether an assumption is fairly certain or not and whether the assumption is a major risk for the project."
          />
        </div>
        <h2 className="w-10/12 pl-8 text-xs font-light md:pl-12 lg:w-10/12 md:w-2/5 lg:pl-0 lg:mx-auto font-poppins">
          Drag the cards to the correct position on the axis
        </h2>
      </div>

      <div className="relative w-full h-screen mx-auto -mt-10 overflow-visible">
        {/* Axis Labels */}
        <div className="absolute flex mr-3 transform -translate-x-1/2 top-1/10 left-1/2">
          <span className="text-2xl font-black text-center font-poppins">
            Uncertain
          </span>
          <Tooltip text="You are not yet sure if this assumption is true or not" />
        </div>
        <div className="absolute flex ml-5 transform -translate-y-1/2 font-poppins top-1/2 right-1/10">
          <span className="text-2xl font-black text-center font-poppins">
            Low Risk
          </span>
          <Tooltip text="If this assumption turns out to be untrue, it will have little impact on the project" />
        </div>
        <div className="absolute flex mr-5 transform -translate-y-1/2 font-poppins top-1/2 left-1/10">
          <span className="text-2xl font-black text-center font-poppins">
            High Risk
          </span>
          <Tooltip text="If this assumption turns out to be false, it will have major consequences for the project" />
        </div>
        <div className="absolute flex ml-2 transform -translate-x-1/2 font-poppins bottom-1/10 left-1/2">
          <span className="text-2xl font-black text-center font-poppins">
            Certain
          </span>
          <Tooltip text="You are sure that this assumption is true" />
        </div>

        {/* Grid Lines */}
        <div className="absolute z-10 w-1/4 transform -translate-x-1/2 -translate-y-1/2 lg:w-3/6 top-1/2 left-1/2 pointer-events-none">
          <BigLineHorizontal className="w-full h-full opacity-100" />
        </div>
        <div className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 h-1/4 lg:h-4/6 top-1/2 left-1/2 pointer-events-none">
          <BigLineVertical className="h-full opacity-100" />
        </div>

        {/* Draggable Assumption Cards */}
        {assumptions.map((assumption) => (
          <Draggable
            key={assumption.id}
            onStop={(e, data) => onStop(e, data, assumption)}
            position={{
              x: assumption.xPosition
                ? assumption.xPosition * window.innerWidth
                : 0,
              y: assumption.yPosition
                ? assumption.yPosition * window.innerHeight
                : 0,
            }}
          >
            <div
              style={{ zIndex: 100 }}
              className="absolute w-48 h-48 p-4 m-2 font-medium text-black bg-yellow-100 border-2 border-black rounded-md cursor-pointer box-shadow-card item font-poppins"
            >
              <p className="overflow-hidden message-item">{assumption.text}</p>
              <div className="absolute text-xs text-gray-600 bottom-2 right-2">
                {assumption.authorName}
              </div>
            </div>
          </Draggable>
        ))}
      </div>
    </motion.div>
  );
};

export default Reflect;
