import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import ProjectItem from '@/components/Project/ProjectItem';
import { TbPlus } from 'react-icons/tb';
import { schemaProjectsService } from '@/lib/services/projects';
import { Project } from '@/types';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export const ProjectsPage = () => {
  const [inputValue, setInputValue] = useState('');

  // Fetch projects using React Query
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery<Project[]>({
    queryKey: ['projects'], // Unique key for this query
    queryFn: async () => {
      const projects = await schemaProjectsService.getAll();
      return projects;
    },
  });

  const notify = () => toast('Wow so easy!');
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const AddNewProjectButton = () => {
    return (
      <Link
        to={'/'}
        className='flex gap-2 items-center justify-center bg-gray-950 hover:bg-gray-900 hover:animate-pulse-slow transition-colors px-10 py-3 rounded-full text-white text-2xl'
      >
        <TbPlus size={20} />
        <h1 className='text-lg'>New Project</h1>
      </Link>
    );
  };

  // Show a loader while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  // Show an error message if fetching fails
  if (isError) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-2xl text-red-600">Failed to fetch projects. Please try again.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-8 flex-1 px-4 py-16">
        {/* Render the fetched projects */}
        {projects && projects.length > 0 ? (
          projects.map((project) => <ProjectItem key={project.id} project={project} />)
        ) : (
          <h1 className="text-2xl">You have no projects yet</h1>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-8 flex-1 px-4 py-16">
        <AddNewProjectButton />
      </div>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        hideProgressBar={false}
        newestOnTop={true}
      />
    </div>
  );
};