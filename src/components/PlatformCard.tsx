
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, Copy, Share2, ExternalLink, Zap } from "lucide-react";
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
 * PlatformCard Component - Peaky Blinders Theme
 * 
 * Sophisticated card with vintage Birmingham aesthetics
 */
const PlatformCard: React.FC<PlatformCardProps> = ({ platform, content, isGenerating, onClick, isAuthenticated }) => {
  const [copied, setCopied] = React.useState(false);
  
  const platformConfigs = {
    twitter: {
      name: 'Twitter',
      subtitle: 'Sharp & Direct',
      icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
    },
    instagram: {
      name: 'Instagram',
      subtitle: 'Visual & Captivating',
      icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
    },
    facebook: {
      name: 'Facebook',
      subtitle: 'Professional & Detailed',
      icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
    },
    linkedin: {
      name: 'LinkedIn',
      subtitle: 'Business & Authority',
      icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" clipRule="evenodd"></path></svg>
    }
  };

  const config = platformConfigs[platform];

  const copyToClipboard = () => {
    if (!content) return;
    
    navigator.clipboard.writeText(content)
      .then(() => {
        setCopied(true);
        toast.success(`${config.name} content copied to your arsenal!`);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy content");
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
      toast.error("Join the family to generate content");
      return;
    }
    onClick();
  };

  return (
    <div className={cn(
      "peaky-card rounded-xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl group backdrop-blur-sm h-full flex flex-col"
    )}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-lg peaky-gradient text-peaky-dark shadow-lg group-hover:shadow-xl transition-all duration-300">
          {config.icon}
        </div>
        <div>
          <h3 className="text-xl font-playfair font-bold text-peaky-light">{config.name}</h3>
          <p className="text-sm text-muted-elegant font-source italic">{config.subtitle}</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="vintage-border rounded-lg p-6 min-h-[180px] mb-6 bg-peaky-charcoal/20 backdrop-blur-sm flex-grow">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="w-10 h-10 border-3 border-peaky-gold border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-muted-elegant font-source">Crafting your message...</span>
          </div>
        ) : content ? (
          <div className="text-sm text-peaky-light leading-relaxed whitespace-pre-wrap font-source">
            {content}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <Zap className="h-8 w-8 text-peaky-gold/50" />
            <span className="text-muted-elegant text-sm font-source">
              {isAuthenticated ? `Generate ${config.name} content` : "Join the family to generate content"}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        <Button 
          onClick={handleGenerateClick} 
          disabled={isGenerating}
          className="flex-1 peaky-button font-source font-semibold"
        >
          {isGenerating ? "Crafting..." : "Generate"}
        </Button>
        
        {content && !isGenerating && (
          <>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={copyToClipboard}
              className="vintage-border bg-transparent hover:bg-peaky-ash/30"
            >
              {copied ? <Check className="h-4 w-4 text-peaky-gold" /> : <Copy className="h-4 w-4 text-peaky-light" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              className="vintage-border bg-transparent hover:bg-peaky-ash/30"
            >
              <ExternalLink className="h-4 w-4 text-peaky-light" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlatformCard;
