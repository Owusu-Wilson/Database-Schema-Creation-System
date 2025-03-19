
import { Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full flex justify-between items-center py-4 px-6 mt-auto border-t border-schema-gray">
      <div>
        <button className="w-8 h-8 rounded-full bg-schema-blue flex items-center justify-center text-white">
          S
        </button>
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-400">
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse-slow"></span>
          <span>We're hiring</span>
        </div>
        <span className="text-gray-600">•</span>
        <a href="#" className="hover:text-white transition-colors">Help Center</a>
        <span className="text-gray-600">•</span>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <span className="text-gray-600">•</span>
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <span className="text-gray-600">•</span>
        <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">
          <Zap size={14} />
          <span>StackBlitz</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
