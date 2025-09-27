
import { GoogleGenAI, Modality } from "@google/genai";
import { ClothingType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function fileToGenerativePart(base64: string, mimeType: string) {
  return {
    inlineData: {
      data: base64.split(',')[1],
      mimeType
    },
  };
}

function getClothingItemName(clothingType: ClothingType): string {
  switch (clothingType) {
    case 'Top':
      return 'shirt';
    case 'Bottom':
      return 'pants';
    case 'Shoes':
      return 'shoes';
  }
}

export const virtualTryOn = async (
  userImage: string, // base64 string
  clothingImage: string, // base64 string
  clothingType: ClothingType
): Promise<string | null> => {
  try {
    const userImagePart = fileToGenerativePart(userImage, 'image/jpeg');
    const clothingImagePart = fileToGenerativePart(clothingImage, 'image/jpeg');
    const clothingItemName = getClothingItemName(clothingType);

    const prompt = `Take the person from the first image and realistically place the ${clothingItemName} from the second image onto them. Adjust the clothing to fit their body and pose. Maintain the original background of the person's image.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          userImagePart,
          clothingImagePart,
          { text: prompt },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }
    return null;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate image with Gemini API.");
  }
};
