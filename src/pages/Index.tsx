
import React from 'react';
import PlatformCard from '@/components/PlatformCard';
import Header from '@/components/Header';
import ContentForm from '@/components/ContentForm';
import { useAuth } from '@/hooks/useAuth';
import { useContentGeneration } from '@/hooks/useContentGeneration';

const platforms = ['twitter', 'instagram', 'facebook', 'linkedin'];

/**
 * Index Page Component - Peaky Blinders Theme
 * 
 * Dark, sophisticated home page with vintage 1920s aesthetics
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
    <div className="min-h-screen bg-peaky-dark bg-peaky-pattern">
      <div className="container mx-auto px-4 py-8">
        <Header isAuthenticated={isAuthenticated} showBackButton={false} />
        
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-playfair font-bold text-peaky-light mb-6 leading-tight">
              "By order of the{' '}
              <span className="peaky-text-gradient">Peaky Blinders</span>
              "
            </h2>
            <p className="text-lg md:text-xl text-muted-elegant font-source max-w-3xl mx-auto leading-relaxed">
              Command your social presence with the precision and authority of Birmingham's finest. 
              Transform your thoughts into powerful content across all platforms.
            </p>
          </div>
        </div>
        
        <ContentForm 
          userInput={userInput}
          setUserInput={setUserInput}
          handleGenerateAll={handleGenerateAll}
          isGenerating={generatingPlatform === 'all'}
          isAuthenticated={isAuthenticated}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 animate-slide-up">
          {platforms.map((platform, index) => (
            <div 
              key={platform}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <PlatformCard
                platform={platform}
                content={generatedContent[platform]}
                isGenerating={generatingPlatform === platform || generatingPlatform === 'all'}
                onClick={() => handleGenerate(platform)}
                isAuthenticated={isAuthenticated}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
