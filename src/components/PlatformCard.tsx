
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, Copy, Share2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PlatformCardProps {
  platform: string;
  content: string | null;
  isGenerating: boolean;
  onClick: () => void;
  isAuthenticated: boolean;
}

/**
 * PlatformCard Component
 * 
 * Clean and modern card for each social media platform with improved styling
 */
const PlatformCard: React.FC<PlatformCardProps> = ({ platform, content, isGenerating, onClick, isAuthenticated }) => {
  const [copied, setCopied] = React.useState(false);
  
  const platformConfigs = {
    twitter: {
      name: 'Twitter',
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-200 dark:border-blue-800',
      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
    },
    instagram: {
      name: 'Instagram',
      color: 'from-pink-500 to-rose-500',
      borderColor: 'border-pink-200 dark:border-pink-800',
      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
    },
    facebook: {
      name: 'Facebook',
      color: 'from-blue-600 to-blue-700',
      borderColor: 'border-blue-200 dark:border-blue-800',
      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
    },
    linkedin: {
      name: 'LinkedIn',
      color: 'from-blue-700 to-blue-800',
      borderColor: 'border-blue-200 dark:border-blue-800',
      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" clipRule="evenodd"></path></svg>
    }
  };

  const config = platformConfigs[platform];

  const copyToClipboard = () => {
    if (!content) return;
    
    navigator.clipboard.writeText(content)
      .then(() => {
        setCopied(true);
        toast.success(`${config.name} content copied!`);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy to clipboard");
      });
  };

  const handleShare = () => {
    if (!content) return;
    const platforms = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(content)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?summary=${encodeURIComponent(content)}`,
      instagram: null
    };
    
    const url = platforms[platform];
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.info("Copy the content and post manually to Instagram");
    }
  };

  const handleGenerateClick = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to generate content");
      return;
    }
    onClick();
  };

  return (
    <div className={cn(
      "bg-white dark:bg-gray-900/50 border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      config.borderColor
    )}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("p-2 rounded-xl bg-gradient-to-r text-white shadow-lg", config.color)}>
          {config.icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{config.name}</h3>
      </div>

      {/* Content Area */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 min-h-[140px] mb-4 border border-gray-200 dark:border-gray-700">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Creating content...</span>
          </div>
        ) : content ? (
          <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
            {content}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-center">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {isAuthenticated ? `Generate ${config.name} content` : "Sign in to generate content"}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button 
          onClick={handleGenerateClick} 
          disabled={isGenerating}
          className="flex-1 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all duration-200"
        >
          {isGenerating ? "Generating..." : "Generate"}
        </Button>
        
        {content && !isGenerating && (
          <>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={copyToClipboard}
              className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlatformCard;
