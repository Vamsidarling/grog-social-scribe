
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import PlatformCard from '@/components/PlatformCard';
import { generateContent } from '@/services/grogService';
import { supabase } from "@/integrations/supabase/client";
import { User, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  }

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-2">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text">Social Media Scribe</h1>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Link to="/profile">
              <Button variant="outline" className="gap-2">
                <User className="h-4 w-4" />
                Profile
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="default" className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      
      <div className="text-center mb-8">
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
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
              disabled={generatingPlatform !== null || !isAuthenticated}
            >
              {generatingPlatform === 'all' ? "Generating..." : "Generate All Platforms"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {platforms.map((platform) => (
          <PlatformCard
            key={platform}
            platform={platform}
            content={generatedContent[platform]}
            isGenerating={generatingPlatform === platform || generatingPlatform === 'all'}
            onClick={() => handleGenerate(platform)}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
