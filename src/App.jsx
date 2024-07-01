import './App.css'
import { Route,Routes } from 'react-router-dom'
import {Home} from "./pages/Home"
import { useState } from 'react';
import {Login} from "./pages/Login"
import {Signup} from "./pages/Signup"
import { Navbar } from './components/common/Navbar';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/signup' element={<Signup setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </div>
  )
}

export default App
