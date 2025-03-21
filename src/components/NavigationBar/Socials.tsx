import { Github, Linkedin, Twitter } from "lucide-react"

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

export default Socials;