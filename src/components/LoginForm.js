import { useContext, useState } from "react"
import { GiPadlock} from "react-icons/gi"
import { RiAccountCircleLine} from "react-icons/ri"
import { RiLoginCircleLine } from "react-icons/ri"
import { NavLink } from "react-router-dom"
import cartoon from "../images/sitted.png"

import { UserContext } from "./UserContext"

function LoginForm(){

    const [profAcc, setProfAcc] = useState(false)

    const [errors, setErrors] = useState({})

    const { handleLogin } = useContext(UserContext)

    return(
        <div className="mt-5">
            <div className="flex justify-center items-center p-5">
                <div className="hidden sm:block max-w-lg">
                    <img className="w-full" src={cartoon} alt="Sitting" />
                </div>
                 <form onSubmit={(e) => handleLogin(setErrors, e)} className="shadow-lg shadow-black flex flex-col px-10 bg-white max-w-lg ">
                    <div className="my-3 text-center flex justify-center text-slate-300" style={{fontSize: "5em"}}><RiLoginCircleLine /></div>
                    <div className="font-bold mb-2 flex">
                            <input type="checkbox" checked={profAcc} onChange={() => {
                                setProfAcc(!profAcc)
                            }} className="" name="profacc" />
                            <label className="ml-4">Professional Account</label>
                    </div>
                    <div className="flex my-3">
                     <div className="border border-black py-2 px-3 flex items-center">
                     <RiAccountCircleLine/>
                     </div>
                      <input type="text" className="outline-none  border border-black p-2" name="username" placeholder="User Name" />
                    </div> 
                   
                     <div className="flex my-3">
                     <div className="border border-black py-2 px-3 flex items-center">
                     <GiPadlock/>
                    </div>
                     <input type="password" className=" outline-none border border-black p-2" name="password" placeholder="Password"/> 
                    </div>
                    
                    {errors.error ? <div className="text-red-600 text-sm text-center"> - {errors.error}</div> : null}

                    <NavLink to ="/">Forgot password</NavLink>

                    <div className="flex py-4">
                        <div>
                            <input type="checkbox" className="mr-2" />
                            <span>Remember me</span>
                        </div>
                        <button className="bg-sky-700 w-max px-4 py-2 rounded-md my-2 mx-auto hover:bg-sky-500 hover:text-white" >Login</button>
                    </div>

                </form>
            </div> 
        </div>
    )
}

export default LoginForm;
