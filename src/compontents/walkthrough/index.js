import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Walkthrough = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const storagePath = "hideDiv ";

  useEffect(() => {
    const hideDiv = localStorage.getItem(storagePath);
    setIsVisible(!hideDiv);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(storagePath, 1);
  };
  return (
    isVisible && (
      <div className="z-40 inline">
        {" "}
        <motion.div
          initial={{ y: 0, x: 60, opacity: 1 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          exit={{ y: 40, x: 0, opacity: 0 }}
          className={`absolute bottom-10 left-24 w-48 h-18 p-4 m-2 font-sm text-black bg-white border-2 border-black rounded-md font-open-sans`}
        >
          <button
            className="absolute top-0 right-0 w-8 h-8 text-center text-black rounded-full font-sm"
            onClick={handleClose}
          >
            x
          </button>
          <motion.p className="w-full h-full pt-2 text-sm text-black bg-white resize-none focus:outline-none">
            {props.text}
          </motion.p>
        </motion.div>
      </div>
    )
  );
};

export default Walkthrough;
