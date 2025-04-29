
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

const PlatformCard: React.FC<PlatformCardProps> = ({ platform, content, isGenerating, onClick, isAuthenticated }) => {
  const [copied, setCopied] = React.useState(false);
  
  const platformConfigs = {
    twitter: {
      color: 'border-social-twitter',
      url: 'https://twitter.com/intent/tweet?text=',
      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
    },
    instagram: {
      color: 'border-social-instagram',
      url: 'https://www.instagram.com/',
      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
    },
    facebook: {
      color: 'border-social-facebook',
      url: 'https://www.facebook.com/sharer/sharer.php?u=',
      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
    },
    linkedin: {
      color: 'border-social-linkedin',
      url: 'https://www.linkedin.com/sharing/share-offsite/?url=',
      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" clipRule="evenodd"></path></svg>
    }
  };

  const config = platformConfigs[platform];

  const copyToClipboard = () => {
    if (!content) return;
    
    navigator.clipboard.writeText(content)
      .then(() => {
        setCopied(true);
        toast.success(`Copied ${platform} content to clipboard!`);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast.error("Failed to copy to clipboard");
      });
  };

  const handleShare = () => {
    if (!content) return;
    const url = config.url + encodeURIComponent(content);
    window.open(url, '_blank');
  };

  const handlePostToPlatform = () => {
    if (!content) return;
    
    // Different platforms have different sharing mechanisms
    let url;
    switch(platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(content)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(content)}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct posting API, so we'll just show a message
        toast.info("Instagram doesn't support direct posting. Copy the content and post manually.");
        return;
    }
    
    window.open(url, '_blank');
    toast.success(`Opening ${platform} to post your content!`);
  };
  
  const formatPlatformName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  
  const getBgColor = (platform: string): string => {
    switch(platform) {
      case 'twitter': return 'bg-social-twitter';
      case 'instagram': return 'bg-social-instagram';
      case 'facebook': return 'bg-social-facebook';
      case 'linkedin': return 'bg-social-linkedin';
      default: return 'bg-gray-500';
    }
  };

  const handleGenerateClick = () => {
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
    
    onClick();
  };

  return (
    <div className={cn("platform-card animate-fade-in p-4", config.color)}>
      <div className="flex items-center mb-3 gap-2">
        <div className={`p-1.5 rounded-full ${getBgColor(platform)} text-white`}>
          {config.icon}
        </div>
        <h3 className="text-base font-semibold">{formatPlatformName(platform)}</h3>
      </div>

      <div className="content-card min-h-[120px] max-h-[150px] relative overflow-y-auto mb-3">
        {isGenerating ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse">Generating content...</div>
          </div>
        ) : content ? (
          <div className="whitespace-pre-wrap text-sm">{content}</div>
        ) : (
          <div className="text-muted-foreground text-center h-full flex items-center justify-center text-sm">
            {isAuthenticated ? (
              `Click "Generate" for ${formatPlatformName(platform)} content`
            ) : (
              "Sign in to generate content"
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleGenerateClick} 
          disabled={isGenerating}
          className="flex-1 text-xs"
        >
          Generate
        </Button>
        
        {content && (
          <>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyToClipboard}
              disabled={isGenerating}
              className="text-xs"
            >
              {copied ? (
                <Check className="h-3 w-3 mr-1" />
              ) : (
                <Copy className="h-3 w-3 mr-1" />
              )}
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              disabled={isGenerating}
              className="text-xs"
            >
              <Share2 className="h-3 w-3" />
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handlePostToPlatform}
              disabled={isGenerating}
              className={`text-xs text-white ${getBgColor(platform)}`}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Post to {formatPlatformName(platform)}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlatformCard;
