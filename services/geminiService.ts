
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  async askTutor(context: string, question: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a helpful AI Tutor. Context about the current lesson: "${context}". The student asks: "${question}"`,
        config: {
          systemInstruction: "Provide concise, encouraging, and accurate answers to help the student learn. Use markdown for formatting.",
          temperature: 0.7,
        }
      });
      return response.text || "I'm sorry, I couldn't process that right now.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while talking to your tutor.";
    }
  },

  async generateQuiz(lessonContent: string): Promise<QuizQuestion[]> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate 3 multiple-choice quiz questions based on this content: "${lessonContent}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.INTEGER, description: "Index of the correct option (0-indexed)" },
                explanation: { type: Type.STRING }
              },
              required: ["question", "options", "correctAnswer", "explanation"]
            }
          }
        }
      });
      
      const text = response.text || "[]";
      return JSON.parse(text);
    } catch (error) {
      console.error("Quiz Gen Error:", error);
      return [];
    }
  }
};
