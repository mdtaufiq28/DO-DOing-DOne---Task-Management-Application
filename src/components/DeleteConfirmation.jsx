import React from 'react';
import { useContext } from 'react';
import { themeContext } from './Home';

const DeleteConfirmation = (props) => {
  const theme=useContext(themeContext);
  const style=theme==='dark' ? {
    backgroundColor:'black',
    color:'white'
  } : {};
  
  return (
    <div style={style} className='fixed flex justify-center z-10 top-40 left-0 right-40 bg-white p-40 border-green-400 shadow-2xl rounded-lg  w-full'>
        <div className='w-full min-w-fit flex flex-col gap-y-14  justify-items-center'>
            <p className='max-w-full'>Are You Sure You Want To Delete the Note?</p>
            
            <div className='flex justify-center'>
              <button  className='rounded-md bg-black text-white p-2 hover:opacity-50 duration-1000' onClick={()=>{
                  props.handleDeletion(true);
              }}>Yes</button>
              <button  onClick={()=>{
                  props.handleDeletion(false)
              }} className='rounded-md bg-black text-white p-2 hover:opacity-50 duration-1000'>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteConfirmation
