
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

/**
 * BackButton Component
 * 
 * An enhanced circular button that navigates to the previous page in the browser history.
 * Features hover effects and smooth transitions.
 * Uses React Router's useNavigate hook to handle navigation.
 */
const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button 
      variant="ghost" 
      className="p-1 h-9 w-9 rounded-full hover:bg-slate-100 hover:scale-105 transition-all dark:hover:bg-slate-800" 
      onClick={() => navigate(-1)}
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
