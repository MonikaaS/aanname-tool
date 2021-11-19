import React from 'react';
import Users from '../users-in-room';

const Header = () => {

 return (
  <div className="">
   <header className="w-full h-20 fixed top-0 bg-white flex content-center shadow-sm z-20 justify-between">
    <span className=" ml-5 relative z-10 text-center font-playfair-display font-black text-2xl my-auto">Aanname tool</span>
    <Users>

    </Users>
   </header>
  </div>

 )};

 export default Header;