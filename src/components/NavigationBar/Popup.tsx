import { useState } from 'react';
import {User} from '../../types'
interface PopupProps {
    user:User, 
    handleLogout: ()=>void
}

const Popup = ({user, handleLogout}:PopupProps) =>{
    const [isHovered, setIsHovered] = useState(false);
    return (
      <div
      onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <button className="w-8 h-8 rounded-full bg-schema-blue flex items-center justify-center text-white">
        {user.email?.slice(0, 1).toUpperCase()}
      </button>
  
       {/* Toolbar (conditionally rendered) */}
       {isHovered && (
      
      <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='top-16 right-5 absolute bg-transparent border border-schema-gray text-black self-center rounded-md px-2 py-1 text-xs animate-slide-up duration-200'>
        <ul>
          <li className='border-b border-schema-gray p-2 cursor-pointer hover:bg-slate-50 hover:rounded-md hover:animate-pulse-slow'>My Profile</li>
          <li onClick={handleLogout} className='border-b border-schema-gray p-2 cursor-pointer hover:bg-slate-50 hover:rounded-md hover:animate-pulse-slow'>Logout</li>
          <li className=' p-2'>{user.email}</li>
        </ul>
      </div>
    
  )}
    </div>
    )
  }

export default Popup;
  