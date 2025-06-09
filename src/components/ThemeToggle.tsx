
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

/**
 * ThemeToggle Component - Peaky Blinders Theme
 * 
 * Sophisticated theme toggle with vintage styling
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-lg w-12 h-12 vintage-border bg-transparent hover:bg-peaky-ash/30 relative overflow-hidden transition-all duration-300 hover:scale-105 group"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="sr-only">{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
      
      <div className="transition-all duration-300 transform group-hover:scale-110">
        {theme === 'dark' ? (
          <Moon className="h-5 w-5 text-peaky-gold transition-all" />
        ) : (
          <Sun className="h-5 w-5 text-peaky-gold transition-all" />
        )}
      </div>
    </Button>
  );
};

export default ThemeToggle;
