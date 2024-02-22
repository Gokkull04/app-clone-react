import React, { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {db} from '../firebase'
import { doc, updateDoc } from 'firebase/firestore';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const {name, email} = formData;

  function onLogout(){
    auth.signOut()
    navigate('/')
  }

  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id] : e.target.value
    }))}

    async function onSubmit(){
      try {
        if (auth.currentUser.displayName !== name){
          //Update display name in firebase
          await updateProfile(auth.currentUser, {
            displayName: name
          })}
          //Update name in firestore
          const docRef = doc(db, "users", auth.currentUser.uid)
          await updateDoc(docRef, {
            name
          })
          toast.success('Profile updated successfully')
      } catch (error) {
        toast.error("Could not complete the request")
      }
    }
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
          disabled={!changeDetails}
          onChange={onChange}
          className={`w-full px-4 py-2 text-xl text-gray-700 border border-gray-300 rounded transition ease-in-out mb-6 ${changeDetails && "bg-red-200 focus:bg-red-200"}`}></input>

          {/* email input */}
          <input type='text' 
          id='email' 
          value={email}
          disabled
          className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-300 rounded transition ease-in-out mb-6'></input>
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
            <p className='flex items-center'>Do you want to change your name?
            <span onClick={()=>{changeDetails && onSubmit();
             setChangeDetails((prevState)=> !prevState)}}
            className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer ml-1'>
              {changeDetails? "Apply changes" : "Edit"}</span></p>

            <p onClick={onLogout}
            className='text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 cursor-pointer'>Sign-out</p>
          </div>
        </form>
      </div>
    </section>
    </>
  )
}
