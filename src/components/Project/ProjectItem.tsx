import { Project } from "@/types"
import { Link } from "react-router-dom"

interface ProjectItemProps{
    
    isActiveProject?:boolean
    project:Project
  }
  const ProjectItem = ({ isActiveProject, project}:ProjectItemProps)=>{
    return (
      <div>
        {/* <h1 className={`text-2xl ${isActiveProject?'text-blue-500':'text-black'}`}>{title}</h1> */}
        <Link to={`/project/${project.id}`} >
        <h1 className='text-2xl hover:text-blue-500 hover:cursor-pointer'>{project.title}</h1>
        </Link>
      </div>
    )
  }
export default ProjectItem  