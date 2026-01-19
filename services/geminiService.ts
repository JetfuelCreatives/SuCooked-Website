import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI client following the guidelines.
// Always use the named parameter 'apiKey' and the process.env.API_KEY variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChefRecommendation = async (userPreference: string) => {
  try {
    // Generate content using the recommended 'gemini-3-flash-preview' model for text tasks.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a world-class executive chef for SuCooked. Based on this preference: "${userPreference}", suggest a meal concept that fits our premium brand identity. Keep it concise and enticing.`,
      config: {
        systemInstruction: "You are an expert chef who speaks with elegance and passion for fresh, high-quality ingredients.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestionTitle: { 
              type: Type.STRING,
              description: "A creative name for the recommended dish."
            },
            description: { 
              type: Type.STRING,
              description: "An elegant description of the flavors and ingredients."
            },
            winePairing: { 
              type: Type.STRING,
              description: "The ideal wine or beverage to pair with the meal."
            },
          },
          required: ["suggestionTitle", "description", "winePairing"],
          propertyOrdering: ["suggestionTitle", "description", "winePairing"]
        }
      }
    });

    // The 'text' property on GenerateContentResponse provides the output string (not a method).
    const jsonStr = response.text;
    if (!jsonStr) {
      throw new Error("Empty response from the Chef AI.");
    }

    return JSON.parse(jsonStr.trim());
  } catch (error) {
    console.error("Gemini Chef AI Error:", error);
    // Provide a signature fallback recommendation if the service is unavailable or an error occurs.
    return {
      suggestionTitle: "Executive Chef's Choice: Braised Lamb Shank",
      description: "Tender, slow-cooked lamb in a rich red wine reduction, served over truffle-infused cauliflower purée.",
      winePairing: "A complex, aged Cabernet Sauvignon"
    };
  }
};