import React from 'react';
import Users from '../users-in-room';
import { useParams, Link } from 'react-router-dom';

const Header = () => {
 const { roomId } = useParams(); // Gets roomId from URL
 
 return (
  <div className="">
   <header className="fixed top-0 z-20 flex content-center justify-between w-full h-20 bg-white shadow-sm">
    <span className="relative z-10 my-auto ml-5 text-2xl font-black text-center font-playfair-display">Aanname tool</span>
    <div className="relative z-10 my-auto">
     <Link
         className={`${window.location.pathname === "/"+roomId ? 'border-b-4 border-yellow-300' : '' } mr-20 font-bold text-l font-open-sans`}
         to={{
           pathname: `/${roomId}`
         }}
         >
           Bekritiseren
     </Link>
     <Link
         className={`${window.location.pathname === "/"+roomId+"/reflect" ? 'border-b-4 border-yellow-300' : '' } ml-20 font-bold text-l font-open-sans`}
         to={{
           pathname: `/${roomId}/reflect`
         }}
         >
           Reflecteren
     </Link>
    </div>
    <Users>

    </Users>
   </header>
  </div>

 )};

 export default Header;