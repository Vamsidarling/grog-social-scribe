import { toast } from "sonner";

const EDGE_FUNCTION_URL = "https://your-project-ref.supabase.co/functions/v1/generate-content";

export const generateContent = async ({ prompt, platform }: { prompt: string, platform: string }): Promise<string | null> => {
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add the anon key from your Supabase project
        "Authorization": `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        prompt,
        platform
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Content generation error:", errorData);
      toast.error(`Failed to generate content: ${errorData.error || "Unknown error"}`);
      return null;
    }

    const data = await response.json();
    
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

// Remove the old API key related functions since we're not using them anymore
