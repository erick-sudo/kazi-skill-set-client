import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { BsStarFill, BsStar } from "react-icons/bs"
import { GoNoNewline } from "react-icons/go"

import Loading from "./Loading";
import { UserContext } from "./UserContext";

function ViewProfessional() {

    const {id} = useParams()

    const [prof, setProf] = useState(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/${sessionStorage.getItem('who') === 'client' ? "clients_profs" : "professionals"}/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
          }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setProf(data)
            setLoading(false)
        })
    }, [])

    return (
    <>  { loading ? 
        <Loading /> :
        <>
        { prof && prof.id ? <><div className="grid grid-cols-2 items-center relative">
            <div className="max-w-lg shadow m-4 flex flex-col">
                <img className="border" src={prof.poster} alt="Avatar" />
                <button className="bg-sky-400 py-4 px-6 mx-auto block my-3 rounded-md font-bold hover:bg-sky-600 hover:text-white" onClick={() => window.location = (prof.portfoliourl)}>Portfolio</button>
                <div className="font-bold text-center py-2 w-3/4 mx-auto">{prof.location ? prof.location.toUpperCase() : null}</div>
            </div>
            <div className="">
                <h2 className="text-sky-800">#{prof.username}</h2>
                <h1>{prof.firstname} {prof.lastname}</h1>
                <a href={`mailto:${prof.email}`}>{prof.email}</a>
                <div><a href={`tel:${prof.phone}`}>{prof.phone}</a></div>
                <p className="text-sm">{prof.description}</p>
            </div>
        </div>
        <Reviews id={prof.id} /> </> : null }
        </>
        }
    </>
    )
}

function ProfessionalProfile() {

    const [prof, setProf] = useState(null)

    const user = useContext(UserContext)


    const [loading, setLoading] = useState(true)

    function handleChange(e) {
      setProf({...prof, [e.target.name]: e.target.value})
    }

    

    useEffect(() => {
        fetch(`/me_prof`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
          }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setProf(data)
            setLoading(false)
        })
    }, [])

    return (
    <>  { loading ? 
        <Loading /> :
        <>
        { prof && prof.id ? <>
        <form onSubmit={(e) => {
          e.preventDefault();
          user.handleProfUpdate(setProf, prof)
        }} className="grid grid-cols-2 relative bg-sky-400 justify-center">
            <div className="max-w-lg shadow-md shadow-black m-4 flex flex-col p-2 justify-center">
                <div className="flex flex-col max-w-lg mb-2">
                  <label>Change Job Title</label>
                  <input type="text" className="p-2 outline-none" onChange={handleChange} name="job_title"  value={prof.job_title} />
                </div>
                <img className="border" src={prof.poster} alt="Avatar" />
                <div className="flex flex-col max-w-lg">
                  <label>Change Portfoliourl</label>
                  <input type="url" className="p-2 outline-none" onChange={handleChange} name="portfoliourl"  value={prof.portfoliourl} />
                </div>
                <div className="flex flex-col max-w-lg">
                  <label>Switch Location</label>
                  <input className="p-2 outline-none" onChange={handleChange} name="location"  value={prof.location} />
                </div>
            </div>
            <div className=" p-4">
                <div className="flex flex-col max-w-lg">
                  <label>Username</label>
                  <input className="p-2 outline-none" onChange={handleChange} name="username"  value={prof.username} />
                </div>
                <div className="flex flex-col max-w-lg">
                  <label>First Name</label>
                  <input className="p-2 outline-none" onChange={handleChange} name="firstname"  value={prof.firstname} />
                </div>
                <div className="flex flex-col max-w-lg">
                  <label>Last Name</label>
                  <input className="p-2 outline-none" onChange={handleChange} name="lastname"  value={prof.lastname} />
                </div>
                <div className="flex flex-col max-w-lg">
                  <label>Email Address</label>
                  <input className="p-2 outline-none" onChange={handleChange} name="email"  value={prof.email} />
                </div>
                <div className="flex flex-col max-w-lg">
                  <label>Phone Number</label>
                  <input className="p-2 outline-none" onChange={handleChange} name="phone"  value={prof.phone} />
                </div>
                <div className="flex flex-col max-w-lg">
                  <label>Chage Job Description</label>
                  <textarea rows="7" className="p-2 outline-none" onChange={handleChange} name="description"  value={prof.description}></textarea>
                </div>
            </div>
            <div></div>
            <div className="flex justify-center my-3">
              <input className="bg-sky-800 py-2 px-4 rounded-md hover:bg-white hover:text-black font-bold" type="submit" value="Update Changes" />
            </div>
        </form>
        <Reviews id={prof.id} who="prof" /> </> : null }
        </>
        }
    </>
    )
}

function Reviews({id, who}) {

    const [reviews, setReviews]  = useState([])
    const [selectedJob, setSelectedJob] = useState(0)

    function deleteJob(reviewId) {
      setReviews(reviews.filter(review => review.id !== reviewId))
      fetch(`/jobs/${reviewId}`,{
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(res => {

      })
    }

    useEffect(() => {
        fetch(`/${sessionStorage.getItem('who') === 'client' ? 'clients' : 'professionals'}/${id}/reviews`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
          }
        })
        .then(response => response.json())
        .then(revs => setReviews(revs))
    }, [])

    return (
        <> { reviews.length > 0 &&
        <div className="border-t-2 border-sky-800 p-3">
            <h1 className="px-5">Job Reviews</h1>
            <div className="jobs grid grid-cols-2 w-full gap-2">
                <div className="jobs grid grid-cols-1 items-start">
                  {
                    reviews.map((job, index) => {
                      return <JobReviewCard job={job} key={index} jobNumber={index} setSelectedJob={setSelectedJob} deleteJob={deleteJob} />
                    })
                  }
                </div>
                <div className="reviews" >
                  <h2 className="pl-4">Reviewers</h2>
                    { reviews[selectedJob] ?
                      reviews[selectedJob].reviews.length > 0 ?
                      reviews[selectedJob].reviews.map((rev, idx) => {
                        return <JobReviewerCard rev={rev} key={idx} />
                      }) : <div className="flex flex-col text-red-600 justify-center items-center border-2 border-red-600 rounded-lg m-4 p-3"><p className="font-bold text-3xl m-0">No reviews yet</p><GoNoNewline className="text-[5em]" /></div>
                      : null
                    }
                </div>
            </div>
        </div> }
        </>
    )
}

function JobReviewCard({job, jobNumber, setSelectedJob, deleteJob}) {
  return (
    <div className="relative p-3 my-3 bg-slate-50 rounded-md">
      <button onClick={() => deleteJob(job.id)} className="bg-red-600 px-3 py-1 absolute right-2 rounded-md text-white">Remove</button>
      <div className="border-sky-400 border-b-4">
        <img className="" src="https://cdn.pixabay.com/photo/2013/07/13/01/10/plumbing-155224__340.png" />
      </div>
      <div>
        <p className="">Client: <span className="font-bold text-sky-800">{`${job.client.firstname} ${job.client.lastname}`}</span></p>
        <p className="text-sm">Email: <span className="text-sky-400">{job.client.email}</span></p>
      </div>
      <div className="flex justify-end py-2">
        <button onClick={() => setSelectedJob(jobNumber)} className="bg-sky-400 py-2 px-3 rounded-md hover:bg-sky-900 hover:text-white">See Reviews</button>
      </div>
    </div>
  )
}

function JobReviewerCard({rev}) {
  return (
    <div className="p-3 my-3 rounded-md bg-white">
      <div className="flex items-center">
        <img className="rounded-full ring-4 ring-sky-900 h-28" src="https://cdn.pixabay.com/photo/2023/03/20/07/30/ai-generated-7864001__340.jpg" />
        <div className="border-b-2 border-sky-900 px-3">
          <div className="font-bold text-sky-400">Sha Labadie</div>
          <div className="text-sky-800 break-all">shalabadie@feil.com</div>
        </div>
      </div>
      <div className="text-sm border-b-2 border-sky-400 p-2">{rev.comment}</div>
      <div className="font-bold">Rating</div>
      <div className="flex justify-center text-sky-400">
        {new Array(10).fill(0).map((star, idx) => idx < rev.star_rating ? <BsStarFill key={idx} /> : <BsStar key={idx} />)}
      </div>
    </div>
  )
}

export { ViewProfessional, ProfessionalProfile }