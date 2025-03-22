import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY!;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Model for extracting entities
  const entityModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
    You are a database entity extraction tool. Your task is to analyze the provided text and extract only the names of entities.
    Do not include any additional details.
    Present the extracted column names in a well-structured JSON array. Do not engage in dialogue or provide additional 
    commentary. Simply return the JSON array containing the column names.
    `
  });
  
  // Model for extracting attributes
  const attributesModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
    You are a database attribute extraction tool. Your task is to analyze the provided text and extract the attributes (e.g., column names, data types, constraints) associated with each entity.
    Present the extracted attributes in a well-structured JSON object where the keys are entity names and the values are arrays of attributes.
    Do not engage in dialogue or provide additional commentary. Simply return the JSON object containing the attributes.
    `
  });
  
  // Generation config for both models
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
          type: "array",
          items: {
            type: "string"
          }
        }
      },
      required: ["response"]
    }
  };
  
  // Entity selector AI
  export const entitySelecorAI = entityModel.startChat({
    generationConfig,
    history: []
  });
  
  // Attributes extractor AI
  export const attributesExtractor = attributesModel.startChat({
    generationConfig: {
      ...generationConfig,
      responseSchema: {
        type: "object",
        properties: {
          response: {
            type: "object",
            additionalProperties: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        },
        required: ["response"]
      }
    },
    history: []
  });