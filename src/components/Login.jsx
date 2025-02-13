import React, { Children } from 'react';
import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth,db} from '../firebase';
import {collection,query,where,getDocs} from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from './AuthenticationContext';
import {doc,getDoc,updateDoc} from 'firebase/firestore';


const Login = (props) => {
  const [emailInput,setEmailInput]=useState('');
  const [passwordInput,setPasswordInput]=useState('');
  const navigate=useNavigate();
  const [userLoginDetails,setUserLoginDetails]=useState();
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const [userDetails,setId]=useContext(AuthContext);


  useEffect(()=>{
    if(isLoading){
      document.body.style.opacity='0.5';
      window.addEventListener('click',(event)=>{
        event.preventDefault();
      });
      console.log('loading');
    }
  },[isLoading]);

  useEffect(()=>{
    if(userLoginDetails){
      setIsLoading(true);
      authenicateUser();
    }
  },[userLoginDetails]);

  useEffect(()=>{
    if(isLoggedIn){
      setTimeout(()=>{
        setIsLoading(false);
        document.body.style.opacity='1';
        window.removeEventListener('click',(event)=>{
          event.preventDefault();
        })
        navigate('/home');
      },3000)

    }
  },[isLoggedIn])


  const handleEmailInput=(event)=>{
    setEmailInput(event.target.value);
    console.log(emailInput)
  }

  const handleSubmitButton=(event)=>{
    event.preventDefault();
    const userLoginDetailsObj={emailAddress:emailInput,password:passwordInput};
    setUserLoginDetails(userLoginDetailsObj);
  }

  const handlePasswordInput=(event)=>{
    setPasswordInput(event.target.value)
  }


  const authenicateUser=async ()=>{
    console.log(userLoginDetails)
    const emailAddress=userLoginDetails.emailAddress;
    const password=userLoginDetails.password;
    const userCredentials=await signInWithEmailAndPassword(auth,emailAddress,password);
    const uid=userCredentials.user.uid;
    setId(uid);
    setIsLoggedIn(true);
    

    /*
    let [docSnap,userRef]=await getDocSnapAndUserRefFromUid(uid);
    const data=docSnap.data();
    console.log(data);
    const userDetailsObj={
        docSnap:docSnap,
        userRef:userRef,
        data:data,
    }
    console.log(userDetailsObj);
    setUserDetails(userDetailsObj);
    setIsUserDetailsSet(true);
    setEmailInput('');
    setPasswordInput('');
    */

    /*const users=await getDocs(collection(db,"users",));
    const docId=matchingUser.id;
    console.log(docId);
    console.log(matchingUser);*/
    
  }

  return (
    <div className='dark:bg-black flex items-center h-full w-full my-auto justify-around gap-y-10 max-lg:flex-col max-md:items-start'>
    <div className='flex flex-wrap self-center lg:border-2 border-dotted p-10 rounded-full flex-col relative gap-y-5'>
      <q className='text-4xl text-purple-950 dark:text-white font-bold text-left leading-relaxed'>
        The Secret of Getting Ahead is <span className='text-5xl'>Getting Started</span>
      </q>
      <span className=' text-purple-950 self-end p-4 dark:text-white'>-Mark Twain</span>
    </div>
    <form className='max-w-full max-lg:w-full flex flex-col gap-y-16 py-32 px-10  rounded-lg bg-gray-900 ring-2 ring-offset-4 border-2 ring-purple-950'>
            <input placeholder="Enter your Email Address" type="email" name="" className='email-input dark:text-black py-3 rounded-full border-2 border-dotted text-sm border-purple-800  px-5 outline-none' onChange={(event)=>{
            handleEmailInput(event)
            }}/>
            <input placeholder="Enter Your Password" type="password" className='password-input dark:text-black py-3 rounded-full border-2 border-dotted text-sm border-purple-800 px-5 outline-none' onChange={(event)=>{
            handlePasswordInput(event)
            }}/>
            <button className='border-2 min-w-10  border-purple-700 bg-purple-950 text-white rounded-full px-4 py-2 hover:opacity-50 duration-1000' onClick={handleSubmitButton}>Login</button>
    </form>
    </div>
  
    
  )
}

export default Login;
