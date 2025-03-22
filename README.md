# Schema Inference and ER Diagram Generator

## Overview
This project is a web-based tool that leverages AI to infer database schemas from natural language descriptions and generates Entity-Relationship (ER) diagrams. It integrates with Google's Generative AI (Gemini) to extract entities, attributes, and relationships from text input. The inferred schema is visualized using React Flow, and the project is built with modern web technologies like React, TypeScript, and Vite.
It is a submission for the Database Schema Creation System Test.

Find a deployed version [Keymap](https://wilson-keymap.vercel.app).
---

## Features
- **AI-Powered Schema Inference**: Uses Google's Generative AI to extract database entities, attributes, and relationships from natural language text.
- **Dynamic ER Diagram Generation**: Visualizes the inferred schema as an interactive ER diagram.
- **Real-Time Updates**: Automatically updates the diagram as the schema is inferred.
- **User-Friendly Interface**: Provides a clean and intuitive UI for inputting text and viewing results.
- **Persistent Storage**: Saves project data (including chat history and schemas) for future reference.
- **User Management & Authentication**: Users can create account and have projects associated with them.

---

## Technology Stack
- **Frontend**:
  - **React**: A JavaScript library for building user interfaces.
  - **TypeScript**: Adds static typing to JavaScript for better code quality.
  - **Vite**: A fast build tool for modern web development.
  - **React Flow**: A library for rendering interactive node-based diagrams.
  - **Tailwind CSS**: A utility-first CSS framework for styling.

- **Backend**:
  - **Google Generative AI (Gemini)**: Powers the AI-based schema inference.
  - **Supabase Storage**: Supabase is used as the storage solution.

- **Other Tools**:
  - **React Router**: For navigation within the app.
  - **React Query**: For managing server state and caching.
  - **Toastify**: For displaying notifications.

---

## Design Decisions
1. **AI Integration**:
   - Google's Generative AI (Gemini) was chosen for its ability to handle natural language processing tasks effectively.
   - The gemini flash 2.0 model was seleected.
   - Database schema knowledge base was used to narrow the scope of the model.
   - The AI is fine-tuned to extract database schema components (entities, attributes, relationships) from text input.

2. **Dialogue Engeneering**:
   - The project is designed to be user-friendly and interactive.
   - The user provides natural language input, and the AI generates a structured schema and interactive ER diagram.
   - The AI is supposed to take the user through 5 dialogue sessions.(receive description, infer and revert entities, infer and revert attributes, infer relationships, generate final schema)

2. **Schema Visualization**:
   - React Flow was selected for rendering ER diagrams due to its flexibility and ease of use.
   - Nodes represent entities, and edges represent relationships between them.
   - The final schema generated is used to populate the ER diagram.

3. **State Management**:
   - React's built-in state management (`useState`, `useEffect`) is used for local state.
   - React Query is used for managing server state (e.g., fetching and updating project data).

4. **Persistence**:
   - Project data (including chat history and inferred schemas) is stored on supabase

---

## How It Works
1. **Input Text**:
   - The user provides a natural language description of a database schema (e.g., "The database has two tables: Users and Orders. Users have user_id, username, and email. Orders have order_id, user_id, and order_date.").

2. **AI Inference**:
   - The text is sent to Google's Generative AI, which extracts entities, attributes, and relationships.

3. **Schema Generation**:
   - The inferred schema is structured into a JSON object and passed to the `OutputSection` component.

4. **ER Diagram Rendering**:
   - The `OutputSection` component uses React Flow to render the schema as an interactive ER diagram.

5. **Persistence**:
   - The inferred schema and chat history are saved locally for future reference.

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Google Generative AI API Key (obtain from [Google Cloud Console](https://console.cloud.google.com/))
- A Supabase Account and project [Supabase](https://supabase.com/))

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Owusu-Wilson/Database-Schema-Creation-System.git
   cd schema-inference-tool
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add your Google Generative AI API Key as `GENERATIVE_AI_API_KEY` (obtain from [Google AI Studio](https://aistudio.google.com//)).
   - Add your Supabase database URL `VITE_SUPABASE_URL` (Create a supabase project and copy your database url [Supabase](https://supabase.com//)).
   - Add your Supabase ANNON KEY `VITE_SUPABASE_ANON_KEY` (Create a supabase project and copy your annon key [Supabase](https://supabase.com//)).

4. **Start the App**:
   ```bash
   npm run dev
   ```

5. **Access the App**:
   - Open your web browser and navigate to `http://localhost:5173/`.

---