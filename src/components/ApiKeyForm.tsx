
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ApiKeyForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  // Automatically proceed since we don't need API key input anymore
  React.useEffect(() => {
    onSuccess();
  }, [onSuccess]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="gradient-text">Welcome to Social Media Scribe</CardTitle>
        <CardDescription>
          Generate engaging social media content with AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">
          Loading your content generation workspace...
        </p>
      </CardContent>
    </Card>
  );
};

export default ApiKeyForm;
