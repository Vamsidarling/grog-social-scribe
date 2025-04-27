
import { toast } from "sonner";

const EDGE_FUNCTION_URL = "https://pliswlanuinhtllduomm.supabase.co/functions/v1/generate-content";

export const generateContent = async ({ prompt, platform }: { prompt: string, platform: string }): Promise<string | null> => {
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Using the Supabase anon key directly
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsaXN3bGFudWluaHRsbGR1b21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NjcxNzQsImV4cCI6MjA2MTM0MzE3NH0.hgUZVMSIHo31Ij5pQfTz-hankSjcWsPPZiSlWaKJf00`
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
