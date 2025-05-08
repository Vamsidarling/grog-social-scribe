
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

/**
 * ContentForm Component
 * 
 * Form for inputting content ideas and generating social media posts.
 * Provides a text area for user input and a button to trigger content generation.
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
            disabled={isGenerating === true || isGenerating === 'all'}
          >
            {isGenerating === 'all' ? "Generating..." : "Generate All Platforms"}
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
