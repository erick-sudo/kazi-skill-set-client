import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { UserContext } from './UserContext';
import { SiWebmoney } from 'react-icons/si'
import { RiAccountPinCircleFill } from 'react-icons/ri'

const Recents = () => {

  const navigate = useNavigate();

  const user = useContext(UserContext)

  const [profs, setProfs] = useState([]);

  useEffect(() => {
    const getProfs = async () => {
      const response = await fetch(`https://kazi-skill-set-server.herokuapp.com/${sessionStorage.getItem('who') === 'professional' ? 'search' : "topprofs" }`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
        }
      });
      //alert(response.status)
      const finalData = await response.json();
      setProfs(finalData)
    }

    if(user.user) {
      getProfs()
    }
  }, [user])
  
  return (
    <div className='section-2'>
    <h2 id="buy" className='p-4'>Top professionals</h2>
      <div className='p-4 justify-center grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bor'>
      { profs ?
        profs.map((prof, index) => {
          return (
            <div key={index} className="ui card shadow-sm" onClick={() => {
              navigate(`/prof/${prof.id}`)
            }}>
              <div className="image" >
                <img src={prof.poster} alt="Poster"/>
              </div>
              <div className="content">
                <div className="header">
                </div>
                <div className="meta text-wrap">
                <div className='prof-details flex items-center flex-col'>
                  <RiAccountPinCircleFill />
                  <p className='text-sm'>{`${prof.firstname} ${prof.lastname}`}</p>
                  <p>{prof.job_title}</p>
                </div>
                <p className='text-left text-black' >{prof.description.slice(0,75)+"..."}</p>
                </div>
              </div>
              <div className="extra content">
                <span className='text-sky-700'>Portfolio</span>
                <div className='flex items-center gap-3 text-sky-500 cursor-pointer'>
                  <SiWebmoney />
                  <a href={prof.portfoliourl}>{prof.portfoliourl}</a>
                </div>
              </div>
            </div>
            )
          }) : null
        }
      </div>
    </div>
  );
}

export default Recents;