
import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);
  function pathMathRoute(route){
    if (route === location.pathname){
      return true;
    }
  }

  return (
    <div>
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto bg-white border-b shadow-sm sticky top-0 z-50'>
        <div>
          <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo" className='h-5 cursor-pointer' onClick={()=>navigate("/") }></img>
        </div>
        <div>
          <ul className='flex space-x-10'>
            <li className={`cursor-pointer text-sm py-3 font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/") && "text-zinc-950 border-b-red-400"}`} onClick={()=>navigate("/")}>Home</li>
            <li className={`cursor-pointer text-sm py-3 font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-zinc-950 border-b-red-400"}`} onClick={()=>navigate("/offers")} >Offers</li>
            <li className={`cursor-pointer text-sm py-3 font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/sign-in") && "text-zinc-950 border-b-red-400"}`} onClick={()=>navigate("/sign-in")} >Sign In</li>
            
          </ul>
        </div>
      </header>
    </div>
  )
}

