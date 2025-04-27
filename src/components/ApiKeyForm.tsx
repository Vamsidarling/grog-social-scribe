
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { testConnection, setApiKey, getApiKey } from "@/services/grogService";

interface ApiKeyFormProps {
  onSuccess: () => void;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onSuccess }) => {
  const [apiKey, setApiKeyState] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTesting(true);
    
    // Save the API key
    setApiKey(apiKey);
    
    // Test the connection
    const success = await testConnection();
    
    setIsTesting(false);
    if (success) {
      onSuccess();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="gradient-text">Connect to Grog LLM</CardTitle>
        <CardDescription>
          Enter your Grog API key to start generating social media content
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium">
                API Key
              </label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Grog API key"
                value={apiKey}
                onChange={(e) => setApiKeyState(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full shiny-button text-white"
            disabled={isTesting || !apiKey}
          >
            {isTesting ? "Testing Connection..." : "Connect"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ApiKeyForm;
