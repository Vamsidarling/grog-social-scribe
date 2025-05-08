
import React from 'react';
import PlatformCard from '@/components/PlatformCard';
import Header from '@/components/Header';
import ContentForm from '@/components/ContentForm';
import { useAuth } from '@/hooks/useAuth';
import { useContentGeneration } from '@/hooks/useContentGeneration';

/**
 * List of supported social media platforms
 */
const platforms = ['twitter', 'instagram', 'facebook', 'linkedin'];

/**
 * Index Page Component
 * 
 * Home page of the application that allows users to:
 * - Enter content ideas
 * - Generate tailored posts for different social platforms
 * - View and copy generated content
 * 
 * Uses custom hooks for authentication and content generation.
 */
const Index = () => {
  const { isAuthenticated } = useAuth();
  const {
    userInput,
    setUserInput,
    generatingPlatform,
    generatedContent,
    handleGenerate,
    handleGenerateAll
  } = useContentGeneration(isAuthenticated);

  return (
    <div className="container mx-auto px-4 py-8">
      <Header isAuthenticated={isAuthenticated} showBackButton={false} />
      
      <div className="text-center mb-8">
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Enter your content idea below and generate tailored posts for any social platform
        </p>
      </div>
      
      <ContentForm 
        userInput={userInput}
        setUserInput={setUserInput}
        handleGenerateAll={handleGenerateAll}
        isGenerating={generatingPlatform === 'all'}
        isAuthenticated={isAuthenticated}
      />

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
