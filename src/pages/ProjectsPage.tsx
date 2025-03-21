

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { ToastContainer, toast } from 'react-toastify';
import {  useState } from 'react';


const firstRowOptions = ['Import from Figma', 'Build a mobile app with Expo', 'Start a blog with Astro'];
const secondRowOptions = ['Create a docs site with Vitepress', 'Scaffold UI with shadcn', 'Draft a presentation with Slidev'];

// Create a context

export const ProjectsPage = () => {
  const [inputValue, setInputValue] = useState('');

  const notify = () => toast("Wow so easy!");
  const handleInputChange = (value:string) => {
    setInputValue(value);
  };


  return (
   
    <div className="min-h-screen flex flex-col bg-gradient-to-tr overflow-y-hidden ">
      <Navbar />
     
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-16">
   
      </div>


     
       
        <ToastContainer 
        position='bottom-right' 
        theme='dark'
        hideProgressBar={false}
        newestOnTop={true}
          />
     
      <Footer />
    </div>

  );
};

