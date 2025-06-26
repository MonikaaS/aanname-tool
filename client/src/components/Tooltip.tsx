import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  text: string;
  text2?: string;
  text3?: string;
  drag?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  text2,
  text3,
  drag = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="z-40 inline">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative items-center justify-center hidden w-4 h-4 my-auto text-xs font-bold bg-gray-100 border-2 border-white rounded-full cursor-pointer z-60 md:flex user font-poppins"
      >
        <span className="text-center">?</span>
      </motion.div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ y: 40, x: 0, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={{ y: 40, x: 0, opacity: 0 }}
            className={`${
              drag ? 'bottom-10 right-16' : 'top-10 left-72'
            } shadow-xl absolute w-48 h-18 p-4 m-2 text-xs text-black bg-white border-2 border-black rounded-md font-poppins z-60`}
          >
            <motion.p className="w-full h-full text-xs text-black bg-white resize-none focus:outline-none">
              {text}
            </motion.p>
            {text2 && (
              <motion.p className="w-full h-full mt-2 text-xs text-black bg-white resize-none focus:outline-none">
                {text2}
              </motion.p>
            )}
            {text3 && (
              <motion.p className="w-full h-full mt-2 text-xs text-black bg-white resize-none focus:outline-none">
                {text3}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
