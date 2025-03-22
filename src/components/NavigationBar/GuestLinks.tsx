import { Link } from "react-router-dom";

const GuestLinks = () =>{
    return (
      <div className="flex items-center gap-4 mr-10">
      <Link to={'/login'}>
        <button className="text-sm rounded-md bg-transparent border border-schema-gray text-black transition-all duration-300 hover:border-white hover:bg-opacity-20 hover:bg-white px-2 py-1">
          Login
        </button>
        </Link>
        <Link to={'/signup'}>
        <button className="bg-schema-green text-sm rounded-md px-2 py-1">
          Signup
        </button></Link>
       
      </div>
    )
  }

  export default GuestLinks;