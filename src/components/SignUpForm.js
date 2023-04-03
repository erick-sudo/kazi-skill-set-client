import React, { useContext, useState } from "react";

import { UserContext } from "./UserContext"

import cartoon from "../images/signup.png"


function Errors({errs}) {
    return (
    <div className="text-red-500 text-[10px]">
    {
        errs.map((err, index) => <div key={index}>- {err}</div>)        
    }
    </div>
    )
}

function SignUpForm(){

    const { handleSignup } = useContext(UserContext)

    const [profAcc, setProfAcc] = useState(false)

    const [errors, setErrors] = useState({})

    const categories = ['Health', 'Education', 'Building and Construction', 'Software Services', 'Social Services']

    function handleErrors(e) {
        e.preventDefault()

        handleSignup(setErrors, e)
    }

    return(
        <div className="signup-form border">
            <div className="mx-auto flex justify-center items-center">
                <div className="hidden md:block max-w-lg">
                    <img className="w-full" src={cartoon} alt="Sitting" />
                </div>
                 <form onSubmit={handleErrors} className={`${profAcc ? "bg-gradient-to-tr from-white via-cyan-400/50 to-sky-100 " : "bg-gradient-to-tr to-white via-cyan-500/50 from-white"} flex shadow-md shadow-black/50 flex-col p-3 my-8 pb-2 max-w-lg`}>
                        <div className="font-bold mb-2 flex">
                            <input type="checkbox" checked={profAcc} onChange={() => {
                                setProfAcc(!profAcc)
                            }} className="" name="profacc" />
                            <label className="ml-4">Professional Account</label>
                        </div>
                        { profAcc ? <div className="flex flex-col">
                            <label className="text-sm font-bold py-1"><span className="text-red-500 font-bold mr-2">*</span>Job Title:</label>
                            <input type="text" className="shadow-md py-1 px-3" name="job_title"/>
                            {errors.job_title ? <Errors errs={errors.job_title} /> : null}
                        </div> : null }
                        <div className="grid grid-cols-2 gap-4 my-1">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold py-1"><span className="text-red-500 font-bold mr-2">*</span>First Name:</label>
                                <input type="text" className="shadow-md py-1 px-3" name="firstname"/>
                                {errors.firstname ? <Errors errs={errors.firstname} /> : null}
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold py-1"><span className="text-red-500 font-bold mr-2">*</span>Last Name:</label>
                                <input type="text" className="shadow-md py-1 px-3" name="lastname"/>
                                {errors.lastname ? <Errors errs={errors.lastname} /> : null}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 my-1">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold py-1"><span className="text-red-500 font-bold mr-2">*</span>Email Address:</label>
                                <input type="text" className="shadow-md py-1 px-3" name="email"/>
                                {errors.email ? <Errors errs={errors.email} /> : null}
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold py-1"><span className="text-red-500 font-bold mr-2">*</span>Create a username:</label>
                                <input type="text" className="shadow-md py-1 px-3" name="username"/>
                                {errors.username ?  <Errors errs={errors.username} /> : null}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 my-1">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold py-1"><span className="text-red-500 font-bold mr-2">*</span>Phone Number:</label>
                                <input type="text" className="shadow-md py-1 px-3" name="phone"/>
                                {errors.phone ? <Errors errs={errors.phone} /> : null}

                                { profAcc ? <><label className="text-sm  font-bold py-1"><span className="text-red-500 font-bold mr-2">*</span>Category</label>
                                <select className="shadow-md outline-none py-1" name="category_id">
                                    {
                                        categories.map((category,index) => {
                                            return <option key={index} value={index+1}>{category}</option>
                                        })
                                    }
                                </select></> : null }
                            </div>
                            <div className="flex flex-col p-3 min-h-[100px]">
                                <div className="py-1 border-2  border-black/50 h-full flex flex-col justify-center items-center hover:bg-sky-300">
                                    <label htmlFor="poster" className="text-sm font-bold text-sky-700">Add Avatar</label>
                                </div>
                                <input type="file" className="shadow-md py-1 px-3" id="poster" name="poster" hidden/>
                            </div>
                        </div>

                        { profAcc ? <div className="grid grid-cols-2 gap-4 my-1">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold py-1">Portfolio URL:</label>
                                <input type="text" className="shadow-md py-1 px-3" name="portfoliourl"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold py-1"><span className="text-red-500 font-bold mr-2">*</span>Location:</label>
                                <input type="text" className="shadow-md py-1 px-3" name="location"/>
                            </div>
                        </div> : null }

                        <label className="text-sm font-bold py-1"><span className="text-red-500 font-bold mr-2">*</span>Password:</label>
                        <input type="password" className="shadow-md py-1 px-3" name="password"/>
                        {errors.password ? <Errors errs={errors.password} /> : null}

                        <label className="text-sm font-bold py-1"><span className="text-red-500 font-bold mr-2">*</span>Confirm Password:</label>
                        <input type="password" className="shadow-md py-1 px-3" name="password_confirmation"/>
                        {errors.password_confirmation ? <Errors errs={errors.password_confirmation} /> : null}

                        { profAcc ? <><label className="text-sm font-bold py-1">Add description</label>
                        <textarea name="description" rows="5" className="shadow outline-none p-3 mb-3" ></textarea></> : null }


                        <button className="bg-sky-700 w-max px-4 py-2 rounded-md my-2 mx-auto hover:bg-sky-500 hover:text-white">SignUp</button>
                        <a href="/login" className="text-blue-900 text-md text-center">login</a>
            </form>
            <div></div>
          </div>
        </div>
        
    )
}

export default SignUpForm;
