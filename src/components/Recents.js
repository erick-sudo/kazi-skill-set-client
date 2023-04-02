import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { UserContext } from './UserContext';

const Recents = () => {

  const navigate = useNavigate();

  const user = useContext(UserContext)

  const [profs, setProfs] = useState([]);

  useEffect(() => {
    const getProfs = async () => {
      const response = await fetch(`/${sessionStorage.getItem('who') === 'professional' ? 'search' : "topprofs" }`, {
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
                <div className='prof-details flex items-center'>
                  <i className="user circle icon" style={{ fontSize: "25px" }} />
                  <p className='text-sm'>{`${prof.firstname} ${prof.lastname}`}</p>
                </div>
                <p className='text-left text-black' >{prof.description.slice(0,75)+"..."}</p>
                </div>
              </div>
              <div className="extra content">
                <span>
                  <a href={prof.portfoliourl}>Bio</a>
                </span>
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