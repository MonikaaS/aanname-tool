import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useTransform } from "framer-motion";

const Tooltip = (props) => {
  const roomId = props.roomId;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="z-40 inline">
      {" "}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center w-4 h-4 my-auto text-xs font-bold bg-gray-100 border-2 border-white rounded-full cursor-pointer user font-open-sans"
      >
        <span className="text-center">?</span>
      </motion.div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ y: 40, x: 0, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={{ y: 40, x: 0, opacity: 0 }}
            className={`absolute top-0 left-64 w-48 h-18 p-4 m-2 font-sm text-black bg-white border-2 border-black rounded-md font-open-sans`}
          >
            <motion.p className="w-full h-full text-sm text-black bg-white resize-none focus:outline-none">
              {props.text}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
