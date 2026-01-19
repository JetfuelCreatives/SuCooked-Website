
import { GoogleGenAI, Type } from "@google/genai";

// Standard browser environments like GitHub Pages don't have 'process' defined globally.
// We use a safe check to ensure the app doesn't crash on initialization.
const getApiKey = () => {
  try {
    // Check window.process first as it's our shimmed location
    if (typeof window !== 'undefined' && (window as any).process?.env?.API_KEY) {
      return (window as any).process.env.API_KEY;
    }
    // Fallback to standard process.env check
    return process.env.API_KEY || "";
  } catch {
    return "";
  }
};

export const getChefRecommendation = async (userPreference: string) => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.warn("Chef AI: API Key not found. Please ensure it is configured.");
    return {
      suggestionTitle: "The Chef is currently away",
      description: "We are unable to reach our executive chef right now. Please try again later.",
      winePairing: "N/A"
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
