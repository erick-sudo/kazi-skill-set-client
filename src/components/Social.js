import React from "react"
import { ImWhatsapp } from 'react-icons/im'
import { FiPhoneCall } from 'react-icons/fi'
import { BsFacebook, BsTwitter, BsSlack } from 'react-icons/bs'

function Social() {
    return (
        <div className="m-4 max-w-lg rounded-md shadow-lg">
            <h2 className="font-bold p-3 text-center">Reach out</h2>
            <div className="flex flex-row flex-wrap justify-center pb-4">
                <a className="text-3xl px-5 py-2 text-sky-300 hover:animate-pulse hover:text-green-900 hover:scale-125" href="https://whatsapp.com"><ImWhatsapp /></a>
                <a className="text-3xl px-5 py-2 text-sky-300 hover:animate-pulse hover:text-green-900 hover:scale-125" href="tel:+25496584498"><FiPhoneCall /></a>
                <a className="text-3xl px-5 py-2 text-sky-300 hover:animate-pulse hover:text-green-900 hover:scale-125" href="https://www.facebook.com"><BsFacebook /></a>
                <a className="text-3xl px-5 py-2 text-sky-300 hover:animate-pulse hover:text-green-900 hover:scale-125" href="https://www.twitter.com"><BsTwitter /></a>
                <a className="text-3xl px-5 py-2 text-sky-300 hover:animate-pulse hover:text-green-900 hover:scale-125" href="https://www.slack.com"><BsSlack /></a>
            </div>
        </div>
    )
}

export default Social;