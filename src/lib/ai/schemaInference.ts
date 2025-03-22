import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY!;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const schemaInference = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
    You are a database schema inference tool. Your task is to analyze the provided text and extract all necessary data to create an ER diagram.
    This includes:
    1. Entities (tables) and their attributes (columns).
    2. Primary keys for each entity.
    3. Foreign keys and their references.
    4. Relationships between entities (e.g., one-to-many, many-to-many).
    
    Present the extracted data in a well-structured JSON object with the following format:
    {
      "entities": [
        {
          "name": "EntityName",
          "attributes": ["attr1", "attr2", ...],
          "primaryKey": "primaryKeyAttribute"
        }
      ],
      "relationships": [
        {
          "from": "Entity1",
          "to": "Entity2",
          "type": "one-to-many",
          "via": "foreignKeyAttribute"
        }
      ]
    }
    
    Do not engage in dialogue or provide additional commentary. Simply return the JSON object containing the schema data.
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
          type: "object",
          properties: {
            entities: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  attributes: {
                    type: "array",
                    items: { type: "string" }
                  },
                  primaryKey: { type: "string" }
                },
                required: ["name", "attributes", "primaryKey"]
              }
            },
            relationships: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  from: { type: "string" },
                  to: { type: "string" },
                  type: { type: "string" },
                  via: { type: "string" }
                },
                required: ["from", "to", "type", "via"]
              }
            }
          },
          required: ["entities", "relationships"]
        }
      },
      required: ["response"]
    }
  };
  
  export const schemaInferenceAI = schemaInference.startChat({
    generationConfig,
    history: []
  });