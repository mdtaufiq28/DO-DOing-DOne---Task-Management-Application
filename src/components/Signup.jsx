import React from 'react';
import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from '../firebase';
import {collection,addDoc} from 'firebase/firestore'

const Signup = () => {
  const [emailInput,setEmailInput]=useState('');
  const [passwordInput,setPasswordInput]=useState('');
  const navigate=useNavigate();

  const [userDetails,setUserDetails]=useState({emailAddress:'',password:''})

  const handleEmailInput=(event)=>{
    setEmailInput(event.target.value);
    console.log(emailInput)
  }

  const handleSubmitButton=(event)=>{
    setUserDetails({...userDetails,password:passwordInput})
  }

  const handlePasswordInput=(event)=>{
    setPasswordInput(event.target.value)
  }
  const handleNextButton=()=>{
    setUserDetails({...userDetails,emailAddress:emailInput})

  }

  const registerUser=async ()=>{
    const userCredentials=await createUserWithEmailAndPassword(auth,userDetails.emailAddress,userDetails.password);
    const uid=userCredentials.user.uid;
    console.log(userCredentials);
    const user=await addDoc(collection(db,"users"),{
      uid:uid,
      notes:[],
      themePreference:'light'
    });
    console.log(user);
    navigate('/login')
    
  }


  useEffect(()=>{

    if(!(userDetails.emailAddress==='') && (userDetails.password==='')){
      document.querySelector('.next-button').classList.add('hidden');
      document.querySelector('.submit-button').classList.remove('hidden')
      document.querySelector('.email-input-label').classList.add('hidden');
      document.querySelector('.email-input').classList.add('hidden');
      document.querySelector('.password-input-label').classList.remove('hidden');
      document.querySelector('.password-input').classList.remove('hidden');
      console.log('hi');

    }

    if(userDetails.emailAddress && userDetails.password){
      registerUser();
    }
  })

  return (
    <div className='dark:bg-black dark:text-white h-full flex flex-col font-raleway gap-y-20 justify-center items-center'>
    <h1 className='text-4xl font-medium animate-slide duration-1000'>Get Started By <span className='text-purple-700'>Signing Up</span></h1>
    <form className=''>
        <label className='email-input-label text-xl'>Email Address</label>
        <input type="email" name="" className='email-input ml-4 py-2 rounded-md border-2 border-purple-800 outline-purple-800 pl-5 dark:text-white dark:bg-black max-w-full mt-5  ' onChange={(event)=>{
          handleEmailInput(event)
        }}/>


        <label className='password-input-label text-xl hidden'>Password</label>
        <input type="password" className='password-input hidden ml-4 py-2 rounded-md border-2 border-purple-800 outline-purple-800 pl-5 mt-5  w-96 ' onChange={(event)=>{
          handlePasswordInput(event)
        }}/>

    </form>
    <button className='next-button border-2 border-purple-700 bg-purple-700 text-white rounded-full px-4 py-2 w-28' onClick={handleNextButton}>Next</button>
    <button className='submit-button border-2 hidden border-purple-700 bg-purple-700 text-white rounded-full px-4 py-2 w-28' onClick={handleSubmitButton}>Submit</button>
    </div>
  )
}

export default Signup
