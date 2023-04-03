import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = React.createContext()

function UserProvider({children}) {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [who, setWho] = useState(null)

    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if(sessionStorage.getItem('jwt')) {
            if(sessionStorage.getItem('who') === 'professional') {
                tryProfAuth()
            } else {
                tryClientAuth()
            }
        }

    },[])

    function takeTask(task_id, prof_id ) {
        fetch("https://kazi-skill-set-server.herokuapp.com/pending_tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                task_id: task_id,
                professional_id: prof_id
            })
        }).then(respose => {
            if(respose.status < 400) {
                respose.json().then(data => {
                    navigate("/viewprofile/me")
                })
            }
        })
    }

    function signContract(professional_id, client_id, task_id, pending_task_id, igniteReload) {
        fetch(`https://kazi-skill-set-server.herokuapp.com/jobs`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                task_id: task_id,
                professional_id: professional_id,
                client_id: client_id
            })
        }).then(response => {
            if(response.status < 400 ) {
                MySwal.fire({
                    title: <p className='font-bold p-0 m-0 text-green-900'>Job Contract Signed</p>,
                    icon: "success",
                    iconColor: "green",
                    background: "#87CEEB"
                })
                response.json().then(re => {
                    igniteReload(re)
                    declineTask(pending_task_id, 1)
                })
            }
        })
    }

    function declineTask(pending_task_id, res) {
        fetch(`https://kazi-skill-set-server.herokuapp.com/pending_tasks/${pending_task_id}`,{
            method: 'DELETE'
        })
        .then(response => {
            if(response.status < 400) {
                if(res !== 1) {
                    MySwal.fire({
                        title: <p className='font-bold p-0 m-0 text-red-600'>Task Declined</p>,
                        icon: "success",
                        iconColor: "red"
                    })
                }

                navigate("/viewprofile/me")
            }
        })
    }

    function tryProfAuth() {
        fetch("https://kazi-skill-set-server.herokuapp.com/me_prof", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            }
        })
        .then(response => {
            if(response.status === 401) {

            } else {
                response.json().then(data => {
                    setUser(data)
                    setWho('professional')
                })
            }
        })
    }

    function tryClientAuth() {
        fetch("https://kazi-skill-set-server.herokuapp.com/me_c", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            }
        })
        .then(response => {
            if(response.status === 401) {
                
            } else {
                response.json().then(data => {
                setUser(data)
                    setWho('client')
                })
            }
        })
    }

    function logOut() {
        setUser(null)
        setWho(null)
        sessionStorage.removeItem('jwt')
        sessionStorage.removeItem('who')
        navigate("/login")
    }

    function handleLogin(setErrors, e) {
        e.preventDefault()

        fetch(`https://kazi-skill-set-server.herokuapp.com/${e.target.profacc.checked ? "login_p" : "login"}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value
        })
       })
       .then(response => {
        if(response.status === 404) {
            response.json().then(errors => {
                setErrors(errors)
            })
        } else if (response.status < 400 ) {
            response.json().then(data => {
                MySwal.fire({
                    title: <p className='font-bold p-0 m-0 text-green-900'>Login successful</p>,
                    icon: "success",
                    iconColor: "green",
                    background: "#87CEEB"
                })

                sessionStorage.setItem("jwt", data.jwt)
                setUser(data.user)
                setWho(e.target.profacc.checked ? 'professional' : 'client')
                sessionStorage.setItem("who", e.target.profacc.checked ? 'professional' : 'client')

                navigate("/")

                e.target.reset()
            })
        }
       })
    }

    function handleProfUpdate(setUpdatedProf, data) {
        fetch(`https://kazi-skill-set-server.herokuapp.com/professionals/${data.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+sessionStorage.getItem("jwt")
            },
            body: JSON.stringify({
                job_title: data.job_title,
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                description: data.description,
                email: data.email,
                phone: data.phone,
                portfoliourl: data.portfoliourl,
                location: data.location
            })
        })
        .then(response =>{
            if(response.status < 400) {
                response.json().then(prof => {
                    setUpdatedProf(prof)
                    setUser(prof)
                    MySwal.fire({
                        title: <p className='font-bold p-0 m-0 text-green-900'>Profile Succesfully Updated</p>,
                        icon: "success",
                        iconColor: "green",
                        background: "#87CEEB"
                    })
                })
            } else {
                MySwal.fire({
                    title: <p className='font-bold p-0 m-0 text-red-600'>Error Updating Details</p>,
                    icon: "error",
                    iconColor: "red"
                })
            }
        })
    }

    function handleSignup(setErrors, e) {

       const formData = e.target.profacc.checked ? {
        "username": e.target.username.value,
        "firstname": e.target.firstname.value,
        "lastname": e.target.lastname.value,
        "description": e.target.description.value,
        "email": e.target.email.value,
        "phone": e.target.phone.value,
        "poster": e.target.poster.value,
        "category_id": e.target.category_id.value,
        "portfoliourl": e.target.portfoliourl.value,
        "location": e.target.location.value,
        "password": e.target.password.value,
        "password_confirmation": e.target.password_confirmation.value
       } :
       {
        "username": e.target.username.value,
        "firstname": e.target.firstname.value,
        "lastname": e.target.lastname.value,
        "email": e.target.email.value,
        "phone": e.target.phone.value,
        "poster": e.target.poster.value,
        "password": e.target.password.value,
        "password_confirmation": e.target.password_confirmation.value
       }

       fetch(`https://kazi-skill-set-server.herokuapp.com/${e.target.profacc.checked ? "signup_p" : "signup"}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
       })
       .then(response => {
        if(response.status === 422) {
            response.json().then(errors => {
                
                setErrors(errors.errors)
            })
        } else {
            response.json().then(data => {
                MySwal.fire({
                    title: <p className='font-bold p-0 m-0 text-green-900'>Registration successful</p>,
                    icon: "success",
                    iconColor: "green",
                    background: "#87CEEB"
                })

                
                sessionStorage.setItem("jwt",data.jwt)
                setUser(data.user)
                setWho(e.target.profacc.checked ? 'professional' : 'client')
                sessionStorage.setItem("who", e.target.profacc.checked ? 'professional' : 'client')
                navigate("/")
                e.target.reset()
            })
        }
       })
    }

    return (
        <UserContext.Provider value={{user: user, setWho: setWho, who: who, setUser: setUser, logOut: logOut, handleLogin: handleLogin, handleSignup: handleSignup, handleProfUpdate: handleProfUpdate, takeTask: takeTask, signContract: signContract, declineTask: declineTask }} >
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }