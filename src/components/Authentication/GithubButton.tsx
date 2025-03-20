import { FaGithub } from 'react-icons/fa'


interface GithubButtonProps{
    isLoading : boolean
}
export default function GithubButton({isLoading}: GithubButtonProps ){
  return (
    <button 
    className="w-full flex items-center justify-center px-4 py-2.5 border text-sm font-semibold border-gray-600 rounded-md shadow-sm bg-[#27272a] hover:bg-gradient-to-br from-schema-green to-green-800 transition-colors"
    
    disabled={isLoading}
  >
    <FaGithub className="mr-2 text-white" size={18}/>
    {isLoading ? 'Connecting...' : 'Continue with Github'}
  </button> 
  )
}
