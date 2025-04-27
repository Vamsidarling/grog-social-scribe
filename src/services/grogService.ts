
import { toast } from "sonner";

const API_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

// Store API Key - in real production, this should be stored securely
let apiKey = "";

interface GrogResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    index: number;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface GenerateContentParams {
  prompt: string;
  platform: string;
}

/**
 * Sets the API key for Grog service
 */
export const setApiKey = (key: string) => {
  apiKey = key;
};

/**
 * Gets the API key for Grog service
 */
export const getApiKey = () => {
  return apiKey;
};

/**
 * Tests the connection to Grog API
 */
export const testConnection = async (): Promise<boolean> => {
  if (!apiKey) {
    toast.error("Please enter an API key");
    return false;
  }

  try {
    // Simple test prompt
    const testPrompt = "Hello, are you working?";
    
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "user",
            content: testPrompt
          }
        ],
        temperature: 0.5,
        max_tokens: 50
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API connection error:", errorData);
      toast.error(`Connection failed: ${errorData.error?.message || "Unknown error"}`);
      return false;
    }

    const data = await response.json();
    toast.success("API connection successful!");
    return true;
  } catch (error) {
    console.error("API connection error:", error);
    toast.error(`Connection failed: ${(error as Error).message}`);
    return false;
  }
};

/**
 * Generates platform-specific content based on user input
 */
export const generateContent = async ({ prompt, platform }: GenerateContentParams): Promise<string | null> => {
  if (!apiKey) {
    toast.error("Please enter an API key");
    return null;
  }

  // Create platform-specific system prompt
  const systemPrompt = getPlatformPrompt(platform);
  
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Content generation error:", errorData);
      toast.error(`Failed to generate content: ${errorData.error?.message || "Unknown error"}`);
      return null;
    }

    const data: GrogResponse = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else {
      toast.error("No content was generated");
      return null;
    }
  } catch (error) {
    console.error("Content generation error:", error);
    toast.error(`Failed to generate content: ${(error as Error).message}`);
    return null;
  }
};

/**
 * Returns platform-specific prompt instructions
 */
function getPlatformPrompt(platform: string): string {
  switch (platform) {
    case 'twitter':
      return `You are a social media expert specializing in Twitter/X posts.
      
Your task is to create engaging, concise Twitter content based on the user's input.

Guidelines:
- Keep tweets under 280 characters when possible
- Include relevant hashtags (2-3 maximum)
- Create content that's likely to drive engagement (likes, retweets, replies)
- Maintain a conversational, authentic tone
- If appropriate, phrase content as a question or thought-provoking statement
- Avoid excessive emojis, but use them strategically when appropriate
- Focus on creating value for the reader

The content should be ready to post as-is, with no additional editing needed.`;

    case 'instagram':
      return `You are a social media expert specializing in Instagram caption writing.
      
Your task is to create engaging, visually-evocative Instagram captions based on the user's input.

Guidelines:
- Write captions that complement visual content
- Include relevant hashtags (separated from the main caption, 5-8 hashtags)
- Create content that encourages engagement (likes, comments, saves)
- Use appropriate emojis to enhance the message
- Create a conversational, authentic tone
- Include a call-to-action where appropriate
- Focus on storytelling and emotional connection

Format the response as:
[Main Caption]

.
.
.

[Hashtags]`;

    case 'facebook':
      return `You are a social media expert specializing in Facebook content.
      
Your task is to create engaging Facebook posts based on the user's input.

Guidelines:
- Write content optimized for the Facebook algorithm and user behavior
- Focus on creating conversation and community interaction
- Include questions or calls to action to boost engagement
- Keep posts concise but more detailed than Twitter (1-3 paragraphs ideal)
- Use minimal hashtags (0-2 maximum) and only when truly relevant
- Maintain a friendly, conversational tone
- Format with line breaks for readability
- Consider incorporating elements that encourage sharing

The content should be ready to post as-is, with no additional editing needed.`;

    case 'linkedin':
      return `You are a social media expert specializing in LinkedIn professional content.
      
Your task is to create engaging, professional LinkedIn posts based on the user's input.

Guidelines:
- Write content that demonstrates thought leadership and expertise
- Structure posts with short paragraphs and line breaks for readability
- Include a strong hook in the first 2-3 lines (before the "see more" cutoff)
- Maintain a professional yet conversational tone
- Include relevant hashtags (3-5) at the end of the post
- Focus on providing valuable insights, lessons, or perspectives
- Consider adding a call-to-action for engagement
- Aim for content that positions the user as knowledgeable in their field

The content should be ready to post as-is, with no additional editing needed.`;

    default:
      return `You are a social media expert.
      
Your task is to create engaging social media content based on the user's input.

Guidelines:
- Create content that's engaging and valuable to the audience
- Maintain a conversational, authentic tone
- Focus on clarity and conciseness
- Include calls to action when appropriate

The content should be ready to post as-is, with no additional editing needed.`;
  }
}
