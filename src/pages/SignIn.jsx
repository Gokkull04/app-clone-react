import React, { useState } from 'react'
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignIn() {

  const [showPassword, setPassword] = useState(false);
  const [formData, setForm] = useState({
    email: "",
    password: "",
  })

  const {email,password} = formData;

  function onChange(e){
    setForm((prevState)=>({
      ...prevState,
      [e.target.id] : e.target.value
    }))

  }

  return (
    <section>
      <h1 className='text-3xl font-bold text-center mt-6'>Sign In</h1>

    <div className='items-center flex justify-center flex-wrap px-6 py-12 max-w-6xl mx-auto'>

      <div className='md:w-[67%] lg:w-[50%] mb-12 md:md-6'>
        <img className="rounded-2xl w-full" src='https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Key'></img>
      </div>

      <div className='w-full md:w-[60%] lg:w-[40%] lg:ml-20'>
        <form>
        <input 
        type="email" 
        id='email' 
        value={email} 
        onChange={onChange}
        placeholder='Email address'
        className="mb-6 w-full py-2 px-4 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
        ></input>

        <div className='relative mb-6'>
        <input 
        type={showPassword ? "text" : "password"} 
        id='password' 
        value={password} 
        onChange={onChange}
        placeholder='Password'
        className="w-full py-2 px-4 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
        ></input>

        {showPassword ? (
          <AiFillEyeInvisible className='absolute right-3 top-3 cursor-pointer text-xl' 
          onClick={()=>setPassword((prevState)=>!prevState)}/>
        ):(
          <AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer'
          onClick={()=>setPassword((prevState)=>!prevState)}/>
        )}
        </div>

        <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
          <p className='mb-6'>Don't have an account?
          <Link to="/Sign-up" 
          className=' text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'>Register</Link>
          </p>
          <p>
            <Link to="/Forgot-password" 
            className=' text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out'>Forgot Password?</Link>
          </p>
        </div>
        <button className='w-full uppercase bg-blue-600 rounded px-7 py-3 text-sm text-white shadow-md font-medium hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800'
        type='submit'>
          Sign-In
        </button>

        <div className='flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
          <p className='text-center font-semibold mx-4'>
            OR
          </p>
        </div>
        <OAuth></OAuth>
        </form>
        
      </div>

    </div>
    </section>
    
  )
}
