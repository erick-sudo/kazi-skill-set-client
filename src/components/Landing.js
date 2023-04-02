import React, { useContext } from 'react';

import { UserContext } from './UserContext';

const Landing = () => {

  const user = useContext(UserContext)
  
  return (
    <div className="bg-slate-100 flex flex-col justify-between">
      <div className='relative font-bold flex-grow flex h-80'>
        <div className='flex-grow flex items-center'>
          <p className='font-bold text-[2em] w-1/2 text-center'>Get Started</p>
          <img onClick={() => user.testing("Erick")} className='max-w-lg' src='https://cdn.pixabay.com/photo/2017/10/21/12/36/training-2874597__340.jpg' />
        </div>
      </div>

      <div className="w-3/4 my-5 mx-auto flex p-2 shadow rounded-md bg-white shadow-black">
        <input className='flex-grow outline-none p-2' type="text" placeholder="Search here..." />
        <button className="button bg-blue-400 px-4 py-2 rounded-md">Search</button>
       </div>
  
    </div>
   
  );
}

export default Landing;