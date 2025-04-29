
import { useState } from 'react';
import { toast } from "sonner";
import { generateContent } from '@/services/grogService';
import { supabase } from "@/integrations/supabase/client";

type GeneratedContent = Record<string, string | null>;

export const useContentGeneration = (isAuthenticated: boolean) => {
  const [userInput, setUserInput] = useState('');
  const [generatingPlatform, setGeneratingPlatform] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({
    twitter: null,
    instagram: null,
    facebook: null,
    linkedin: null,
  });

  const handleGenerate = async (platform: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to generate content", {
        description: "Sign in or create an account to start generating content",
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/auth"
        },
      });
      return;
    }

    if (!userInput.trim()) {
      toast.error("Please enter some content to generate from");
      return;
    }

    setGeneratingPlatform(platform);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to generate content");
        return;
      }

      const content = await generateContent({
        prompt: userInput,
        platform
      });
      
      if (content) {
        // Save to content history
        await supabase.from('content_history').insert({
          platform,
          prompt: userInput,
          generated_content: content,
          user_id: user.id
        });

        // Update UI
        setGeneratedContent(prev => ({
          ...prev,
          [platform]: content
        }));
      }
    } catch (error) {
      console.error(`Error generating ${platform} content:`, error);
      toast.error(`Failed to generate ${platform} content`);
    } finally {
      setGeneratingPlatform(null);
    }
  };

  const handleGenerateAll = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to generate content", {
        description: "Sign in or create an account to start generating content",
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/auth"
        },
      });
      return;
    }

    if (!userInput.trim()) {
      toast.error("Please enter some content to generate from");
      return;
    }

    setGeneratingPlatform('all');
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to generate content");
        return;
      }

      const platforms = ['twitter', 'instagram', 'facebook', 'linkedin'];
      const results = await Promise.all(
        platforms.map(async (platform) => {
          const content = await generateContent({
            prompt: userInput,
            platform
          });
          
          if (content) {
            // Save to content history
            await supabase.from('content_history').insert({
              platform,
              prompt: userInput,
              generated_content: content,
              user_id: user.id
            });
          }
          
          return { platform, content };
        })
      );
      
      const newContent: Record<string, string | null> = { ...generatedContent };
      results.forEach(({ platform, content }) => {
        newContent[platform] = content;
      });
      
      setGeneratedContent(newContent);
      toast.success("Generated content for all platforms!");
    } catch (error) {
      console.error("Error generating content for all platforms:", error);
      toast.error("Failed to generate content for some platforms");
    } finally {
      setGeneratingPlatform(null);
    }
  };

  return {
    userInput,
    setUserInput,
    generatingPlatform,
    generatedContent,
    handleGenerate,
    handleGenerateAll
  };
};
