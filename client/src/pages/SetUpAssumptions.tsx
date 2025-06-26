import { motion } from 'framer-motion';
import AssumptionMessage from '../components/AssumptionMessage';
import Tooltip from '../components/Tooltip';
import { Assumption } from '../types';

interface SetUpAssumptionsProps {
  assumptions: Assumption[];
  addAssumption: (text: string) => void;
  deleteAssumption: (assumptionId: string) => void;
  selectAssumption: (assumptionId: string, isSelected: boolean) => void;
}

const SetUpAssumptions: React.FC<SetUpAssumptionsProps> = ({
  assumptions,
  addAssumption,
  deleteAssumption,
  selectAssumption,
}) => {
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
            Set Up
          </h1>
          <Tooltip
            text="Start the timer and begin drafting assumptions! Is the timer up?"
            text2="No problem, you can create assumptions as often as you like."
            text3="Have you drafted enough assumptions? Then proceed to the critique phase."
          />
        </div>
        <h2 className="w-10/12 pl-8 text-xs font-light md:pl-12 lg:w-10/12 md:w-2/5 lg:pl-0 lg:mx-auto font-poppins">
          Add assumptions about the problem/project!
        </h2>
      </div>
      <AssumptionMessage
        assumptions={assumptions}
        addAssumption={addAssumption}
        deleteAssumption={deleteAssumption}
        selectAssumption={selectAssumption}
        location="setup"
      />
    </motion.div>
  );
};

export default SetUpAssumptions;
