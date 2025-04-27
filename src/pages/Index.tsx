
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import ApiKeyForm from '@/components/ApiKeyForm';
import PlatformCard from '@/components/PlatformCard';
import { generateContent } from '@/services/grogService';
import { supabase } from "@/integrations/supabase/client";

const platforms = ['twitter', 'instagram', 'facebook', 'linkedin'];

const Index = () => {
  // Since we're now using Supabase, we can assume we're always connected
  const [isConnected, setIsConnected] = useState(true);
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
      
      // Update the generated content for the specific platform
      setGeneratedContent(prev => ({
        ...prev,
        [platform]: content
      }));
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

    // Start with all platforms in "generating" state
    setGeneratingPlatform('all');
    
    try {
      // Generate content for each platform
      const results = await Promise.all(
        platforms.map(async (platform) => {
          const content = await generateContent({
            prompt: userInput,
            platform
          });
          return { platform, content };
        })
      );
      
      // Update all generated content at once
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

  // Since we're now using Supabase backend, we don't need the API key form anymore
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
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

      <div className="mb-4">
        <h2 className="text-2xl font-semibold gradient-text">Generated Content</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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
  );
};

export default Index;
