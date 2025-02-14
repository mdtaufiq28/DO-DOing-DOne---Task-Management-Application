import {React,useContext} from 'react';
import { themeContext } from './Home';

const NavBar = (props) => {

    const theme=useContext(themeContext)
    const style=theme==='dark' ? {
      backgroundColor:'black',
      color:'white'
    } : {};
  return (
    <nav style={style} className='flex bg-white shadow-sm pb-5  justify-between gap-x-5 sticky top-0 left-0 right-0 px-10 pt-5 items-center duration-[1000ms]'>
    {
    !props.isMenuOpen && 
    <button onClick={()=>{
      props.setIsMenuOpen(true);
      console.log(props.isMenuOpen);
    }} className='w-10 hover:bg-gray-200 duration-1000 rounded-full p-2'>
              <img src="/hamburger-menu-icon.svg"></img>
    </button> 
    }

    <input style={style} type='text' placeholder='Search for your DOs' className='w-full border outline-none py-3 px-10 shadow-md rounded-md font-semibold duration-[1000ms]'></input>
    </nav>
    
  )
}

export default NavBar;
