import React from 'react';
import { useContext } from 'react';
import { themeContext } from './Home';

const Note = ({item,triggerEditing,index,deleteNoteTarget,setDeleteNoteTarget,setIsDeleteActionTriggered}) => {


  const theme=useContext(themeContext)
  const style=theme==='dark' ? {
    backgroundColor:'black',
    color:'white'
  } : {};

  return (
    <div className='border-2 flex flex-col items-start rounded-md overflow-hidden px-2  duration-1000   h-72 w-64'>
            <div className='border-b-2 justify-between w-full flex px-1 '>
                <h3 className='py-3'>{item.title}</h3>

                <div className='flex items-center'>
                    <button className='w-12 hover:bg-gray-100 duration-1000 p-4 rounded-full' onClick={()=>{
                        setDeleteNoteTarget(item);
                        console.log(item);
                        console.log(deleteNoteTarget);
                        setIsDeleteActionTriggered(true);
                    }}>
                    <img className='max-w-full' src='/src/assets/icons/delete-icon.svg'></img>
                    </button>

                    <button className='w-11 hover:bg-gray-100 duration-1000 p-4 rounded-full' onClick={()=>{
                        triggerEditing(item.title,item.content,item.priority,item.dueDate,item.progress,item.priorityId,item.timeStamp,index)
                    }}>
                        <img className='max-w-full' src="/src/assets/icons/edit-icon.svg"/>
                    </button>
                </div>
            </div>

            {item.priority || item.progress || item.dueDate ?

            <div className='pt-5 border-b-2 flex gap-x-10 w-full text-sm items-start pb-3'>
            <button className=''>{item.priority}</button>
            <button className=''> {item.progress} </button>
            <button className=''>{item.dueDate}</button>
            </div> : ''
            
            }

            <p onClick={()=>{
            triggerEditing(item.title,item.content,index)
        }} className='w-full h-full py-3 pt-5 overflow-x-hidden overflow-y-hidden text-left leading-7  hover:opacity-45'>{item.content}</p>
        </div>
  )
}

export default Note;
