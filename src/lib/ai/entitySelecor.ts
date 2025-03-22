import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
  You are a database entity extraction tool. Your task is to analyze the provided text and extract only the names of entities.
  Do not include any additional details.
  Present the extracted column names in a well-structured JSON array. Do not engage in dialogue or provide additional 
  commentary. Simply return the JSON array containing the column names.
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
              type: "array",
              items: {
                  type: "string"
              }
          }
      },
      required: ["response"]
  }
};

export const entitySelecorAI = model.startChat({
  generationConfig,
  history: []
});