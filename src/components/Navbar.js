import React, { useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Log from './Log';

// Import Swal


import { UserContext } from './UserContext';

const Navbar = () => {

  const navRef = useRef()

  const user = useContext(UserContext)

  return (
    <div ref={navRef} className='p-4 text-blue-200 sticky top-0 z-30 bg-gradient-to-t from-sky-100 to-white'>
      
      <div className='gap-2 pr-3 h-max'>
        <div className='font-bold text-[3em] text-sky-800'>KaziSkillset</div>
        <div className='flex justify-end flex-grow gap-3 mt-3'>
        {
          !user.user ? <><NavLink className="hover:text-red-400" to="/login">Login</NavLink>
                    <NavLink className="hover:text-red-400" to="/signup">Sign Up</NavLink>
                    </>
          : <Log />
        }
        </div>
      </div>
      <div className='flex gap-4 justify-center font-bold'>
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
  );
}

export default Navbar;