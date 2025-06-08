
import React from 'react';
import PlatformCard from '@/components/PlatformCard';
import Header from '@/components/Header';
import ContentForm from '@/components/ContentForm';
import { useAuth } from '@/hooks/useAuth';
import { useContentGeneration } from '@/hooks/useContentGeneration';

const platforms = ['twitter', 'instagram', 'facebook', 'linkedin'];

/**
 * Index Page Component
 * 
 * Clean and organized home page with improved layout
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Header isAuthenticated={isAuthenticated} showBackButton={false} />
        
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into engaging social media content across all platforms
          </h2>
        </div>
        
        <ContentForm 
          userInput={userInput}
          setUserInput={setUserInput}
          handleGenerateAll={handleGenerateAll}
          isGenerating={generatingPlatform === 'all'}
          isAuthenticated={isAuthenticated}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
    </div>
  );
};

export default Index;
