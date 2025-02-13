import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const IntroPage = () => {
  useEffect(()=>{
    console.log('hi');
  })
  return (
    <div className='flex flex-col items-center justify-center gap-y-14 font-raleway dark:bg-black h-full dark:text-white '>
    <div className='flex items-center gap-x-4'>
      <img className="stroke-purple-950 fill-purple-950" src="/src/assets/icons/logo.svg" alt="" />
      <h1 className='text-5xl text-purple-950 font-bold'>DO - DOing - DOne</h1>
    </div>
    <h1 className='font-raleway font-medium text-4xl px-4 max-lg:text-3xl'>
        Master Your Day,One Task at a Time - Because Your Goals Deserve More than a Checklist
    </h1>

    <div className='flex gap-x-4'>
        <Link to='/signup'><button className='bg-purple-700  text-white font-medium rounded-full px-4 py-2 hover:opacity-65 duration-1000'>Sign Up</button></Link>
        <Link to='/login'><button className='text-white bg-black rounded-full px-4 py-2 hover:opacity-65 dark:hover:bg-white dark:hover:text-black dark:hover:opacity-100 duration-1000'>Login</button></Link>
    </div>
    </div>
  )
}

export default IntroPage
