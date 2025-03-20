import { Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

import schemaAILogo from '@/assets/schema-ai-white.png'
import { useAuth } from '../context/AuthContext';
import { CgArrowTopRight } from 'react-icons/cg';
import { useState } from 'react';


const GuestLinks = () =>{
  return (
    <div className="flex items-center gap-4 mr-10">
    <Link to={'/login'}>
      <button className="text-sm rounded-md bg-transparent border border-schema-gray text-white transition-all duration-300 hover:border-white hover:bg-opacity-20 hover:bg-white px-2 py-1">
        Login
      </button>
      </Link>
      <Link to={'/signup'}>
      <button className="bg-schema-green text-sm rounded-md px-2 py-1">
        Signup
      </button></Link>
      <Link to={'/chat'}>
        <button className="border-schema-green border-2 text-sm rounded-md px-2 py-1">
          Chat
        </button>
      </Link>
    </div>
  )
}
const ProjectsLink = () =>{
  return (
    <div className="flex items-center gap-4">
    <Link to={'/projects'}>
      <button className="flex gap-2 text-sm rounded-md bg-transparent border border-schema-gray text-white transition-all duration-300 hover:border-white hover:bg-opacity-20 hover:bg-white px-2 py-1">
        My Projects
        <CgArrowTopRight size={18} className="text-gray-400 hover:text-white transition-colors duration-200"/>
      </button>
      </Link>
     
    </div>
  )
}
const Profile = ({user, handleLogout}) =>{
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
    onMouseEnter={() => setIsHovered(true)}
    // onMouseLeave={() => setIsHovered(false)}
  >
    <button className="w-8 h-8 rounded-full bg-schema-blue flex items-center justify-center text-white">
      S
    </button>

     {/* Toolbar (conditionally rendered) */}
     {isHovered && (
    
    <div 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    className='top-16 right-5 absolute bg-transparent border border-schema-gray text-white self-center rounded-md px-2 py-1 text-xs animate-slide-up duration-200'>
      <ul>
        <li className='border-b border-schema-gray p-2 cursor-pointer hover:bg-schema-light-gray hover:rounded-md hover:animate-pulse-slow'>My Profile</li>
        <li onClick={handleLogout} className='border-b border-schema-gray p-2 cursor-pointer hover:bg-schema-light-gray hover:rounded-md hover:animate-pulse-slow'>Logout</li>
        <li className=' p-2'>{user.email}</li>
      </ul>
    </div>
  
)}
  </div>
  )
}


const Socials = () => {
  return (
  <>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
    <Twitter size={20} />
  </a>
  <a href="https://linkedin.com/wilson-owusu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
    <Linkedin size={20} />
  </a>
  <a href="https://github.com/Owusu-Wilson" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
    <Github size={20} />
  </a>
  </>
  )
}
const Navbar = () => {
  const { logout, user } = useAuth();
 

  function  handleLogout() {
    logout();
    console.log('User Logged out successfully')
  }


  return (
    <nav className="h-auto w-full flex justify-between items-center py-4 px-6 top-0">
      <div className="flex items-center">
        <a href="/" className="text-white font-bold text-xl">
          {/* <span className="text-white">schema AI</span> */}
          <img src={schemaAILogo} alt="schema AI" className='w-full h-10 bg-transparent rounded-md object-contain' />
        </a>
      </div>
     
     
    

      <div className="flex items-center space-x-4">
      {user?
      (<div className='flex gap-4 mr-8'>
      <ProjectsLink/>
      <Profile user={user} handleLogout={handleLogout}/>
      </div>)
      :null }
     {!user?<GuestLinks />: null}  
     {/* looks like doesnt make sense. but its intentional to maintain flex properties */}
      <Socials/>
      </div>
    </nav>
  );
};



export default Navbar;
