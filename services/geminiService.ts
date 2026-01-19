
import { GoogleGenAI, Type } from "@google/genai";

// Safe access to environment variables for browser compatibility
const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : null;
  } catch (e) {
    return null;
  }
};

const apiKey = getApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getChefRecommendation = async (userPreference: string) => {
  if (!ai) {
    console.warn("Chef AI is unavailable: API Key not found in environment.");
    return {
      suggestionTitle: "Signature Selection",
      description: "Our Chef is currently offline, but we highly recommend our Slow-Braised Lamb Shank for a truly gourmet experience.",
      winePairing: "Full-bodied Cabernet Sauvignon"
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

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
