

import { Link, PaperclipIcon, SendIcon } from 'lucide-react';

const TextInput = () => {
  return (
    <div className="glass-panel w-full max-w-xl mx-auto mb-12 opacity-0 animate-fade-in animate-delay-300">
      <div className="flex p-4 relative">
        <textarea 
          autoSave='true'
          //remove scroolbar
          className="w-full bg-transparent outline-none resize-none text-white placeholder-gray-500 pr-3 overflow-hidden "
          placeholder="How can Schema AI help you today?"
          rows={5}
        />

        <div>
          <button className='bg-gradient-to-tr from-blue-500 p-2 rounded-md to-blue-300 hover:from-blue-600 hover:to-blue-400 transition-colors'>
            <SendIcon size={18} />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center px-4 py-4 ">
        <div className="flex space-x-3">
          <button className="text-schema-light-gray hover:text-white transition-colors">
            <Link size={18} />
          </button>
          <button className="text-schema-light-gray hover:text-white transition-colors">
            <PaperclipIcon size={18} />
          </button>
        </div>
        <p className='text-sm text-gray-500'>Use <span className='font-mono text-xs text-white  bg-schema-gray rounded-md p-1'>Shift</span> +  <span className='font-mono text-xs text-white  bg-schema-gray rounded-md p-1'>Return</span> for a new line</p>
      </div>
    </div>
  );
};

export default TextInput;
