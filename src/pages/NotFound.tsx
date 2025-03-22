import Navbar from "@/components/Navbar";
import { TbError404 } from "react-icons/tb";

import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="flex flex-col items-center justify-center gap-8 flex-1 px-4 py-16">
        <TbError404 size={100} />
      <h1 className='text-4xl hover:cursor-pointer'>Page Not Found</h1>
        <Link
          to={"/"}
          className="flex gap-2 items-center justify-center bg-gray-950 hover:bg-gray-900 hover:animate-pulse-slow transition-colors px-10 py-3 rounded-full text-white text-2xl"
        >
          <h1 className="text-lg">Go Home</h1>
        </Link>
      </div>
    </div>
  );
};
