
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

// IMPORTANT: Ensure the API_KEY is set in your environment variables.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey });

export async function getSQLReview(userQuery: string): Promise<string> {
  try {
    const fullPrompt = `${SYSTEM_PROMPT}\n\n---\n\nEcco la query da analizzare:\n\`\`\`sql\n${userQuery}\n\`\`\``;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Provide a user-friendly, themed error message
    throw new Error("Miao! C'è stato un problema nel contattare il Purrfessor. Forse sta facendo un pisolino. Riprova tra poco! 🐾");
  }
}
