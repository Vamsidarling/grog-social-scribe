
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import PlatformCard from '@/components/PlatformCard';
import { generateContent } from '@/services/grogService';
import AuthLayout from '@/layouts/AuthLayout';
import { supabase } from "@/integrations/supabase/client";

const platforms = ['twitter', 'instagram', 'facebook', 'linkedin'];

const Index = () => {
  const [userInput, setUserInput] = useState('');
  const [generatingPlatform, setGeneratingPlatform] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<Record<string, string | null>>({
    twitter: null,
    instagram: null,
    facebook: null,
    linkedin: null,
  });

  const handleGenerate = async (platform: string) => {
    if (!userInput.trim()) {
      toast.error("Please enter some content to generate from");
      return;
    }

    setGeneratingPlatform(platform);
    
    try {
      const content = await generateContent({
        prompt: userInput,
        platform
      });
      
      if (content) {
        // Save to content history
        await supabase.from('content_history').insert({
          platform,
          prompt: userInput,
          generated_content: content
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
    if (!userInput.trim()) {
      toast.error("Please enter some content to generate from");
      return;
    }

    setGeneratingPlatform('all');
    
    try {
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
              generated_content: content
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

  return (
    <AuthLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Social Media Scribe</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter your content idea below and generate tailored posts for any social platform
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-8">
          <div className="space-y-4">
            <label htmlFor="content-idea" className="block text-lg font-medium">
              What would you like to create content about?
            </label>
            <Textarea
              id="content-idea"
              placeholder="Describe your product, event, announcement, or any topic you want to create social media posts about..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="min-h-32"
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleGenerateAll} 
                className="shiny-button text-white"
                disabled={generatingPlatform !== null}
              >
                {generatingPlatform === 'all' ? "Generating..." : "Generate All Platforms"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {platforms.map((platform) => (
            <PlatformCard
              key={platform}
              platform={platform}
              content={generatedContent[platform]}
              isGenerating={generatingPlatform === platform || generatingPlatform === 'all'}
              onClick={() => handleGenerate(platform)}
            />
          ))}
        </div>
      </div>
    </AuthLayout>
  );
};

export default Index;
