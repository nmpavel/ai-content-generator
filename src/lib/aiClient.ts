import { GoogleGenAI } from "@google/genai";
if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in .env");
}
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY as string,
});

export const generateAIContent = async (
  prompt: string,
  type: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a ${type} about: ${prompt}`,
    });

    if (!response.text) {
      throw new Error("AI returned empty response");
    }

    return response.text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error("AI generation failed");
  }
};
