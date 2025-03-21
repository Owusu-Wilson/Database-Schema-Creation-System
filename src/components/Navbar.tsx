
import { useLocation } from 'react-router-dom';

import schemaAILogo from '@/assets/schema-ai-white.png'
import { useAuth } from '../context/AuthContext';

import GuestLinks from './NavigationBar/GuestLinks';
import ProjectsLink from './NavigationBar/ProjectsLink';
import Popup from './NavigationBar/Popup';
import Socials from './NavigationBar/Socials';



const Navbar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
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
        {!isActive('/projects') ?<ProjectsLink/>: null}
      
      <Popup user={user} handleLogout={handleLogout}/>
      </div>)
      :null }

     {!user?<GuestLinks />: null}  
     
      <Socials/>
      
      </div>
    </nav>
  );
};



export default Navbar;
