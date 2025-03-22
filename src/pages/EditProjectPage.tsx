import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { GoogleGenerativeAIError } from "@google/generative-ai";
import WelcomeSection from "@/components/Chat/WelcomeSection";
import ChatInput from "@/components/Chat/ChatInput";
import Navbar from "@/components/Navbar";
import OutputSection from "@/components/Chat/OutputSection";
import ChatBubble from "@/components/Chat/ChatBubble";
import { chatSession, startChatWithHistory } from "@/lib/ai/genai"; // Import startChatWithHistory
import { schemaProjectsService } from "@/lib/services/projects";
import { ChatMessage, Project } from "@/types";
import { schemaInferenceAI } from "@/lib/ai/schemaInference";
import { attributesExtractorAI } from "@/lib/ai/attributesSelector";

const EditProjectPage = () => {
  const { id } = useParams<{ id: string }>(); // Extract the `id` from the URL
  const queryClient = useQueryClient(); // Access the queryClient

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [isMessageSent, setIsMessageSent] = useState(false);

  const [extractedEntities, setExtractedEntities] = useState([]);

  const [extractedAttributes, setExtractedAttributes] = useState([]);

  const [extractedSchema, setExtractedSchema] = useState({});



  const notify = (message: string) => toast(message);

  // Fetch the Project using React Query
  const {
    data: currentProject,
    isLoading,
    isError,
  } = useQuery<Project>({
    queryKey: ["project", id], // Include the `id` in the query key
    queryFn: async () => {
      if (!id) throw new Error("Project ID is required"); // Ensure `id` is defined
      const currentProject = await schemaProjectsService.getByID(id); // Fetch the project by ID
      return currentProject;
    },
  });

  // Sync local `chats` state with `currentProject.chats`
  const [chats, setChats] = useState<Array<ChatMessage>>([]);
  useEffect(() => {
    if (currentProject?.chats) {
      setChats(currentProject.chats);
    }
  }, [currentProject]);

  /**
   * Converts the `chats` array into the GenAI history format.
   * @returns An array of messages in the format { role: string, parts: { text: string }[] }.
   */
  const getGenAIHistory = () => {
    return chats.map((chat) => ({
      role: chat.type === "user" ? "user" : "model",
      parts: [{ text: chat.content }], // Ensure `parts` is an array of objects with a `text` property
    }));
  };

  /**
   * Adds a message to the chat history, and returns the new message
   * @param message The content of the message
   * @param type The type of the message, either "user" or "ai"
   * @returns The new message that was just added
   */
  const addMessageToChat = (message: string, type: "user" | "ai"): ChatMessage => {
    const newMessage: ChatMessage = { type, content: message, timestamp: new Date() };
    return newMessage;
  };

  /**
   * Sends the user's message to the AI and returns the AI's response
   * @param message The user's message
   * @returns The AI's response
   */
  const sendMessageToAI = async (message: string): Promise<string> => {
    const history:any = getGenAIHistory(); // Get the chat history in GenAI format
    const session = startChatWithHistory(history); // Start a chat session with the history
    const result = await session.sendMessage(message);
    const aiResponse = await result.response.text();
    return aiResponse;
  };


  const querySchemaGenAI = async (message: string): Promise<string> => {
    
    const result = await schemaInferenceAI.sendMessage(message);
    const aiResponse = await result.response.text();
    return aiResponse;
  };

  /**
   * Updates the project with the given data
   * @param updatedData The data to be updated in the project
   */
  const updateProject = async (updatedData: Partial<Project>) => {
    if (!id) throw new Error("Project ID is required");
    const updatedProject = await schemaProjectsService.update(id, updatedData);
    console.log("Project updated:", updatedProject);
    return updatedProject;
  };

  /**
   * Handles errors and displays appropriate notifications
   * @param error The error object
   */
  const handleError = (error: unknown) => {
    console.error("Error:", error);
    if (error instanceof GoogleGenerativeAIError) {
      notify("Network Connectivity Problem! Please check your internet.");
    } else {
      notify("Failed to process request. Please try again.");
    }
  };

  /**
   * Handles the submission of a new message
   */
  const handleSubmit = async () => {
    if (!message.trim()) return; // Ignore empty messages

    try {
      setLoading(true);
      setIsMessageSent(true);

      // Step 1: Add the user's message to the chat history (optimistic update)
      const userMessage = addMessageToChat(message, "user");
      setChats((prevChats) => [...prevChats, userMessage]);

      // Step 2: Send the user's message to the AI and get the response
      const aiResponse = await sendMessageToAI(message);
      setResponse(aiResponse);



      // Step 3: Send the initial gemini response back to extract schema on another conversation 'thread'
      const shemaGenResult = await querySchemaGenAI(JSON.parse(aiResponse).response);
      setExtractedSchema(JSON.stringify(shemaGenResult));

      
      // Step 4: Add the AI's response to the chat history (optimistic update)
      const aiMessage = addMessageToChat(aiResponse, "ai");
      setChats((prevChats) => [...prevChats, aiMessage]);

      // Step 5: Update the project with the new chat history
      await updateProject({ chats: [...chats, userMessage, aiMessage], title: JSON.parse(aiMessage.content).project_title });

      // Step 6: Invalidate the query to refresh the data
      await queryClient.invalidateQueries({ queryKey: ["project", id] });
    } catch (error) {
      // Step 7: Handle errors
      handleError(error);

      
      setChats((prevChats) => prevChats.slice(0, -2)); // Remove the last two messages (user + AI)
    } finally {
      setLoading(false);
      setMessage(""); // Clear the input after submit
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching project. Please try again.</div>;
  }

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
       
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <h1 className="text-3xl font-medium mb-2 text-black">
              {currentProject?.title}
            </h1>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            {Object.keys(extractedSchema).length > 0 && <OutputSection type="entities-attributes-relationships" content={JSON.stringify(extractedSchema)} />}
          </div>
        
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center transform transition-all duration-700 translate-y-0 opacity-100">
            {chats.slice(-2).map((chatMessage, index) => (
              <ChatBubble key={index} message={chatMessage} />
            ))}
       
          </div>
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

export default EditProjectPage;