import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const modelName = 'gemini-2.5-flash';

// Generate a Job Description based on title and keywords
export const generateJobDescription = async (title: string, department: string, keywords: string): Promise<{ description: string, requirements: string[] }> => {
  if (!apiKey) throw new Error("API Key missing");

  const prompt = `Create a professional job description and a list of 5-7 key bullet-point requirements for a "${title}" role in the "${department}" department. 
  Focus on these keywords/skills: ${keywords}.
  Keep the description engaging but concise (under 150 words).`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            requirements: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini JD Error:", error);
    throw error;
  }
};

// Analyze a performance review draft and polish it
export const polishPerformanceReview = async (rawNotes: string, employeeName: string, role: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key missing");

  const prompt = `I am writing a performance review for ${employeeName}, who is a ${role}. 
  Here are my raw notes: "${rawNotes}".
  
  Please rewrite this into a professional, constructive, and encouraging performance review paragraph (approx 100-150 words). 
  Balance praise with constructive feedback if implied in the notes.`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });
    return response.text || "Could not generate review.";
  } catch (error) {
    console.error("Gemini Review Error:", error);
    return "Error generating review. Please try again.";
  }
};

// Screen a candidate (Mock resume analysis)
export const screenCandidate = async (candidateName: string, resumeText: string, jobTitle: string): Promise<{ score: number, summary: string }> => {
    if (!apiKey) throw new Error("API Key missing");

    const prompt = `Act as an expert HR recruiter. specificially for the role of "${jobTitle}".
    Analyze the following resume snippet for candidate "${candidateName}":
    "${resumeText}"
    
    Provide:
    1. A match score from 0 to 100 based on relevance to a typical ${jobTitle} role.
    2. A brief 1-2 sentence summary of why they fit or don't fit.`;

    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.INTEGER },
                        summary: { type: Type.STRING }
                    }
                }
            }
        });

        const text = response.text;
        if (!text) return { score: 0, summary: "Analysis failed." };
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini Screening Error:", error);
        return { score: 0, summary: "Error analyzing candidate." };
    }
}