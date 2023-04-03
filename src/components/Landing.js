import React, { useContext } from 'react';

import { UserContext } from './UserContext';

{/* <div className="w-3/4 my-5 mx-auto flex p-2 shadow rounded-md bg-white shadow-black">
        <input className='flex-grow outline-none p-2' type="text" placeholder="Search here..." />
        <button className="button bg-blue-400 px-4 py-2 rounded-md">Search</button>
       </div> */}

const Landing = () => {

  const user = useContext(UserContext)
  
  return (
    <div className="bg-slate-100 flex flex-col justify-between">
      <div className=' w-full flex flex-col items-center md:flex-row'>
        <div className='font-bold text-[2em] w-1/2 text-center my-4 drop-shadow-lg'>Be so good they can't ignore you</div>
        <div className='max-w-lg'>
          <img onClick={() => user.testing("Erick")} className='' src='https://cdn.pixabay.com/photo/2017/10/21/12/36/training-2874597__340.jpg' />
        </div>
      </div>
      <div className='my-5 ml-5 max-w-lg p-2 bg-'>
        <h2>Subscribe to our news letter</h2>
        <div className='bg-sky-500 m-2 ring-2 flex rounded-xl'>
        <input className='flex-grow outline-none p-3 rounded-xl' type="text" placeholder='Email' />
        <button className='px-2 text-white font-bold'>Subscribe</button>
        </div>
      </div>
    </div>
   
  );
}

export default Landing;