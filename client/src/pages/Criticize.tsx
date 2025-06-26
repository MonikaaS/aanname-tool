import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import AssumptionMessage from '../components/AssumptionMessage';
import AssumptionQuestion from '../components/AssumptionQuestion';
import Tooltip from '../components/Tooltip';
import { Assumption } from '../types';

interface CriticizeProps {
  assumptions: Assumption[];
  addAssumption: (text: string) => void;
  deleteAssumption: (assumptionId: string) => void;
  selectAssumption: (assumptionId: string, isSelected: boolean) => void;
}

const Criticize: React.FC<CriticizeProps> = ({
  assumptions,
  addAssumption,
  deleteAssumption,
  selectAssumption,
}) => {
  const { roomId } = useParams<{ roomId: string }>();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="relative w-full pt-6 pl-6"
    >
      <div>
        <div className="flex w-10/12 mx-auto mt-5">
          <h1 className="inline-block mt-20 mb-2 text-xl font-bold md:mt-0 font-poppins">
            Critique
          </h1>
          <Tooltip
            text="In this step, you will collectively discuss the assumptions."
            text2="Using the critical questions, you will go through all the assumptions."
            text3="You might notice that new assumptions have arisen; you can choose to add them to the tool or proceed to reflect."
          />
        </div>
        <h2 className="w-10/12 pl-8 text-xs font-light md:pl-12 lg:w-10/12 md:w-2/5 lg:pl-0 lg:mx-auto font-poppins">
          Click on the critical questions to critique the assumptions.
        </h2>
      </div>
      <AssumptionQuestion roomId={roomId || ''} />
      <AssumptionMessage
        assumptions={assumptions}
        addAssumption={addAssumption}
        deleteAssumption={deleteAssumption}
        selectAssumption={selectAssumption}
        location="criticize"
      />
    </motion.div>
  );
};

export default Criticize;
