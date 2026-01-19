
import { GoogleGenAI, Type } from "@google/genai";

// Standardizing environment variable access for Vite/Production
const apiKey = process.env.API_KEY || "";

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getChefRecommendation = async (userPreference: string) => {
  if (!ai) {
    console.warn("Chef AI is unavailable: API Key not found in environment.");
    return {
      suggestionTitle: "Executive Choice: Signature Braised Lamb",
      description: "Our digital Chef is currently offline. We highly recommend our signature slow-braised lamb shank for a true gourmet experience.",
      winePairing: "A complex, aged Cabernet Sauvignon"
    };
  }

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

    const text = response.text;
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Gemini Chef AI Error:", error);
    return null;
  }
};
