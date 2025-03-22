
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import GuestLinks from './NavigationBar/GuestLinks';
import Popup from './NavigationBar/Popup';

import { TbListSearch } from 'react-icons/tb';
import { PiShootingStarFill } from 'react-icons/pi';
import { CgPlayListRemove } from 'react-icons/cg';




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
      <div className="flex flex-row items-center">
        <Link to={'/'} className="flex flex-row items-center gap-2 text-black font-semibold text-lg">
        <PiShootingStarFill  size={24} />
          <span className="text-black">KeyMap</span>
        </Link>
      </div>
     
     
    

      <div className="flex items-center space-x-4">
      {user?
      (<div className='flex items-center gap-4 mr-8'>
        
        
        {isActive('/projects')?
        (<><CgPlayListRemove size={24} className='text-gray-500' /></>)
        :
        (<Link to={'/projects'}><TbListSearch size={24} className='text-gray-500' /></Link>)
        }
        
      
      <Popup user={user} handleLogout={handleLogout}/>
      </div>)
      :null }

     {!user?<GuestLinks />: null}  
     
      {/* <Socials/> */}
      
      </div>
    </nav>
  );
};



export default Navbar;
