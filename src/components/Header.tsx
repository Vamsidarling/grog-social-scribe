
import React from 'react';
import { Button } from "@/components/ui/button";
import { User, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from './BackButton';
import ThemeToggle from './ThemeToggle';

/**
 * Header Component
 * 
 * Enhanced main navigation header that displays:
 * - Back button (when showBackButton is true and not on index page)
 * - Application logo/title with gradient text effect
 * - Theme toggle for switching between light and dark mode
 * - Authentication actions (sign in/up or profile) with improved styling
 * 
 * @param {Object} props - Component properties
 * @param {boolean} props.isAuthenticated - Whether user is authenticated
 * @param {boolean} props.showBackButton - Whether to show the back button
 */
const Header: React.FC<HeaderProps> = ({ isAuthenticated, showBackButton = true }) => {
  const isIndexPage = window.location.pathname === '/' || window.location.pathname === '';
  const shouldShowBackButton = showBackButton && !isIndexPage;

  return (
    <header className="py-4 px-2 mb-8 backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto flex justify-between items-center flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {shouldShowBackButton && <BackButton />}
          <Link to="/" className="no-underline">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text transition-all duration-300 hover:scale-105">
              Social Media Scribe
            </h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <Link to="/profile">
              <Button variant="outline" className="gap-2 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700">
                <User className="h-4 w-4" />
                Profile
              </Button>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link to="/auth">
                <Button variant="outline" className="gap-2 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="default" className="gap-2 shiny-button">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

interface HeaderProps {
  isAuthenticated: boolean;
  showBackButton?: boolean;
}

export default Header;
