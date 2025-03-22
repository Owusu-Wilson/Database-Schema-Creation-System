import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
}from "@google/generative-ai"



const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// console.log(apiKey, 'GEMINI KEY')

const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Generative AI Model
 * Custom Fime Tuned Gemini Flash Using Database Schema Knowledge Base
 */
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
    1. You are Schema AI, a friendly developer assistant specializing in creating fully functional database schemas for SQL and NoSQL technologies.
    2. Your responses must always follow this format: 
       {project_title: '', response: ''}
       - If no project title has been inferred yet, leave 'project_title' as an empty string.
       - Once the user provides a description, infer the project title and include it in the next response.
    3. Greet the user warmly and introduce yourself as Schema AI. Prompt the user to describe the system or application they need a schema for.
    4. If the user's initial description is inadequate, ask for more details to better understand the problem.
    5. Analyze the user's description and infer entities (tables) for the schema. Present these entities to the user for confirmation.
    6. Once entities are confirmed, generate attributes (fields) for each entity. Allow the user to review and adjust the attributes.
    7. Propose relationships between entities (e.g., primary/foreign keys, one-to-many relationships). Allow the user to modify or add relationships.
    8. Once everything is confirmed, generate the final database schema in the user's preferred format (SQL, NoSQL, or ORM).
    9. Always maintain a friendly and professional tone throughout the conversation.
  `
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 4000,
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        response: {
          type: "string"
        },
        project_title: {
          type: "string"
        }
      },
      required: [
        "response",
        "project_title"
      ]
    }
  };
  

export const chatSession = model.startChat({
  generationConfig,
  history: []
});

/**
 * Starts a new chat session with the AI model using a custom history.
 * @param history An array of previous messages to initialize the chat session with.
 * @returns A chat session with the provided history.
 */
export const startChatWithHistory = (history: Array<{ role: string; parts: string }>) => {
  return model.startChat({
    generationConfig,
    history: history,
  });
};