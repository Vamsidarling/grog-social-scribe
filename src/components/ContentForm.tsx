
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Lightbulb } from 'lucide-react';

interface ContentFormProps {
  userInput: string;
  setUserInput: (input: string) => void;
  handleGenerateAll: () => void;
  isGenerating: string | boolean;
  isAuthenticated: boolean;
}

/**
 * ContentForm Component
 * 
 * Clean and modern form for content input with improved styling
 */
const ContentForm: React.FC<ContentFormProps> = ({
  userInput,
  setUserInput,
  handleGenerateAll,
  isGenerating,
  isAuthenticated
}) => {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-white dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lightbulb className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create Your Content
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Describe your topic and we'll generate engaging posts for all platforms
          </p>
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          <Textarea
            placeholder="Tell us about your product launch, event announcement, or any topic you want to share on social media..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="min-h-32 text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            rows={4}
          />
          
          <div className="flex justify-center">
            <Button 
              onClick={handleGenerateAll} 
              disabled={!userInput.trim() || isGenerating === true || isGenerating === 'all'}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 text-lg font-medium rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isGenerating === 'all' ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Content...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Generate All Platforms</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
            <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
              <strong>Sign in</strong> to save your content history and access all features
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentForm;
