
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChefRecommendation = async (userPreference: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a world-class executive chef for SuCooked. Based on this preference: "${userPreference}", suggest a meal concept that fits our premium brand identity. Keep it concise and enticing.`,
      config: {
        systemInstruction: "You are an expert chef who speaks with elegance and passion for fresh, high-quality ingredients.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestionTitle: { type: Type.STRING },
            description: { type: Type.STRING },
            winePairing: { type: Type.STRING },
          },
          required: ["suggestionTitle", "description", "winePairing"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
