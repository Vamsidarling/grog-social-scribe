
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

/**
 * ThemeToggle Component
 * 
 * A visually enhanced button that toggles between light and dark mode.
 * Features smooth animations and icon transitions.
 * Uses the useTheme hook to access and change the current theme.
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 border border-input bg-background relative overflow-hidden transition-all duration-300 hover:scale-105"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="sr-only">{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
      
      <div className="transition-all duration-300 transform">
        {theme === 'dark' ? (
          <Moon className="h-5 w-5 transition-all" />
        ) : (
          <Sun className="h-5 w-5 transition-all" />
        )}
      </div>
    </Button>
  );
};

export default ThemeToggle;
