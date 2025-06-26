import { useEffect } from 'react';
import { useParams, Route, Routes, useLocation } from 'react-router-dom';

import Header from '@components/Header';
import { useAssumptions } from '@hooks/useAssumptions';
import { useAppContext } from '@contexts/AppContext';
import { useUsers } from '@hooks/useUsers';
import Criticize from './Criticize';
import Reflect from './Reflect';
import AddName from './AddName';
import SetUpAssumptions from './SetUpAssumptions';

const ProjectRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const location = useLocation();
  const { state, connect, disconnect } = useAppContext();
  const { users, assumptions } = state;

  const {
    addAssumption,
    updateAssumptionPosition,
    selectAssumption,
    deleteAssumption,
  } = useAssumptions();

  const { sendUser } = useUsers();

  useEffect(() => {
    if (roomId) {
      connect(roomId);
    }
    return () => {
      disconnect();
    };
  }, [roomId, connect, disconnect]);

  return (
    <div
      className={`relative flex flex-row ${
        location.pathname === `/${roomId}/reflect`
          ? 'h-screen overflow-hidden'
          : 'min-h-screen'
      }`}
    >
      <Header users={users} />
      <Routes>
        <Route path="/" element={<AddName sendUser={sendUser} />} />
        <Route
          path="/setup"
          element={
            <SetUpAssumptions
              assumptions={assumptions}
              addAssumption={addAssumption}
              deleteAssumption={deleteAssumption}
              selectAssumption={selectAssumption}
            />
          }
        />
        <Route
          path="/criticize"
          element={
            <Criticize
              assumptions={assumptions}
              addAssumption={addAssumption}
              deleteAssumption={deleteAssumption}
              selectAssumption={selectAssumption}
            />
          }
        />
        <Route
          path="/reflect"
          element={
            <Reflect
              assumptions={assumptions}
              updateAssumptionPosition={updateAssumptionPosition}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default ProjectRoom;
