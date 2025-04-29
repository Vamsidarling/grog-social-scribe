
import React from 'react';
import { Button } from "@/components/ui/button";
import { User, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from './BackButton';

interface HeaderProps {
  isAuthenticated: boolean;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, showBackButton = true }) => {
  return (
    <div className="flex justify-between items-center mb-8 flex-wrap gap-2">
      <div className="flex items-center gap-3">
        {showBackButton && <BackButton />}
        <h1 className="text-3xl md:text-4xl font-bold gradient-text">Social Media Scribe</h1>
      </div>
      <div className="flex items-center gap-2">
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

export default Header;
