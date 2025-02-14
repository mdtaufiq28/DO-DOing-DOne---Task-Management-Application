import React from 'react'
import NavBar from './NavBar';
import NoteInput from './NoteInput';
import Note from './Note';
import Menu from './Menu';
import { useState,useEffect,useRef,createContext,useContext} from 'react';
import { AuthContext } from './AuthenticationContext';
import EditingNote from './EditingNote'
import DeleteConfirmation from './DeleteConfirmation';
import Filter from './Filter';
import { auth,db} from '../firebase';
import {doc,updateDoc,getDoc} from 'firebase/firestore';

export const themeContext=createContext();

const Home = (props) => {

    const [userDetails,id]=useContext(AuthContext);
    const [currentNotes,setCurrentNotes]=useState([]);
    const [userRef,setUserRef]=useState();
    const [docSnap,setDocSnap]=useState();
    const [isInitialDataSet,setIsInitialDataSet]=useState(false);
    const [isNoteOpen,setIsNoteOpen]=useState(false);
    const [isEditing,setIsEditing]=useState(false);
    const [editingNote,setEditingNote]=useState({title:'',content:'',priority:'',dueDate:'',progress:'',priorityId:'',timeStamp:'',index:null});
    const [isDeleteActionTriggered,setIsDeleteActionTriggered]=useState(false);
    const [deleteNoteTarget,setDeleteNoteTarget]=useState(null);
    const [isFilterWindowOpen,setIsFilterWindowOpen]=useState(false);
    const [isFiltersApplied,setIsFiltersApplied]=useState(false);
    const [filteredNotes,setFilteredNotes]=useState('');
    const [theme,setTheme]=useState();
    const [isMenuOpen,setIsMenuOpen]=useState(false);

    useEffect(()=>{
        if(userDetails && !isInitialDataSet){
            console.log(userDetails);
            setCurrentNotes(userDetails.data.notes);
            setUserRef(userDetails.userRef);
            setDocSnap(userDetails.docSnap);
            setTheme(userDetails.data.themePreference);
            setIsInitialDataSet(true);
        }
    },[userDetails,isInitialDataSet]);
    
    useEffect(()=>{
        if(isNoteOpen || isEditing){
            document.body.style.overflow='hidden';
        }
        else{
            document.body.style.overflow='visible';
        }
        
        if(theme==='dark')
        {
            document.body.style.backgroundColor='black';
            document.body.style.color='white'
            
        }
        else if(theme==='light'){
            document.body.style.backgroundColor='white';
            document.body.style.color='black';
        }

    },[isNoteOpen,isEditing,theme])

    const addItem= async (item,isSavingEditedItem,index)=>{
        let newNotes=currentNotes;
        if(isSavingEditedItem){
            newNotes[index]=item;
            await updateDoc(userRef,{
                notes:newNotes
            });
            setCurrentNotes(newNotes)
            setIsEditing(false);
            setEditingNote({title:'',content:'',index:null})
        }
        else{
            console.log(userRef);
            newNotes.unshift(item);
            await updateDoc(userRef,{
                notes:newNotes
            });
            setCurrentNotes(newNotes);
            setIsNoteOpen(false);
        }
        setIsFiltersApplied(false);
        setFilteredNotes('');

        
    }

    const handleDeletion=async (isDeleteActionConfirmed)=>{
        if(!isDeleteActionConfirmed){
            setIsDeleteActionTriggered(false);
        }
        else{
            let newNotesAfterDeletion=currentNotes.filter((item)=>{
                return item!=deleteNoteTarget;
            });
            await updateDoc(userRef,{
                notes:newNotesAfterDeletion
            });
            setIsFiltersApplied(false);
            setFilteredNotes('');
            setIsDeleteActionTriggered(false);
            setCurrentNotes(newNotesAfterDeletion)
        }
    }

    const triggerEditing=(title,content,priority,dueDate,progress,priorityId,timeStamp,index)=>{
        setEditingNote({title:title,content:content,priority:priority,dueDate:dueDate,progress:progress,priorityId:priorityId,timeStamp:timeStamp,index:index});
        setIsEditing(true);
    }

    ;

    const changeTheme=async ()=>{
        console.log(userDetails);
        const newTheme=theme==='light' ? 'dark' : 'light';
        await updateDoc(userRef,{
            themePreference:newTheme
        });
        console.log(userDetails)
        setTheme(newTheme);
        
    }

    let listItems=isFiltersApplied ? filteredNotes.map((item,index)=>{
        if(filteredNotes.length===0){
            return <p>No Such Notes Found</p>
        }
        else{
        return <Note key={index+21} item={item} triggerEditing={triggerEditing} index={index} deleteNoteTarget={deleteNoteTarget} setDeleteNoteTarget={setDeleteNoteTarget} setIsDeleteActionTriggered={setIsDeleteActionTriggered}></Note>
        }
        }): currentNotes.map((item,index)=>{
        if(currentNotes.length===0){
            return <p>Your Notes will appear here</p>
        }
        else{
            return <Note key={index+21} item={item} triggerEditing={triggerEditing} index={index} deleteNoteTarget={deleteNoteTarget} setDeleteNoteTarget={setDeleteNoteTarget} setIsDeleteActionTriggered={setIsDeleteActionTriggered}></Note>
        }
    })
 
  return (
    <div className='h-full grid grid-cols-[minmax(10rem,20rem),1fr]'>
        <themeContext.Provider value={theme}>
        {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen}></Menu>}
        <div className={`${isMenuOpen ? 'col-span-1' : 'col-span-2'} flex flex-col gap-y-4`}>
            <NavBar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}></NavBar>

            <div className='flex flex-col gap-x-20 w-11/12 mx-auto marker: pb-10'>
                <section className='flex justify-between items-center'>
                    <button onClick={()=>{
                        setIsFilterWindowOpen(!isFilterWindowOpen);
                    }} className='w-11 hover:bg-gray-200 p-2 rounded-full duration-1000'>
                        <img src='filter-icon.svg' className='w-20'></img>
                    </button>

                    <div className='flex items-center gap-x-6'>
                        <button className='w-11 hover:bg-gray-200 p-2 rounded-full duration-1000' onClick={()=>{
                            setIsNoteOpen('true')
                        }}>
                            <img src='add-item-icon.svg' className='w-20'></img>
                        </button>

                        <button onClick={changeTheme} className='w-10 hover:bg-gray-200 duration-1000 rounded-full p-2'>
                            <img className='duration-1000' src={`${theme==='light' ? 'dark-mode-icon.svg'  : 'day-mode-icon.svg'}`}></img>
                        </button>
                    </div>


                </section>


                <section className='grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-y-20 gap-x-24 mt-5'>
                    {listItems.length>0 ? listItems : <p>Your Notes will appear here</p> }
                </section>
            </div>
        </div>

        <NoteInput status={isNoteOpen} setIsNoteOpen={setIsNoteOpen} addItem={addItem}>
        </NoteInput>

        {isFilterWindowOpen && <Filter setIsFiltersApplied={setIsFiltersApplied} setIsFilterWindowOpen={setIsFilterWindowOpen} setFilteredNotes={setFilteredNotes} currentNotes={currentNotes} ></Filter>}
        

        {isEditing && !isDeleteActionTriggered ? <EditingNote setIsEditing={setIsEditing} editingNote={editingNote} addItem={addItem}></EditingNote> : ''}
        {isDeleteActionTriggered? <DeleteConfirmation handleDeletion={handleDeletion} ></DeleteConfirmation> : ''}
        </themeContext.Provider>

    </div>
  )
}

export default Home
