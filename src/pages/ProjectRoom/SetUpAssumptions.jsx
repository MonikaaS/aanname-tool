import { useParams } from "react-router-dom";

import AssumptionMessage from "../../compontents/assumption-message/index.js";
import Tooltip from "../../compontents/tooltip/index.js";

const SetUpAssumptions = () => {
  const { roomId } = useParams(); // Gets roomId from URL

  return (
    <div className="relative w-full pt-6 pl-6">
      <div>
        <div></div>
        <div className="flex w-10/12 mx-auto mt-5">
          <h1 className="inline-block mb-2 text-xl font-bold">Opstellen</h1>
          <Tooltip
            text="Start de timer en begin met het opstellen van aannames! Is de tijd
              om? Geen probleem, je kan zo vaak aannames opstellen wanneer je
              wilt. Heb je genoeg aannames opgesteld? Ga dan gauw verder naar
              bekritiseren"
            roomId={roomId}
          ></Tooltip>
        </div>
        <h2 className="w-10/12 mx-auto text-xs font-light">
          Voeg anonieme aannames over het probleem/project toe!
        </h2>
      </div>
      <AssumptionMessage
        roomId={roomId}
        message={"Aannames opstellen:"}
        location={"setup"}
      ></AssumptionMessage>
    </div>
  );
};

export default SetUpAssumptions;
