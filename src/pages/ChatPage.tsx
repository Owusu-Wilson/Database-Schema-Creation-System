import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeSection from "@/components/Chat/WelcomeSection";
import ChatInput from "@/components/Chat/ChatInput";
import Navbar from "@/components/Navbar";
import ChatBubble from "@/components/Chat/ChatBubble";
import { chatSession } from '@/lib/services/genai';
import { schemaProjectsService } from '@/lib/services/projects';
import { ToastContainer, toast } from "react-toastify";
import { GoogleGenerativeAIError } from "@google/generative-ai";
import { ChatMessage, Project } from "@/types";
import { useAuth } from "@/context/AuthContext";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<Array<ChatMessage>>([]);
  const [projectCreated, setProjectCreated] = useState(false);

  const { user } = useAuth();
  const notify = (message: string) => toast(message);
  const navigate = useNavigate();

  // Function to add a user message to the chat history
  const addUserMessageToChat = (message: string) => {
    const userMessage: ChatMessage = { type: "user", content: message, timestamp: new Date() };
    setChats((prevChats) => [...prevChats, userMessage]);
    return userMessage;
  };

  // Function to create a new project
  const createProject = async (chats: ChatMessage[]) => {
    if (!user) throw new Error("User not authenticated");

    const timestamp = new Date().toLocaleString(); // Format: "MM/DD/YYYY, HH:MM:SS AM/PM"
    const projectTitle = `Untitled Project - ${timestamp}`;
    const newProject: Omit<Project, "id"> = {
      title: projectTitle,
      is_public: false,
      owner: user.id,
      chats: chats,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const createdProject = await schemaProjectsService.add(newProject);
    console.log("Project created:", createdProject);

    // Notify the user
    notify(`Project "${projectTitle}" created successfully!`);

    // Mark project as created
    setProjectCreated(true);

    return createdProject;
  };

  // Function to handle errors
  const handleError = (error: unknown) => {
    console.error("Error:", error);
    if (error instanceof GoogleGenerativeAIError) {
      notify('Network Connectivity Problem! Please check your internet.');
    } else {
      notify('Failed to create project. Please try again.');
    }
  };


  /**
   * Handles the submission of a chat message.
   * 
   * This function performs the following steps:
   * 1. Adds the user's message to the chat history.
   * 2. Creates a new project
   * 3. Redirects to the new project's page upon creation.
   * 4. Handles any errors that might occur during the process & gracefully reports them
   * 5. Resets the loading state and clears the message input.
   */

  const handleSubmit = async () => {
    if (!message.trim()) return; // Ignore empty messages

    try {
      setLoading(true);

      // Step 1: Add the user's message to the chat history
      const userMessage = addUserMessageToChat(message);

      // Step 2: Create a project if it hasn't been created yet
      if (!projectCreated) {
        const createdProject = await createProject([...chats, userMessage]);

        // Step 3: Redirect to the new project's page
        navigate(`/project/${createdProject.id}`);
      }
    } catch (error) {
      // Step 4: Handle errors
      handleError(error);
    } finally {
      setLoading(false);
      setMessage(""); // Clear the input after submit
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <ToastContainer
        position="bottom-right"
        theme="dark"
        hideProgressBar={false}
        newestOnTop={true}
      />
      <div className="flex-1 flex flex-col justify-between">
        <WelcomeSection text="Describe your project to get started" />
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {chats.slice(-2).map((chat, index) => (
            <div key={index} className='text-center transform transition-all duration-700 translate-y-0 opacity-100'>
              <ChatBubble
                message={{
                  type: chat.type,
                  content: chat.content,
                  timestamp: chat.timestamp,
                }}
              />
            </div>
          ))}
        </div>
        {loading && (
          <div className="flex space-x-2 items-center pl-10 animate-pulse">
            <div className="h-2 w-2 bg-schema-blue rounded-full"></div>
            <div className="h-2 w-2 bg-schema-blue rounded-full animation-delay-200"></div>
            <div className="h-2 w-2 bg-schema-blue rounded-full animation-delay-400"></div>
          </div>
        )}
        <ChatInput
          value={message}
          setValue={setMessage}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ChatPage;