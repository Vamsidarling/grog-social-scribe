
import React from 'react';
import { Button } from "@/components/ui/button";
import { User, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from './BackButton';
import ThemeToggle from './ThemeToggle';

/**
 * Header Component
 * 
 * Main navigation header that displays:
 * - Back button (when showBackButton is true)
 * - Application logo/title
 * - Theme toggle for switching between light and dark mode
 * - Authentication actions (sign in/up or profile)
 * 
 * @param {Object} props - Component properties
 * @param {boolean} props.isAuthenticated - Whether user is authenticated
 * @param {boolean} props.showBackButton - Whether to show the back button
 */
const Header: React.FC<HeaderProps> = ({ isAuthenticated, showBackButton = true }) => {
  return (
    <div className="flex justify-between items-center mb-8 flex-wrap gap-2">
      <div className="flex items-center gap-3">
        {showBackButton && <BackButton />}
        <h1 className="text-3xl md:text-4xl font-bold gradient-text">Social Media Scribe</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {isAuthenticated ? (
          <Link to="/profile">
            <Button variant="outline" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </Button>
          </Link>
        ) : (
          <>
            <Link to="/auth">
              <Button variant="outline" className="gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="default" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

interface HeaderProps {
  isAuthenticated: boolean;
  showBackButton?: boolean;
}

export default Header;
