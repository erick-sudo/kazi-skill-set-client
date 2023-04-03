import React, {useContext, useEffect, useState} from 'react';

import { UserContext } from './UserContext';

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const user = useContext(UserContext)

  useEffect(() => {
    // Get the user Id
    
    // Fetch data using the user Id
    if(user.user) {
      fetch(`https://kazi-skill-set-server.herokuapp.com/tasks`,{
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
          }
      })
      .then((response) => response.json())
      .then((data) => {
        const tasks = data
        setTasks(tasks);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [user]);

    return (
        <div className=''>
            <h1 className='p-4'>Search, filter, and pick tasks from clients</h1>

            <div className='flex items-center'>
              <div className='title absolute text-[2em] font-bold right-10'>KaziSkillset</div>
              <img className='' src="https://cdn.pixabay.com/photo/2018/03/11/09/09/time-3216244_960_720.jpg" alt="Tasks" />
            </div>

            <div className="w-3/4 my-5 mx-auto flex p-2 shadow rounded-md bg-white shadow-black">
              <input className='flex-grow outline-none p-2' type="text" placeholder="Search here..." />
              <button className="button bg-blue-400 px-4 py-2 rounded-md">Search</button>
            </div>

            <div className='flex flex-wrap'>
                {tasks.slice(0,8).map((task, index) => {
                  return <Task task={task} key={index} />
                })}
            </div>
            
        </div>
    )
}

function Task({task, cart, p_id, igniteReload, clearPendingTask}) {

  const user = useContext(UserContext)

  return (
      <div className="min-w-[400px] max-w-lg shadow shadow-black m-3 p-4 bg-sky-100 rounded-md bg-gradient-to-tr from-sky-100 to-white">
        <h2>{task.location}</h2>
          <p className="card-text">{task.description}</p>
          <p className="card-text">{task.start_date}</p>
          <div className='flex p-3 font-bold gap-4'>
          { cart ? <><button onClick={() => {
            user.signContract(user.user.id, task.client_id, task.id, p_id, igniteReload)
          }} className='text-white bg-green-700 px-3 py-2 rounded-md'>Sign Contract</button><button onClick={() => {
            user.declineTask(p_id)
            clearPendingTask(p_id)
          }} className='text-white bg-red-500 px-3 py-2 rounded-md'>Decline</button></> : <button onClick={() => {
              user.takeTask(task.id, user.user.id)
          }} className='text-white bg-green-500 px-3 py-2 rounded-md hover:bg-sky-500'>Add</button> }
        </div>
      </div>
  )
}

export { Task, Tasks }