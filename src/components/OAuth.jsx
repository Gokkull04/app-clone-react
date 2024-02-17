import React from 'react'
import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
  return (
    <button className='flex items-center justify-center w-full bg-red-600 hover:bg-red-700 px-7 py-3 rounded text-white font-medium text-sm uppercase active:bg-red-800 hover:shadow-lg transition duration-200 ease-in-out'><FcGoogle className='mr-2 rounded-full bg-white text-2xl'/> Continue with Google</button>
  )
}
