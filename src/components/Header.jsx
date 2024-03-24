import React, { useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

export default function Header() {
  const [pageState, setpageState] = useState("sign in")
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);
  const auth = getAuth()
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setpageState("Profile")
      } else {
        setpageState("Sign in")
      }
    })
  },[auth])
  function pathMatchRoute(route){
    if (route === location.pathname){
      return true;
    }
  }

  return (
    <div>
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto bg-white border-b shadow-sm sticky top-0 z-40'>
        <div>
          <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" 
          alt="logo" 
          className='h-5 cursor-pointer' 
          onClick={()=>navigate("/") }></img>
        </div>
        <div>
          <ul className='flex space-x-10'>
            <li className={`cursor-pointer text-sm py-3 font-semibold text-gray-400 border-b-[3px] border-b-transparent 
            ${pathMatchRoute("/") && "text-zinc-950 border-b-red-400"}`} 
            onClick={()=>
            navigate("/")}>Home</li>
            <li className={`cursor-pointer text-sm py-3 font-semibold text-gray-400 border-b-[3px] border-b-transparent 
            ${pathMatchRoute("/offers") && "text-zinc-950 border-b-red-400"}`} 
            onClick={()=>
            navigate("/offers")} >Offers</li>
            <li className={`cursor-pointer text-sm py-3 font-semibold text-gray-400 border-b-[3px] border-b-transparent 
            ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-zinc-950 border-b-red-400"}`} 
            onClick={()=>
            navigate("/profile")} >{pageState}</li>
            
          </ul>
        </div>
      </header>
    </div>
  )
}

