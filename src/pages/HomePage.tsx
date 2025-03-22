import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Announcement from "@/components/Home/Announcement";
import OptionRow from "@/components/Home/OptionRow";
import TechStack from "@/components/Home/TechStack";
import TextInput from "@/components/Home/TextInput";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const firstRowOptions = [
  "Generate schema for E-commerce",
  "Build a Blog with comments",
  "Create a Social media app",
];

const secondRowOptions = [
  "Set up User authentication",
  "Design Multi-tenant SaaS",
  "Create Real-time chat schema",
];


const HomePage = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();


  const handleOptionSelect = (option: string) => {
    setInputValue(option);
  };
  const handleSubmit = () => {
    if (inputValue.trim()) {
      navigate('/chat', { state: { inputValue: inputValue } });
    }
  };

  const notify = () => toast("Wow so easy!");

 

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr overflow-y-hidden">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-1 px-4 py-16">
        <Announcement />

        <h1 className="text-4xl font-figtree md:text-5xl font-bold text-center mb-4 opacity-0 animate-fade-in animate-delay-200">
          Let's handle your data logic
        </h1>

        <p
          onClick={notify}
          className="text-gray-400 text-center mb-10 opacity-0 animate-fade-in animate-delay-200"
        >
          Prompt, view and download <span className="text-white">SQL</span> and{" "}
          <span className="text-white">NoSQL</span> schema for your next app.
        </p>

        {/* Pass state as props */}
        <TextInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          onClick={handleSubmit}
        />

        <OptionRow 
        options={firstRowOptions} 
        delay={400} 
        onSelect={handleOptionSelect} // <-- Pass the handler here
      />
         <OptionRow 
        options={secondRowOptions} 
        delay={400} 
        onSelect={handleOptionSelect} // <-- Pass the handler here
      />

        <TechStack />
      </div>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        hideProgressBar={false}
        newestOnTop={true}
      />

      <Footer />
    </div>
  );
};

export default HomePage;
