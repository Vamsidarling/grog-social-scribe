
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, PenTool, Quote } from 'lucide-react';

interface ContentFormProps {
  userInput: string;
  setUserInput: (input: string) => void;
  handleGenerateAll: () => void;
  isGenerating: string | boolean;
  isAuthenticated: boolean;
}

/**
 * ContentForm Component - Peaky Blinders Theme
 * 
 * Sophisticated form with vintage Birmingham aesthetics
 */
const ContentForm: React.FC<ContentFormProps> = ({
  userInput,
  setUserInput,
  handleGenerateAll,
  isGenerating,
  isAuthenticated
}) => {
  return (
    <div className="max-w-5xl mx-auto mb-16">
      <div className="peaky-card rounded-xl p-10 backdrop-blur-sm animate-scale-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <PenTool className="h-7 w-7 text-peaky-gold" />
            <h2 className="text-3xl font-playfair font-bold text-peaky-light">
              Craft Your Message
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-elegant">
            <Quote className="h-4 w-4 text-peaky-gold" />
            <p className="font-source text-lg italic">
              "In the bleak midwinter, we write our own stories"
            </p>
            <Quote className="h-4 w-4 text-peaky-gold rotate-180" />
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-6">
          <div className="relative">
            <Textarea
              placeholder="Share your vision, announce your triumph, or declare your intentions... What story shall we tell today?"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="min-h-40 text-lg font-source vintage-border bg-peaky-charcoal/30 text-peaky-light placeholder:text-muted-elegant focus:ring-2 focus:ring-peaky-gold/50 transition-all resize-none backdrop-blur-sm"
              rows={5}
            />
            <div className="absolute bottom-4 right-4 text-xs text-muted-elegant font-source">
              {userInput.length} characters
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleGenerateAll} 
              disabled={!userInput.trim() || isGenerating === true || isGenerating === 'all'}
              className="peaky-button px-12 py-4 text-xl font-playfair font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isGenerating === 'all' ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-peaky-dark border-t-transparent rounded-full animate-spin"></div>
                  <span>Crafting Content...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 group-hover:animate-pulse" />
                  <span>Command All Platforms</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="mt-8 p-6 vintage-border bg-peaky-bronze/10 rounded-lg backdrop-blur-sm">
            <p className="text-center text-peaky-gold font-source font-medium">
              <strong>Join the family</strong> to preserve your content history and unlock the full power of the Peaky Blinders
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentForm;
