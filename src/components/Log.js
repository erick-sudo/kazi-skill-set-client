import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { BiUpArrow, BiDownArrow } from 'react-icons/bi'

import  { UserContext } from "./UserContext"

function Log() {

    const user = useContext(UserContext)

    const navigate = useNavigate()
    const [collapse, setCollapse] = useState(false)

    return (
        <div className="" onMouseLeave={() => setCollapse(false)} onMouseEnter={() => setCollapse(true)}>
            <div className="relative flex items-center bg-slate-300 p-1 rounded-md ring-2 hover:bg-sky-100 cursor-pointer" onClick={() => {
                setCollapse(!collapse)
            }
            }>
                <img alt="Log" className="h-10" src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128_960_720.png" />
                <div className="text-blue-900">{`${user.user.firstname} ${user.user.lastname}`}</div>
                <div className="text-xl text-black mx-2">{ collapse ? <BiUpArrow /> : <BiDownArrow /> }</div>
                
            </div>
            { collapse ?
                <div className="absolute text-black bg-white shadow-md shadow-black z-40 cursor-pointer">
                    <div className="py-3 px-5 hover:bg-sky-400" onClick={() => {
                        setCollapse(false)
                        navigate("viewprofile/me")
                    }}>Profile</div>
                    <div className="py-3 px-5 hover:bg-sky-400" onClick={() => {
                        setCollapse(false)
                        user.logOut()
                    }}>Logout</div>
                </div>
            : null
            }
        </div>
    )
}

export default Log;