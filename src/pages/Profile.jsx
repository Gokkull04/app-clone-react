import React, { useEffect, useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {db} from '../firebase'
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { FcHome } from "react-icons/fc";
import ListingItem from '../components/ListingItem';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
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

    useEffect(()=> {
      async function fetchUserListings(){
        const listingRef = collection(db, "listings")
        const q = query(listingRef, where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc"));
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setListings(listings);
        setLoading(false);
      }
      fetchUserListings()
    }, [auth.currentUser.uid]);

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
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg pb-3'>
            <p className='flex items-center'>Do you want to change your name?
            <span onClick={()=>{changeDetails && onSubmit();
             setChangeDetails((prevState)=> !prevState)}}
            className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer ml-1'>
              {changeDetails? "Apply changes" : "Edit"}</span></p>

            <p onClick={onLogout}
            className='text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 cursor-pointer'>Sign-out</p>
          </div>
        </form>
        <button type="submit" className='w-full bg-blue-600 px-6 py-3 text-white text-sm hover:bg-blue-700 shadow-md rounded transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-80 uppercase'>
          <Link to="/create-listing" className='flex justify-center items-center'>
          <FcHome className='text-2xl bg-red-200 rounded-full p-1 mr-1 border-2'/>
          Sell or rent your home
          </Link>
        </button>
      </div>
    </section>
    <div className='max-w-6xl mt-6 px-3 mx-auto'>
      {!loading && listings.length > 0 && (
        <>
          <h2 className='text-2xl text-center font-semibold'>My Listings</h2>
          <ul>
            {listings.map((listing)=>(
              <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
            ))}
          </ul>
        </>
      )}
    </div>
    </>
  )
}
