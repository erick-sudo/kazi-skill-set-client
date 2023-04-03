import React, { useContext, useEffect, useRef, useState } from "react";
import { MdSend , MdOutlineArrowForwardIos} from 'react-icons/md'
import { TbMessagePlus } from 'react-icons/tb'
import Loading from "./Loading";

import { UserContext } from "./UserContext";

//{ chat ? <Livechat hideLivechat={hideLivechat} user={{id: prof.id, receiver:"Professional", usr: prof}} /> : null}

function Livechat({hideLivechat}) {

    const current_user = useContext(UserContext)

    const user = current_user.user

    const [messages, setMessages] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [chats, setChats] = useState([])

    const msg = useRef()

    useEffect(() => {
        if(user) {
            fetch(`https://kazi-skill-set-server.herokuapp.com/${user.job_title ? "professionals" : "clients" }/${user.id}/chats`,{
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
                }
            })
            .then((response) => {
                if(response.status === 401) {
                    
                } else {
                    response.json().then(msgs => {
                        setMessages(msgs)
                        setCurrentChat(msgs.length > 0 ? 0 : null)
                    })
                }
            })
        }
    }, [])

    function resetChats(chts) {
        setChats(chts)
    }

    return (
        <>
        {!Boolean(user) ? <Loading /> :
        <div onMouseLeave={() => hideLivechat(true)}  className="shadow-md fixed z-30 top-[1em] bottom-[1em] right-2 w-96 bg-white max-w-md rounded-xl overflow-hidden border-2 ring-2 ring-sky-300">
            <div onClick={() => hideLivechat(false)} className="bg-sky-500 rounded-r-3xl text-white p-2 hover:bg-green-600 absolute z-40 text-[2em] top-[50%]"><MdOutlineArrowForwardIos /></div>
            <div className="bg-sky-500 py-2 h-16 text-white absolute top-0 right-0 left-0"><CurrentChat r_id={user.id} usr={messages[currentChat]} resetChats={resetChats} /></div>
            <div className="absolute flex top-16 bottom-12 right-0 left-0">
                <div id="people" className="w-24">
                    <div className="absolute text-[2.5em] p-2 bottom-2 right-3 border rounded-full bg-black cursor-pointer hover:bg-green-700 z-50"><TbMessagePlus className="text-sky-600" /></div>
                    {
                        messages.map((chat, index) => <Chat key={index} idx={index} curr={currentChat} setCurrentChat={setCurrentChat} />)
                    }
                </div>
                <div id="messages" className="relative grow">
                    {
                        chats.map((chat, index) => <Bubble key={index} chat={chat} owner={chat.owner} />)
                    }
                </div>
            </div>
            <div className="flex rounded-b-xl border-t absolute h-12 right-0 left-0 bottom-0">
                <textarea ref={msg} className="outline-none flex-grow px-3 py-2" type="text"></textarea>
                <button onClick={(e) => {
                    fetch(`https://kazi-skill-set-server.herokuapp.com/messages`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
                        },
                        body: JSON.stringify({
                            client_id: sessionStorage.getItem('who')==='client' ? user.id : messages[currentChat].id,
                            professional_id: sessionStorage.getItem('who')==='client' ? messages[currentChat].id : user.id,
                            content: msg.current.value,
                            owner: sessionStorage.getItem('who') === 'client' ? 0 : 1
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        setChats([...chats, data])
                        msg.current.value = ""
                    })
                }} className="border-none text-xl px-4 bg-sky-700 rounded-rt-md hover:text-white hover:bg-green-500" ><MdSend /></button>
            </div>
        </div>
        }
        </>
    )
}

function Bubble({chat, owner, time}) {

    return (
        <div className={`m-2 flex ${owner === 0 ? "justify-start" : "justify-end"}`}>
            {
                owner === 0 ?
                <div className="bg-sky-500 px-3 pb-3 rounded-r-[20px] rounded-bl-[20px]">
                    <p className="m-0 font-bold text-[10px] p-1 text-slate-600 font-mono">{chat.created_at}</p>
                    <p className="m-0">{chat.content}</p>
                </div> :
                <div className="px-3 pb-0 bg-green-500 rounded-l-[20px] rounded-tr-[20px]">
                    <p className="p-2 m-0">{chat.content}</p>
                    {<p className="p-1 m-0 font-bold text-[10px] text-slate-600 font-mono text-right ">{chat.created_at}</p>}
                </div>
            }
        </div>
    )
}

function CurrentChat({r_id, usr, resetChats}) {

    const [l, setL] = useState(0)

    useEffect(() => {
        if(usr) {
            if(sessionStorage.getItem('who') === 'client') {
                fetch(`https://kazi-skill-set-server.herokuapp.com/chats?c=${r_id}&p=${usr.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
                }
            })
            .then(response => response.json())
            .then(data => {
                resetChats(data)
                setL(data.length)
            })
            } else {
                fetch(`https://kazi-skill-set-server.herokuapp.com/chats?c=${usr.id}&p=${r_id}`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
                }
            })
            .then(response => response.json())
            .then(data => {
                resetChats(data)
                setL(data.length)
            })
            }
        }
    }, [usr]) 

    return (
        <div className="flex items-center gap-4 px-4 font-bold">
            <img className="rounded-full h-12 block" src="https://www.pngitem.com/userimgs/364.jpg" alt="Dp" />
            <div className="text-sm">{`${usr ? usr.firstname : ""} ${usr ? usr.lastname : ""}`}</div>
            <div className="text-black">{l} Messages</div>
        </div>
    )
} 

function Chat({image, idx, curr, setCurrentChat}) {

    return (
        <div onClick={() => setCurrentChat(idx)} className={`hover:ring-sky-400 hover:ring-4 ml-3 mt-3 mr-3 border rounded-full ring-2 ${curr === idx ? "ring-sky-600 ring-4" : "ring-green-100"}`}>
            <img className="rounded-full border-none block" src="https://www.pngitem.com/userimgs/364.jpg" alt="Dp" />
        </div>
    )
}

export default Livechat;