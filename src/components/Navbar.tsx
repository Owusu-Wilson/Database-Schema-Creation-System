import { Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="h-auto w-full flex justify-between items-center py-4 px-6 top-0">
      <div className="flex items-center">
        <a href="/" className="text-white font-bold text-xl">
          <span className="text-white">schema AI</span>
        </a>
      </div>
     
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-4 mr-10">
          <button className="text-sm rounded-md bg-transparent border border-schema-gray text-white transition-all duration-300 hover:border-white hover:bg-opacity-20 hover:bg-white px-2 py-1">
            Login
          </button>
          <button className="bg-schema-green text-sm rounded-md px-2 py-1">
            Signup
          </button>
          <Link to={'/chat'}>
            <button className="border-schema-green border-2 text-sm rounded-md px-2 py-1">
              Chat
            </button>
          </Link>
        </div>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
          <Twitter size={20} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
          <Linkedin size={20} />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
          <Github size={20} />
        </a>
      </div>
    </nav>
  );
};



export default Navbar;
