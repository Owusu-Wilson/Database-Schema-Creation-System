import { CgArrowTopRight } from "react-icons/cg";
import { Link } from "react-router-dom";

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


  export default ProjectsLink;