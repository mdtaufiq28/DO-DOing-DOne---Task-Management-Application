import React, { useEffect } from 'react'
import { useState,createContext } from 'react'
export const AuthContext=createContext();
import {doc,getDoc,updateDoc} from 'firebase/firestore';
import { auth,db} from '../firebase';
import {collection,query,where,getDocs} from 'firebase/firestore';

const AuthenticationContext = (props) => {


  /*const [userDetails,setUserDetails]=useState(()=>{
    const savedUserDetails=localStorage.getItem('userDetails');
    console.log(JSON.parse(savedUserDetails));
    return savedUserDetails ? JSON.parse(savedUserDetails) : null
  });

  useEffect(()=>{
    if(userDetails!=null)
    {
      localStorage.setItem('userDetails',JSON.stringify(userDetails))
      console.log(JSON.parse((localStorage.getItem('userDetails'))));
    }
  },[userDetails]);*/

  const [id,setId]=useState(()=>{
    const savedId=localStorage.getItem('id');
    return savedId ? savedId : '';
  });

  const [userDetails,setUserDetails]=useState('');

  useEffect(()=>{
    if(id){
      localStorage.setItem('id',id);
    }
  },[id])

  useEffect(()=>{
    if(id){
      initalizeUserDetails(id);
    }
  })

  useEffect(()=>{
    console.log('hi');
  });

  const initalizeUserDetails=async(id)=>{
    const [docSnap,userRef]=await getDocSnapAndUserRefFromUid(id);
    const data=docSnap.data();
    const userDetailsObj={
      data:data,
      docSnap:docSnap,
      userRef:userRef
    };
    setUserDetails(userDetailsObj);
  }

  const getDocSnapAndUserRefFromUid=async (id)=>{
    const usersRef=collection(db,'users');
    const q=query(usersRef,where('uid','==',id));
    const querySnapshot=await getDocs(q);
    const docSnap=querySnapshot.docs[0];
    const docId=docSnap.id;
    const userRef=doc(db,"users",docId);
    return [docSnap,userRef];
  }
  
  return (
    <AuthContext.Provider value={[userDetails,setId]}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthenticationContext;
