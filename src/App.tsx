
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AuthLayout from "./layouts/AuthLayout";
import Profile from "./pages/Profile";

/**
 * Create a new QueryClient instance for React Query
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    },
  },
});

/**
 * App Component
 * 
 * Root component of the application that sets up:
 * - React Query for data fetching with optimized configuration
 * - Toast notifications with enhanced styling
 * - Routing with React Router and page transitions
 * - Tooltip provider for UI components
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" closeButton theme="system" />
      <BrowserRouter>
        <main className="min-h-screen pt-4 pb-12 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<AuthLayout><Profile /></AuthLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
