import { Twitter, Linkedin, Github } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-6 opacity-0 animate-fade-in">
      <div className="flex items-center">
        <a href="/" className="text-white font-bold text-xl">
          <span className="text-white">schema AI</span>
        </a>
      </div>
      <div className="flex items-center space-x-4">
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
