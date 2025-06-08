
import React from 'react';
import { Button } from "@/components/ui/button";
import { User, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from './BackButton';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  isAuthenticated: boolean;
  showBackButton?: boolean;
}

/**
 * Header Component
 * 
 * Clean and professional header with improved spacing and styling
 */
const Header: React.FC<HeaderProps> = ({ isAuthenticated, showBackButton = true }) => {
  const isIndexPage = window.location.pathname === '/' || window.location.pathname === '';
  const shouldShowBackButton = showBackButton && !isIndexPage;

  return (
    <header className="mb-8">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {shouldShowBackButton && <BackButton />}
            <Link to="/" className="no-underline">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                Social Media Scribe
              </h1>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <Link to="/profile">
                <Button variant="outline" className="gap-2 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
            ) : (
              <div className="flex gap-2">
                <Link to="/auth">
                  <Button variant="outline" className="gap-2 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="gap-2 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all duration-200 shadow-lg">
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
