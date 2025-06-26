import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Users from './Users';
import Timer from './Timer';
import { ReactComponent as SmallLine } from '../assets/svg/small-line.svg';

interface HeaderProps {
  users: any[];
}

const Header: React.FC<HeaderProps> = ({ users }) => {
  const { roomId } = useParams<{ roomId: string }>();

  if (!roomId) return null;

  const currentPath = window.location.pathname;
  const isAddNamePage =
    currentPath === `/${roomId}` || currentPath === `/${roomId}/`;

  return (
    <>
      {/* Users display in top right */}
      <div className="absolute top-10 right-10 z-50">
        <Users users={users} />
      </div>

      {/* Sidebar navigation */}
      <div
        className={`relative ${
          isAddNamePage ? 'hidden' : 'hidden md:block'
        } w-56 text-center`}
      >
        <header
          style={{ backgroundColor: '#FBF9F5' }}
          className="fixed top-0 z-20 flex flex-col justify-between h-full overflow-y-hidden shadow rounded-2xl w-52"
        >
          <div className="mt-10">
            <span className="relative z-10 text-xl font-bold text-center font-poppins">
              {roomId.replace('-', ' ')}
            </span>
            <SmallLine className="w-9/12 mx-auto" />
            <div className="relative mt-40">
              <Link
                className={`${
                  currentPath === `/${roomId}/setup`
                    ? 'border-b-4 border-yellow-300'
                    : ''
                } mx-auto my-5 block w-2/4 font-semibold text-base font-poppins`}
                to={`/${roomId}/setup`}
              >
                Set Up
              </Link>
              <Link
                className={`${
                  currentPath === `/${roomId}/criticize`
                    ? 'border-b-4 border-yellow-300'
                    : ''
                } mx-auto my-5 block w-2/4 font-semibold text-base font-poppins`}
                to={`/${roomId}/criticize`}
              >
                Critique
              </Link>
              <Link
                className={`${
                  currentPath === `/${roomId}/reflect`
                    ? 'border-b-4 border-yellow-300'
                    : ''
                } mx-auto my-5 block w-2/4 font-semibold text-base font-poppins`}
                to={`/${roomId}/reflect`}
              >
                Reflect
              </Link>
            </div>
          </div>
          <div className="mb-10">
            {/* Timer only shows on setup page */}
            {currentPath === `/${roomId}/setup` && (
              <div className="flex justify-center mb-10">
                <Timer />
              </div>
            )}
            <Link
              to="/"
              className="relative z-10 mb-10 text-xs font-bold text-center font-poppins hover:text-indigo-600"
            >
              Assumption Tool
            </Link>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
