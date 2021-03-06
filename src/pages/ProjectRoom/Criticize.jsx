import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AssumptionMessage from "../../compontents/assumption-message/index.js";
import AssumptionQuestion from "../../compontents/assumption-questions/index.js";
import Tooltip from "../../compontents/tooltip/index.js";

const Criticize = () => {
  const { roomId } = useParams(); // Gets roomId from URL

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="relative w-full pt-6 pl-6"
    >
      <div>
        <div className="flex w-10/12 mx-auto mt-5">
          <h1 className="inline-block mt-20 mb-2 text-xl font-bold md:mt-0">
            Bekritiseren
          </h1>
          <Tooltip
            text="Bij deze stap ga je gezamenlijk met elkaar het gesprek aan over de aannames. "
            text2="Met behulp van de kritische vragen, ga je alle aannames af."
            text3="Je zult misschien merken dat er nieuwe aannames zijn ontstaan, je kan er voor kiezen om deze in de tool te zetten of door te gaan naar reflecteren"
            roomId={roomId}
          ></Tooltip>
        </div>
        <h2 className="w-10/12 pl-8 text-xs font-light md:pl-12 lg:w-10/12 md:w-2/5 lg:pl-0 lg:mx-auto font-poppins">
          Klik op de kritische vragen om de aannames te Bekritiseren
        </h2>
      </div>
      <AssumptionQuestion roomId={roomId}></AssumptionQuestion>
      <AssumptionMessage
        roomId={roomId}
        message={"Opgestelde aannames:"}
        location={"criticize"}
      ></AssumptionMessage>
    </motion.div>
  );
};

export default Criticize;
