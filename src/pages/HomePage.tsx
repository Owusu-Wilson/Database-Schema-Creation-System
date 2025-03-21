import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Announcement from "@/components/Home/Announcement";
import OptionRow from "@/components/Home/OptionRow";
import TechStack from "@/components/Home/TechStack";
import TextInput from "@/components/Home/TextInput";

import { createContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const firstRowOptions = [
  "Import from Figma",
  "Build a mobile app with Expo",
  "Start a blog with Astro",
];
const secondRowOptions = [
  "Create a docs site with Vitepress",
  "Scaffold UI with shadcn",
  "Draft a presentation with Slidev",
];

// Create a context
export const HomeContext = createContext();
const HomePage = () => {
  const [inputValue, setInputValue] = useState("");
  const notify = () => toast("Wow so easy!");

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <HomeContext.Provider value={{ inputValue, setInputValue }}>
      <div className="min-h-screen flex flex-col bg-gradient-to-tr overflow-y-hidden ">
        <Navbar />
        {/* <Sidebar/> */}
        <div className="flex flex-col items-center justify-center flex-1 px-4 py-16">
          <Announcement />

          <h1 className="text-4xl font-figtree md:text-5xl font-bold text-center mb-4 opacity-0 animate-fade-in animate-delay-200">
            Lets handle your data logic
          </h1>

          <p 
          onClick={()=>notify()}
          className="text-gray-400 text-center mb-10 opacity-0 animate-fade-in animate-delay-200">
            Prompt, view and download <span className="text-white">SQL</span>{" "}
            and <span className="text-white">NoSQL</span> schema for your next
            app.
          </p>

          <TextInput value={inputValue} onChange={handleInputChange} />

          <OptionRow options={firstRowOptions} delay={400} />
          <OptionRow options={secondRowOptions} delay={400} />

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
    </HomeContext.Provider>
  );
};

export default HomePage;
