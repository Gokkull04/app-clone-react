import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { useNavigate } from 'react-router';

export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick(){
    
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user
      
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      

      if(!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(), 
        })};
        navigate("/")
    } catch (error) {
      toast.error("Could not authorise account !!!");
      console.log(error);
    }
  }

  return (
    <button onClick={onGoogleClick}
      type='button'
      className='flex items-center justify-center w-full bg-red-600 hover:bg-red-700 px-7 py-3 rounded text-white font-medium text-sm uppercase active:bg-red-800 hover:shadow-lg transition duration-200 ease-in-out'>
      <FcGoogle className='mr-2 rounded-full bg-white text-2xl'/> Continue with Google
    </button>
  )
}
