import React from 'react';
import { useState,useEffect,useContext } from 'react';
import {getAuth,signOut} from 'firebase/auth'
import {useNavigate} from 'react-router-dom';
import { AuthContext } from './AuthenticationContext';
import { themeContext } from './Home';
const Menu = (props) => {
  const auth=getAuth();
  const navigate=useNavigate();
  const [isLoggedOut,setIsLoggedOut]=useState(false);
  const [userDetails,setUserDetails]=useContext(AuthContext);
  const theme=useContext(themeContext)

  useEffect(()=>{
    document.body.style.overflow='hidden';
    if(isLoggedOut){
      setUserDetails(undefined);
      console.log(userDetails
      )
      localStorage.removeItem('userDetails');
      navigate('/');
    }
  });

  const style=theme==='dark' ? {backgroundColor:'black',color:'white'} : {};

  const logOut=()=>{
    signOut(auth).then(()=>{
      setIsLoggedOut(true);
    });

  }

  return (
    <div style={style} className='flex flex-col bg-white items-center border-r duration-[3000ms]'>
      <button onClick={()=>{
        props.setIsMenuOpen(false);
      }} className='w-12 h-12 mr-2 mt-2 self-end  hover:bg-gray-100 rounded-full duration-1000'>
        <img className='m-auto' src="/close-icon.svg"/>
      </button>
      <div className='flex flex-col max-w-full gap-y-5 pb-4'>
        <img src="/profile-icon.svg" className='w-20 hover:opacity-50 duration-1000 cursor-pointer' />
        <p>Username</p>
      </div>

      <div className='pl-5 pt-5 flex flex-col gap-y-5 w-full items-start justify-start border-t border-t-gray-900 '>
        <div>
          <button className='hover:bg-gray-100 dark:hover:text-black duration-1000 p-3 rounded-md'onClick={logOut}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Menu
