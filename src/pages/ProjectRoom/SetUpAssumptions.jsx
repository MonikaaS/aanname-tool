import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AssumptionMessage from "../../compontents/assumption-message/index.js";
import Tooltip from "../../compontents/tooltip/index.js";
import Walkthrough from "../../compontents/walkthrough/index.js";

const SetUpAssumptions = () => {
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
            Opstellen
          </h1>
          <Tooltip
            text="Start de timer en begin met het opstellen van aannames! Is de tijd
              om?"
            text2="Geen probleem, je kan zo vaak aannames opstellen wanneer je
              wilt."
            text3="Heb je genoeg aannames opgesteld? Ga dan gauw verder naar
              bekritiseren"
            roomId={roomId}
          ></Tooltip>
          <Walkthrough
            localkey="setUp"
            roomId={roomId}
            text="Start hier de timer en begin met het opstellen van aannames!"
          ></Walkthrough>
        </div>
        <h2 className="w-10/12 pl-8 text-xs font-light md:pl-12 lg:w-10/12 md:w-2/5 lg:pl-0 lg:mx-auto font-poppins">
          Voeg aannames over het probleem/project toe!
        </h2>
      </div>
      <AssumptionMessage
        roomId={roomId}
        message={"Aannames opstellen:"}
        location={"setup"}
      ></AssumptionMessage>
    </motion.div>
  );
};

export default SetUpAssumptions;
