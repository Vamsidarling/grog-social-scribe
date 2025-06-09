
import React from 'react';
import { Button } from "@/components/ui/button";
import { User, LogIn, UserPlus, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from './BackButton';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  isAuthenticated: boolean;
  showBackButton?: boolean;
}

/**
 * Header Component - Peaky Blinders Theme
 * 
 * Sophisticated header with vintage Birmingham aesthetics
 */
const Header: React.FC<HeaderProps> = ({ isAuthenticated, showBackButton = true }) => {
  const isIndexPage = window.location.pathname === '/' || window.location.pathname === '';
  const shouldShowBackButton = showBackButton && !isIndexPage;

  return (
    <header className="mb-12">
      <div className="peaky-card rounded-lg p-8 backdrop-blur-sm animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            {shouldShowBackButton && <BackButton />}
            <Link to="/" className="no-underline group">
              <div className="flex items-center gap-3">
                <Crown className="h-8 w-8 text-peaky-gold group-hover:animate-vintage-glow transition-all duration-300" />
                <h1 className="text-3xl md:text-4xl font-playfair font-bold peaky-text-gradient hover:scale-105 transition-transform duration-300">
                  Social Media Scribe
                </h1>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <Link to="/profile">
                <Button 
                  variant="outline" 
                  className="gap-2 vintage-border bg-transparent text-peaky-light hover:bg-peaky-ash/50 transition-all duration-300 font-source"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
            ) : (
              <div className="flex gap-3">
                <Link to="/auth">
                  <Button 
                    variant="outline" 
                    className="gap-2 vintage-border bg-transparent text-peaky-light hover:bg-peaky-ash/50 font-source"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="gap-2 peaky-button font-source font-semibold">
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
