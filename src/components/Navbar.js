import React, { useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Log from './Log';
import logo from "../images/logo.png"

// Import Swal


import { UserContext } from './UserContext';

const Navbar = () => {

  const navRef = useRef()

  const user = useContext(UserContext)

  return (
    <div ref={navRef} className='pb-4 text-blue-200 sticky top-0 z-30 bg-gradient-to-t from-sky-100 to-white'>
      
      <div className='gap-2 pr-3 h-max flex'>
        <div className='m-2'>
          <img className='h-32 rounded-xl' src={logo} alt='Kazi Skill Set' />
        </div>
        <div className='slogan hidden sm:flex flex-grow items-center justify-center font-bold text-sky-500 text-center text-[2em] px-2 drop-shadow shadow-black'>Pleasure in the job puts perfection in the work</div>
        <div className='flex justify-end flex-grow gap-3 mt-3'>
        {
          !user.user ? <><NavLink className="hover:text-red-400" to="/login">Login</NavLink>
                    <NavLink className="hover:text-red-400" to="/signup">Sign Up</NavLink>
                    </>
          : <Log />
        }
        </div>
      </div>
      <div className='flex font-bold'>
        <div className='flex flex-grow items-center justify-center gap-3'>
          <NavLink className="hover:text-red-400" to="/">Home</NavLink>
          { user.user ?
            <>
            <NavLink className="hover:text-red-400" to="/home">Professionals</NavLink>
            <NavLink className="hover:text-red-400" to="/tasks">Tasks</NavLink>
            </>
              : null
            }
        </div>
        </div>
    </div>
  );
}

export default Navbar;