import { GoogleGenAI, Type } from "@google/genai";
import type { CompanyProfile, Scores, ActionPlan } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const actionPlanSchema = {
    type: Type.OBJECT,
    properties: {
        priorityAreas: {
            type: Type.ARRAY,
            description: "A list of the top 2-3 readiness sections that need the most attention based on the scores.",
            items: { type: Type.STRING }
        },
        immediateActions: {
            type: Type.ARRAY,
            description: "3-5 specific, actionable recommendations for the next 0-6 months to build a foundation.",
            items: { type: Type.STRING }
        },
        shortTermActions: {
            type: Type.ARRAY,
            description: "3-5 specific, actionable recommendations for the next 6-18 months to build capabilities and pilot solutions.",
            items: { type: Type.STRING }
        },
        longTermActions: {
            type: Type.ARRAY,
            description: "3-5 specific, actionable recommendations for 18+ months to scale solutions and achieve market leadership.",
            items: { type: Type.STRING }
        },
        industrySpecificRecommendations: {
            type: Type.ARRAY,
            description: "2-3 recommendations tailored to the company's specific industry.",
            items: { type: Type.STRING }
        },
        goalSpecificRecommendations: {
            type: Type.ARRAY,
            description: "2-3 recommendations tailored to helping the company achieve its stated primary goal.",
            items: { type: Type.STRING }
        }
    },
    required: ["priorityAreas", "immediateActions", "shortTermActions", "longTermActions", "industrySpecificRecommendations", "goalSpecificRecommendations"]
};


export const generateActionPlan = async (profile: CompanyProfile, scores: Scores): Promise<ActionPlan | null> => {
    if (!process.env.API_KEY) {
        console.error("Gemini API key is not configured.");
        // Return a default, non-AI generated plan
        return {
            priorityAreas: ["Action Plan Generation requires API Key"],
            immediateActions: ["Configure the API_KEY environment variable to enable AI-powered recommendations."],
            shortTermActions: [],
            longTermActions: [],
            industrySpecificRecommendations: [],
            goalSpecificRecommendations: []
        };
    }

    const scoreSummary = Object.entries(scores)
        .filter(([key]) => key !== 'total')
        .map(([key, value]) => `${key.replace('section', 'Section ')}: ${value.rawScore}/${value.maxScore} points`)
        .join('\n');

    const prompt = `
        You are a world-class climate technology strategy consultant for Resonance.
        A company has completed a climate tech readiness assessment. Based on their profile and scores, generate a personalized and actionable plan.

        **Company Profile:**
        - Contact Person: ${profile.userName}, ${profile.userRole}
        - Company Name: ${profile.companyName}
        - Industry: ${profile.industry}
        - Size: ${profile.companySize}
        - Primary Goal: ${profile.primaryGoal}
        - Desired Implementation Timeframe: ${profile.timeframe}
        - Geographic Scope: ${profile.geographicScope}

        **Assessment Scores:**
        ${scoreSummary}
        
        Total Score: ${scores.total.rawScore}/100

        **Task:**
        Generate a JSON object that provides a strategic action plan. The tone should be encouraging, professional, and clear.
        The actions should be concrete and specific. For example, instead of "Improve R&D", suggest "Form a partnership with a local university's engineering department to co-develop a pilot project in [relevant tech area]".
        Focus on the lowest-scoring areas as priorities.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: actionPlanSchema,
                temperature: 0.5,
            },
        });

        const jsonText = response.text;
        const parsedPlan: ActionPlan = JSON.parse(jsonText);
        return parsedPlan;

    } catch (error) {
        console.error("Error generating action plan with Gemini:", error);
        return {
            priorityAreas: ["Error generating AI plan"],
            immediateActions: ["The AI-powered recommendation engine encountered an error. Please check your API key and network connection. You can still use the scores above to manually create a plan."],
            shortTermActions: [],
            longTermActions: [],
            industrySpecificRecommendations: [],
            goalSpecificRecommendations: []
        };
    }
};