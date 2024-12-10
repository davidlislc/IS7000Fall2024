import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from 'react-icons/fa'
import Logs from '../pages/admin/Logs'
import SignUp from '../pages/user/signup';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function Navbar() {
  const { isAuthenticated, isAdmin, dispatch, logout } = useAuth();
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setNav(!nav);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <nav className='flex justify-between p-5 items-center border-b bg-[#e7e7e7d1] nav'>
        <h1 className='text-4xl logo'>Market Insyte</h1>
        <ul className='hidden  md:flex gap-6'>
          <Link to='/'><li>Home</li></Link>
          {isAuthenticated ? (
            <>
              <Link to='/markets'><li>Market Overview</li></Link>
              <Link to='/subscription'><li>Subscriptions</li></Link>
              <Link to='/wallet'><li>Wallet</li></Link>
              <Link to='/profile'><li>Profile</li></Link>
              {isAdmin && (
                <>
                  <Link to='/Subscriptionadminhome'><li>SubscriptionAdmin</li></Link>
                  <Link to='/batch'><li>Batch</li></Link>
                  <Link to='/log'><li>Logging</li></Link>
                </>
              )}
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><button onClick={handleLoginClick}>Login</button></li>
          )}
        </ul>
        <div className=' md:hidden z-10' onClick={handleClick}>
          {nav ? <FaTimes size={25} color='white' /> : <RxHamburgerMenu size={25} />}
        </div>
        <ul
          className={`${nav
            ? 'text-white opacity-100 transform translate-x-0'
            : 'opacity-0 transform -translate-y-full'
            } transition-transform absolute top-0 left-0 w-full h-screen bg-zinc-800/80 flex flex-col justify-center items-center text-2xl`}
          onClick={() => setNav(false)}
        >
          <Link to='/'><li className='hover:text-teal-700'>Home</li></Link>
          {isAuthenticated ? (
            <>
              <Link to='/markets'><li className='hover:text-teal-700'>Market Overview</li></Link>
              <Link to='/subscription'><li className='hover:text-teal-700'>Subscriptions</li></Link>
              <Link to='/wallet'><li className='hover:text-teal-700'>Wallet</li></Link>
              <Link to='/profile'><li className='hover:text-teal-700'>Profile</li></Link>
              {isAdmin && (
                <>
                  <Link to='/Subscriptionadminhome'><li className='hover:text-teal-700'>Subscription Admin</li></Link>
                  <Link to='/batch'><li className='hover:text-teal-700'>Batch</li></Link>
                  <Link to='/log'><li className='hover:text-teal-700'>Logging</li></Link>
                </>
              )}
              <li><button onClick={handleLogout} className='hover:text-teal-700'>Logout</button></li>
            </>
          ) : (
            <li><button onClick={handleLoginClick} className='hover:text-teal-700'>Login</button></li>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Navbar