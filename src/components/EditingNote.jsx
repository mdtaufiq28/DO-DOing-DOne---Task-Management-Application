import React from 'react';
import { useState ,useEffect,useContext} from 'react';
import { themeContext } from './Home';

const EditingNote = (props) => {
  
  const [editingNote,setEditingNote]=useState({title:props.editingNote.title ? props.editingNote.title : '',content:props.editingNote.content ? props.editingNote.content : '',priority:props.editingNote.priority ? props.editingNote.priority : '',dueDate:props.editingNote.dueDate ? props.editingNote.dueDate : '',progress:props.editingNote.progress ? props.editingNote.progress : '',priorityId:props.editingNote.priorityId ? props.editingNote.priorityId : '',timeStamp:props.editingNote.timeStamp ? props.editingNote.timeStamp : ''});
  const [isPriorityWindowOpen,setIsPriorityWindowOpen]=useState(false);
  const [isProgressWindowOpen,setIsProgressWindowOpen]=useState(false);
  const [isDueDateWindowOpen,setIsDueDateWindowOpen]=useState(false);

  const theme=useContext(themeContext);
  const style=theme==='dark' ? {
    backgroundColor:'black',
    color:'white'
  } : {};

  const handleTitle=(event)=>{
    setEditingNote({...editingNote,title:event.target.value});
  }

  const handleContent=(event)=>{ 
    setEditingNote({...editingNote,content:event.target.value});
  }

  const handleCancelButton=()=>{
    setEditingNote({title:props.editingNote.title,content:props.editingNote.content,priority:props.editingNote.priority,dueDate:props.editingNote.dueDate,progress:props.editingNote.progress,priorityId:props.editingNote.priorityId,timeStamp:props.editingNote.timeStamp});
    props.setIsEditing(false);
  }

  const setPriority=(priority)=>{
    let priorityId;
    
    if(priority==='Optional'){
      priorityId=0;
    }

    else if(priority==='Low'){
      priorityId=1;
    }

    else if(priority==='Medium'){
      priorityId=2;
    }
    else if(priority==='High'){
      priorityId=3;
    }
    else if(priority==='Critical'){
      priorityId=4;
    }
    setEditingNote({...editingNote,priority:priority,priorityId:priorityId});
    setIsPriorityWindowOpen(false);
  }

  const setProgress=(progress)=>{
    setEditingNote({...editingNote,progress:progress});
    setIsProgressWindowOpen(false);
  }

  const handleDate=(event)=>{
    setEditingNote({...editingNote,dueDate:event.target.value})
    setIsDueDateWindowOpen(false);

  }
  
  return (
    <>
        {/*<div className='fixed top-8 left-8 right-8 bottom-8 flex flex-col border-2 rounded-2xl shadow-2xl overflow-hidden bg-white '>
            <input placeholder='Title' className='border-b-2 h-20 outline-none px-5 pt-1' value={editingNote.title} onChange={handleTitle} onKeyDown={(event)=>{
              if(event.key==='Enter'){
                handleSave();
              }
            }}>
            </input>
            <textarea placeholder='Write Anything' className='h-full resize-none px-5 pt-8 outline-none' value={editingNote.content} onChange={handleContent} onKeyDown={(event)=>{
              if(event.key==='Enter'){
                handleSave();
              }
            }}></textarea>
            <button onClick={()=>{props.addItem(editingNote,true,props.editingNote.index)}}className='bg-purple-700 w-32 text-white py-3 rounded-full hover:opacity-50 duration-1000 font-semibold m-2'>Save</button>
        </div> : */}


            <div style={style} className='fixed top-8 left-8 right-8 bottom-8 flex flex-col border-2 rounded-2xl shadow-2xl overflow-hidden bg-white'>
                        <input style={style} value={editingNote.title} placeholder='Title' className='border-b-2 h-20 outline-none px-5 pt-1' onChange={handleTitle} onKeyDown={(event)=>{
                          if(event.key==='Enter'){
                          
                          }
                        }}></input>
                        <textarea style={style} value={editingNote.content} placeholder='Write Anything' className='h-full resize-none px-5 pt-8 outline-none' onChange={handleContent} onKeyDown={(event)=>{
                          if(event.key==='Enter'){
              
                          }
                        }}></textarea>

                      <div className='flex gap-x-5 max-md:text-xs border-t-2 items-center w-full justify-between px-3 '>
                        <button onClick={()=>{
                          props.addItem(editingNote,true,props.editingNote.index)
                        }} className='bg-purple-900 px-8 text-white py-2  flex-auto rounded-full hover:opacity-50 duration-1000 font-semibold m-2'>Save</button>
                        
                        <div className='flex gap-x-6 items-center w-full  justify-center max-md:hidden flex-auto'>

                          <div className='relative self-center'>
                            <button onClick={()=>{
                              setIsPriorityWindowOpen(!isPriorityWindowOpen);
                              setIsProgressWindowOpen(false);
                              setIsDueDateWindowOpen(false);
                            }} className=''>{editingNote.priority ? editingNote.priority : 'Set Priority'}</button>

                            {isPriorityWindowOpen ?
                            <ul className='absolute border-2 shadow-md bottom-5 -left-24 px-4 py-4 flex flex-col gap-y-4 items-start bg-white duration-1000'>
                              <li onClick={()=>{
                                setPriority('Critical')
                              }}className='cursor-pointer hover:bg-gray-100 w-full rounded-sm px-4 duration-1000 py-5'>Critical</li>
                              <li onClick={()=>{
                                setPriority('High')
                              }}className='cursor-pointer hover:bg-gray-100 w-full rounded-sm px-4 duration-1000 py-5'>High</li>
                              <li onClick={()=>{
                                setPriority('Medium')
                              }}className='cursor-pointer hover:bg-gray-100 w-full rounded-sm px-4 duration-1000 py-5'>Medium</li>
                              <li onClick={()=>{
                                setPriority('Low')
                              }}className='cursor-pointer hover:bg-gray-100 w-full rounded-sm px-4 duration-1000 py-5'>Low</li>
                              <li onClick={()=>{
                                setPriority('Optional')
                              }}className='cursor-pointer hover:bg-gray-100 w-full rounded-sm px-4 duration-1000 py-5'>Optional</li>
                            </ul> : ''}

                          </div>

                          <div className='relative'>
                            <button onClick={()=>{
                              setIsProgressWindowOpen(!isProgressWindowOpen);
                              setIsPriorityWindowOpen(false);
                              setIsDueDateWindowOpen(false);
                            }} className=''>{editingNote.progress ? editingNote.progress : 'Set Progress'}</button>

                            {isProgressWindowOpen ? 
                            <ul className='absolute border-2 shadow-md bottom-6 -right-6 px-4 py-4 flex flex-col gap-y-4 items-start bg-white duration-1000'>
                              <li onClick={()=>{
                                setProgress('Pending')
                              }} className='cursor-pointer hover:bg-gray-100 w-full rounded-sm px-4 duration-1000 py-5'>Pending</li>
                              <li onClick={()=>{
                                setProgress('In Progress')
                              }} className='cursor-pointer hover:bg-gray-100 w-full rounded-sm px-4 duration-1000 py-5'>In Progress</li>
                              <li onClick={()=>{
                                setProgress('Completed')
                              }} className='cursor-pointer hover:bg-gray-100 w-full rounded-sm px-4 duration-1000 py-5'>Completed</li>
                            </ul> : ''}

                          </div>

                          <div className='self-center relative'>
                            <button onClick={()=>{
                              setIsDueDateWindowOpen(!isDueDateWindowOpen);
                              setIsPriorityWindowOpen(false);
                              setIsProgressWindowOpen(false);
                              console.log(isDueDateWindowOpen);
                            }} className=''>{editingNote.dueDate ? editingNote.dueDate : 'Set Due Date'}</button>

                            {isDueDateWindowOpen ? 
                            <div className='absolute bottom-10  border-2 duration-1000'>
                            <input value={editingNote.dueDate || ''} type="date" className='p-10 ' onChange={(event)=>{
                              handleDate(event);
                            }}></input> 
                            </div>
                            : ''}

                          </div>
                        </div>

                        <button onClick={handleCancelButton} className='bg-slate-300 flex-auto text-black px-8 py-2 text-sm rounded-full hover:opacity-50 duration-1000 font-semibold'>Cancel</button>
                      </div>
                  
                    </div> :

      
    </>

  )
}

export default EditingNote;
