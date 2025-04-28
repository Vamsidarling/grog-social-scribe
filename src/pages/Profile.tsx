
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, History, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from 'date-fns';
import { toast } from "sonner";

type ContentHistory = {
  id: string;
  platform: string;
  prompt: string;
  generated_content: string;
  created_at: string;
};

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [history, setHistory] = useState<ContentHistory[]>([]);

  useEffect(() => {
    fetchUserProfile();
    fetchContentHistory();
  }, []);

  const fetchUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();
      
      setUsername(profile?.username || user.email);
    }
  };

  const fetchContentHistory = async () => {
    const { data: contentHistory, error } = await supabase
      .from('content_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch content history');
      return;
    }

    setHistory(contentHistory);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <User className="h-8 w-8" />
            <h1 className="text-3xl font-bold">{username}</h1>
          </div>
          <Button onClick={handleSignOut} variant="destructive">
            <LogOut className="mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="bg-card rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <History className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Content History</h2>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Platform</TableHead>
                  <TableHead>Prompt</TableHead>
                  <TableHead>Generated Content</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="capitalize">{item.platform}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{item.prompt}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{item.generated_content}</TableCell>
                    <TableCell>{formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}</TableCell>
                  </TableRow>
                ))}
                {history.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      No content generation history yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
