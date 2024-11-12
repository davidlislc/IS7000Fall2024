import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from 'react-icons/fa';

function Navbar({ token, setToken }) {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <nav className='flex justify-between p-5 items-center border-b bg-[#e7e7e7d1] nav'>
      <h1 className='text-4xl logo'>Market Insyte</h1>
      <ul className='hidden md:flex gap-6'>
        <Link to='/'><li className='hover:border-b-2 hover:border-teal-700'>Home</li></Link>
        <Link to='/markets'><li className='hover:border-b-2 hover:border-teal-700'>Market Overview</li></Link>
        <Link to='/subscription'><li className='hover:border-b-2 hover:border-teal-700'>Subscriptions</li></Link>
        <Link to='/user'><li className='hover:border-b-2 hover:border-teal-700'>User </li></Link>
        <Link to='/profile'><li className='hover:border-b-2 hover:border-teal-700'>Profile</li></Link>
        <Link to='/wallet'><li className='hover:border-b-2 hover:border-teal-700'>Wallet</li></Link>
        <Link to='/contact'><li className='hover:border-b-2 hover:border-teal-700'>Contact Us</li></Link>
        {token == null ? (
          <Link to='/login'><li className='hover:border-b-2 hover:border-teal-700'>LogIn</li></Link>
        ) : (
          <Link to='/login' onClick={() => setToken(null)}><li className='hover:border-b-2 hover:border-teal-700'>Logout</li></Link>
        )}
      </ul>
      
      {/* Hamburger or Close Icon */}
      <div className='md:hidden z-10' onClick={handleClick}>
        {nav ? <FaTimes size={25} color='white' /> : <RxHamburgerMenu size={25} />}
      </div>

      {/* Mobile Menu */}
      <ul
        className={`${nav ? 'text-white opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-y-full'
          } transition-transform absolute top-0 left-0 w-full h-screen bg-zinc-800/80 flex flex-col justify-center items-center text-2xl`}
        onClick={() => setNav(false)}
      >
        <Link to='/'><li className='hover:border-b-2 hover:border-teal-700'>Home</li></Link>
        <Link to='/markets'><li className='hover:border-b-2 hover:border-teal-700'>Market Overview</li></Link>
        <Link to='/subscription'><li className='hover:border-b-2 hover:border-teal-700'>Subscriptions</li></Link>
        <Link to='/user'><li className='hover:border-b-2 hover:border-teal-700'>User </li></Link>
        <Link to='/profile'><li className='hover:border-b-2 hover:border-teal-700'>Profile</li></Link>
        <Link to='/wallet'><li className='hover:border-b-2 hover:border-teal-700'>Wallet</li></Link>
        <Link to='/contact'><li className='hover:border-b-2 hover:border-teal-700'>Contact Us</li></Link>
        {token == null ? (
          <Link to='/login'><li className='hover:border-b-2 hover:border-teal-700'>LogIn</li></Link>
        ) : (
          <Link to='/login' onClick={() => setToken(null)}><li className='hover:border-b-2 hover:border-teal-700'>Logout</li></Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
