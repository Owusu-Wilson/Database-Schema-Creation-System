
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

interface WelcomeSectionProps {
  text?:string
}
const WelcomeSection = ({text}:WelcomeSectionProps) => {
  const {user} = useAuth()
  const [username, setUsername] = useState("User");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate loading time before showing the welcome message
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <div className={`text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <h1 className="text-3xl font-medium mb-2 text-black">
        {user?.email ? <>Welcome, <span className="font-semibold italic">{(user?.email.split('@')[0])}</span>.</>: text}
        </h1>
        {user && <><p className="text-xl text-keymap-gray font-light text-black">
          What are we building today?
        </p></>}
      </div>
    </div>
  );
};

export default WelcomeSection;
