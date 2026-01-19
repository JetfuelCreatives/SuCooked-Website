
import { GoogleGenAI, Type } from "@google/genai";

const getApiKey = () => {
  try {
    if (typeof window !== 'undefined' && (window as any).process?.env?.API_KEY) {
      return (window as any).process.env.API_KEY;
    }
    if (typeof process !== 'undefined' && process.env?.API_KEY) {
      return process.env.API_KEY;
    }
    return "";
  } catch {
    return "";
  }
};

export const getChefRecommendation = async (userPreference: string) => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.warn("Chef AI: Running in inspiration mode (no API key).");
    return {
      suggestionTitle: "The Chef's Secret Inspiration",
      description: "Our executive chef is currently curating new flavors. For a specific recommendation, please ensure the system is authenticated.",
      winePairing: "A full-bodied Cabernet Sauvignon"
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
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

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
