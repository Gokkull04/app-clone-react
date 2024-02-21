import React, { useState } from 'react'
import { getAuth } from 'firebase/auth';

export default function Profile() {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const {name, email} = formData;
  return (
    <>
    <section className='max-w-6xl mx-auto flex justify-center flex-col items-center'>
      <h1 className='text-3xl text-center font-bold mt-6'>Profile</h1>
      <div className='w-full md:w-[50%] mt-6 px-3'>
        <form>
          {/* name input */}
          <input type='text' 
          id='name' 
          value={name}
          disabled
          className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-300 rounded transition ease-in-out mb-6'></input>

          {/* name input */}
          <input type='text' 
          id='email' 
          value={email}
          disabled
          className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-300 rounded transition ease-in-out mb-6'></input>
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
            <p className='flex items-center'>Do you want to change your name?
            <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer ml-1'>Edit</span></p>
            <p className='text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 cursor-pointer'>Sign-out</p>
          </div>
        </form>
      </div>
    </section>
    </>
  )
}
