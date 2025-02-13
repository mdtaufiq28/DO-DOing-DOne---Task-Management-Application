import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { themeContext } from './Home';

const Filter = (props) => {

    const [sortByOption,setSortByOption]=useState('');
    const [filterBasedOnProgressOption,setFilterBasedOnProgressOption]=useState('');
    const [filterBasedOnDueDate,setFilterBasedOnDueDate]=useState('');
    const [filters,setFilters]=useState([sortByOption,filterBasedOnProgressOption,filterBasedOnDueDate]);

    const theme=useContext(themeContext);
    const style=theme==='dark' ? {
      backgroundColor:'black',
      color:'white',
      border:'solid 1px purple'
    } : {};
    

    useEffect(()=>{
        console.log(filters);
        document.body.style.overflow='hidden';
    },[])

    const filterNotes=()=>{
        let currentNotes=props.currentNotes;
        let filteredNotes=currentNotes;
        if(filterBasedOnDueDate){
            filteredNotes=filteringBasedOnDueDate(filteredNotes);
        }
        if(sortByOption){
            filteredNotes=sorting(filteredNotes);
        }
        if(filterBasedOnProgressOption){
            filteredNotes=filteringBasedOnProgress(filteredNotes);
        }
       
        return filteredNotes;
    }

    const sorting=(filteredNotes)=>{
        if(sortByOption==='Priority (Optional to Critical)'){
            filteredNotes=filteredNotes.sort((x,y)=>x.priorityId-y.priorityId);
            console.log(filteredNotes);
        }
        else if(sortByOption==='Priority (Critical to Optional)'){
            filteredNotes=filteredNotes.sort((x,y)=>y.priorityId-x.priorityId);
        }
        else if(sortByOption==='Newest First'){
            filteredNotes=filteredNotes.sort((x,y)=>y.timeStamp-x.timeStamp);
        }
        else if(sortByOption==='Oldest First'){
            filteredNotes=filteredNotes.sort((x,y)=>x.timeStamp-y.timeStamp);
            console.log(filteredNotes)
        }
        return filteredNotes;
    }

    const filteringBasedOnProgress=(filteredNotes)=>{
        if(filterBasedOnProgressOption==='Pending'){
            filteredNotes=filteredNotes.filter((notes)=>{
                return notes.progress==='Pending';
            })
        }
        else if(filterBasedOnProgressOption==='In-Progress'){
            filteredNotes=filteredNotes.filter((notes)=>{
                return notes.progress==='In-Progress';
            })
        }
        else if(filterBasedOnProgressOption==='Completed'){
            filteredNotes=filteredNotes.filter((notes)=>{
                return notes.progress==='Completed'
            });
        }

        return filteredNotes;
    }

    const filteringBasedOnDueDate=(filteredNotes)=>{
        filteredNotes=filteredNotes.filter((notes)=>{
            return notes.dueDate===filterBasedOnDueDate;
        })
        return filteredNotes;
    }

    const handleFilterBasedOnDueDate=(event)=>{
        setFilterBasedOnDueDate(event.target.value);
    }

    const handleClearAllFilters=()=>{
        setSortByOption('');
        setFilterBasedOnProgressOption('');
        setFilterBasedOnDueDate('');
    }

    const handleApply=()=>{
        let filteredNotes=filterNotes();
        console.log(filteredNotes);
        props.setFilteredNotes(filteredNotes)
        props.setIsFiltersApplied(true);
        props.setIsFilterWindowOpen(false);
        console.log(sortByOption);
    }
    

    


  return (
    <div style={style} className='fixed flex flex-col p-5 gap-y-5 h-fit w-auto top-32 bottom-24 left-32 right-32 bg-white shadow-lg rounded-md gap-x-20 max-lg:top-10 max-lg:bottom-20 max-lg:left-10 max-lg:right-10'>

        <div className='grid grid-cols-4 gap-y-5 gap-x-5 max-w-full w-full max-lg:grid-cols-1'>
            <div className='justify-self-start col-span-4 max-lg:col-span-1'> 
                Sort By
            </div>

            <button style={style} onClick={()=>{
                setSortByOption('Priority (Optional to Critical)')
            }} className={`px-4 py-2 rounded-md ${theme==='dark' && sortByOption==='Priority (Optional to Critical)' ? 'bg-purple-950 text-white' : ''} ${sortByOption==='Priority (Optional to Critical)' ? 'bg-black text-white' : 'bg-slate-100' }`}>Priority (Optional to Critical) </button>
            <button style={style} onClick={()=>{
                setSortByOption('Priority (Critical to Optional)')
            }} className={`px-4 py-2 rounded-md ${theme==='dark' && sortByOption==='Priority (Critical to Optional)' ? 'bg-purple-950 text-white' : ''} ${sortByOption==='Priority (Critical to Optional)' ? 'bg-black text-white' : 'bg-slate-100'}`}>Priority (Critical to Optional)</button>
            <button style={style} onClick={()=>{
                setSortByOption('Newest First')
            }} className={`px-4 py-2 rounded-md ${theme==='dark' && sortByOption==='Newest First' ? 'bg-purple-950 text-white' : ''} ${sortByOption==='Newest First' ? 'bg-black text-white' : 'bg-slate-100'}`}>Newest First</button>
            <button style={style} onClick={()=>{
                setSortByOption('Oldest First')
            }} className={`px-4 py-2 rounded-md ${theme==='dark' && sortByOption==='Oldest First' ? 'bg-purple-950 text-white' : ''} ${sortByOption==='Oldest First' ? 'bg-black text-white' : 'bg-slate-100'}`}>Oldest First</button>

        </div>


        <div className='grid grid-cols-3 gap-y-5 gap-x-5 max-lg:grid-cols-2'>
            <div className='justify-self-start col-span-full max-lg:col-span-2'>
                Filter Based on Progress
            </div>

            <button style={style} onClick={()=>{
                setFilterBasedOnProgressOption('Pending')
            }} className={`px-2 py-2 rounded-md ${filterBasedOnProgressOption==='Pending' ? 'bg-black text-white' : 'bg-slate-100'}`}>Pending</button>
            <button style={style} onClick={()=>{
                setFilterBasedOnProgressOption('In-Progress')
            }} className={`px-2 py-2 rounded-md ${filterBasedOnProgressOption==='In-Progress' ? 'bg-black text-white' : 'bg-slate-100'}`}>In-Progress</button>
            <button style={style} onClick={()=>{
                setFilterBasedOnProgressOption('Completed')
            }} className={`px-2 py-2 rounded-md ${filterBasedOnProgressOption==='Completed' ? 'bg-black text-white' : 'bg-slate-100'}`}>Completed</button>
        </div>

        <div className='grid grid-cols-1 gap-y-5'>
            <div className='justify-self-start'>
                Filter Based on Due Date
            </div>

            
            <input style={style} type='date' value={filterBasedOnDueDate} className='bg-slate-100 px-4 py-2 rounded-md' onChange={(event)=>{
                handleFilterBasedOnDueDate(event);
            }}></input>
        </div>



        <div className='grid grid-cols-2 gap-x-2 justify-between w-full self-end'>
            <button style={style} onClick={handleClearAllFilters} className='text-white bg-black px-4 py-2 rounded-md self-end'>Clear All</button>
            <button style={style} onClick={handleApply} className='text-white bg-black px-4 py-2 rounded-md self-end'>Apply</button>
        </div>

    </div>
  )
}


export default Filter
