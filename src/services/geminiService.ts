import { GoogleGenAI, Type } from "@google/genai";
import { Language } from "../constants/translations";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface CropRecommendation {
  cropName: string;
  betterCropName: string;
  expectedYield: number;
  marketPrice: number;
  netProfit: number;
  riskLevel: 'low' | 'medium' | 'high';
  riskReason: string;
  soilAnalysis: string;
  weatherAdvice: string;
  expertTips: string[];
  profitData: { month: string; profit: number }[];
  yieldComparison: { name: string; yield: number }[];
}

export async function getCropRecommendation(
  query: string,
  language: Language,
  location?: { lat: number; lng: number }
): Promise<CropRecommendation> {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are SmartKisan, an expert agricultural AI advisor.
    Your goal is to provide highly accurate crop recommendations and financial analysis for farmers.
    
    When a user provides a location or a crop name:
    1. Analyze the likely soil and weather conditions for that region (or the crop's requirements).
    2. Recommend the best crop for the current season.
    3. IMPORTANT: If the user specified a crop, suggest a "Better Alternative" crop that might be more profitable or lower risk.
    4. Provide financial estimates in Indian Rupees (₹) and metric units (tons/acre).
    5. Return the response in the user's selected language: ${language}.
    
    Response MUST be in JSON format matching the schema provided.
  `;

  const prompt = `
    Location/Query: ${query}
    Language: ${language}
    Coordinates: ${location ? `${location.lat}, ${location.lng}` : 'Unknown'}
    
    Please provide a detailed crop recommendation and analysis.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          cropName: { type: Type.STRING },
          betterCropName: { type: Type.STRING },
          expectedYield: { type: Type.NUMBER },
          marketPrice: { type: Type.NUMBER },
          netProfit: { type: Type.NUMBER },
          riskLevel: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
          riskReason: { type: Type.STRING },
          soilAnalysis: { type: Type.STRING },
          weatherAdvice: { type: Type.STRING },
          expertTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          profitData: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                month: { type: Type.STRING },
                profit: { type: Type.NUMBER }
              }
            }
          },
          yieldComparison: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                yield: { type: Type.NUMBER }
              }
            }
          }
        },
        required: [
          'cropName', 'betterCropName', 'expectedYield', 'marketPrice', 
          'netProfit', 'riskLevel', 'riskReason', 'soilAnalysis', 
          'weatherAdvice', 'expertTips', 'profitData', 'yieldComparison'
        ]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Failed to get recommendation");
  }
}
