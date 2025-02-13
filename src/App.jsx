import React from 'react';
import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
const LazyIntroPage=React.lazy(()=>{
  return import('./components/IntroPage')
});
const LazySignup=React.lazy(()=>{
  return import('./components/Signup');
})
const LazyLogin=React.lazy(()=>{
  return import('./components/Login');
});
const LazyHome=React.lazy(()=>{
  return import('./components/Home');
})

const LazyAuthenticationContext=React.lazy(()=>{
  return import('./components/AuthenticationContext');
})
import Login from './components/Login';
import GettingStarted from './components/GettingStarted'
import Home from './components/Home';
import {Routes,Route} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AuthenticationContext from './components/AuthenticationContext';

function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Suspense fallback='loading'><LazyIntroPage/></Suspense>}></Route>
      <Route path='signup' element={<Suspense fallback='loading'><LazySignup/></Suspense>}></Route>
      <Route path='Getting-Started' element={GettingStarted}/>
      <Route path='login' element={<Suspense><LazyAuthenticationContext><Login></Login></LazyAuthenticationContext></Suspense>}/>
      <Route path='home' element={
        <Suspense><LazyAuthenticationContext><Home></Home></LazyAuthenticationContext></Suspense>
      }/>
    </Routes>
  )
}

export default App
