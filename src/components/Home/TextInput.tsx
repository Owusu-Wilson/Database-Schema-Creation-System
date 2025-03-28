import { Link, PaperclipIcon, SendIcon } from 'lucide-react';

interface TextInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onClick: () => void;
}

const TextInput = ({ inputValue, setInputValue, onClick }: TextInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="glass-panel w-full max-w-xl mx-auto mb-12 opacity-0 animate-fade-in animate-delay-300">
      <div className="flex p-4 relative">
        <textarea 
          value={inputValue}
          onChange={handleChange}
          autoSave="true"
          className="w-full bg-transparent outline-none resize-none text-white placeholder-gray-500 pr-3 overflow-hidden"
          placeholder="How can Schema AI help you today?"
          rows={5}
        />

        {/* Dynamically showing the send button */}
        {inputValue && (
          <div>
            <button
              onClick={onClick}
              className="bg-gradient-to-tr from-green-500 p-2 rounded-md to-green-300 hover:from-green-600 hover:to-green-400 transition-colors animate-slide-up"
            >
              <SendIcon size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex space-x-3">
          <button className="text-schema-light-gray hover:text-white transition-colors">
            <Link size={18} />
          </button>
          <button className="text-schema-light-gray hover:text-white transition-colors">
            <PaperclipIcon size={18} />
          </button>
        </div>

        {inputValue && (
          <p className="text-sm text-gray-500 animate-slide-up">
            Use <span className="font-mono text-xs text-white bg-schema-gray rounded-md p-1">Shift</span> +  
            <span className="font-mono text-xs text-white bg-schema-gray rounded-md p-1">Return</span> for a new line
          </p>
        )}
      </div>
    </div>
  );
};

export default TextInput;
