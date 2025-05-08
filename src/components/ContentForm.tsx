
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from 'lucide-react';

/**
 * ContentForm Component
 * 
 * Enhanced form for inputting content ideas and generating social media posts.
 * Features a visually appealing textarea with better styling and an animated submit button.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.userInput - Current user input value
 * @param {function} props.setUserInput - Function to update user input
 * @param {function} props.handleGenerateAll - Function to generate content for all platforms
 * @param {string|boolean} props.isGenerating - Flag indicating if content is being generated
 * @param {boolean} props.isAuthenticated - Whether user is authenticated
 */
const ContentForm: React.FC<ContentFormProps> = ({
  userInput,
  setUserInput,
  handleGenerateAll,
  isGenerating,
  isAuthenticated
}) => {
  return (
    <div className="max-w-3xl mx-auto mb-8 transform transition-all duration-300 hover:scale-[1.01]">
      <div className="space-y-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border shadow-sm">
        <label htmlFor="content-idea" className="block text-lg font-medium text-gray-700 dark:text-gray-200">
          What would you like to create content about?
        </label>
        <Textarea
          id="content-idea"
          placeholder="Describe your product, event, announcement, or any topic you want to create social media posts about..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="min-h-32 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
        <div className="flex justify-end">
          <Button 
            onClick={handleGenerateAll} 
            className="shiny-button text-white gap-2"
            disabled={isGenerating === true || isGenerating === 'all'}
          >
            {isGenerating === 'all' ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate All Platforms</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ContentFormProps {
  userInput: string;
  setUserInput: (input: string) => void;
  handleGenerateAll: () => void;
  isGenerating: string | boolean;
  isAuthenticated: boolean;
}

export default ContentForm;
