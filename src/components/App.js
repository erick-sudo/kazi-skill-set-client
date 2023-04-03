import "../App.css"
import React, { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Landing from "./Landing";
import Recents from "./Recents";
import Navbar from "./Navbar";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Tasks } from "./Tasks";
import Home from "./Home";
import { ViewProfessional, ProfessionalProfile } from "./ViewProfessional";
import { BsFillChatTextFill } from "react-icons/bs"
import Livechat from "./Livechat";
import { UserContext } from "./UserContext";

import Footer from "./Footer";

const App = () => {

  const [chat, setChat] = useState(false)

  const user = useContext(UserContext)

  return (
    <div className="App bg-sky-200">
      <Navbar/>
      
      { (chat && user.user) ? <Livechat hideLivechat={setChat} /> : null }
      { chat ? null :  user.user ? <div className="fixed right-4 bottom-2 z-50 text-[3em] text-sky-700 ring bg-sky-300 rounded-full p-3 hover:bg-sky-600 hover:text-white" onClick={() => setChat(true)}><BsFillChatTextFill /></div> : null }
      <div className="routing">
        <Routes>
          <Route path="/" element={<><Landing /><Recents /></>} />
          <Route path="/home" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/prof/:id" element={<ViewProfessional />} />
          <Route path="/viewprofile/me" element={<ProfessionalProfile />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
