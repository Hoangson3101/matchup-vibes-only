
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, UserX, Unlock } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface BlockedUser {
  id: string;
  name: string;
  avatar: string;
}

// Sample blocked users data
const dummyBlockedUsers: BlockedUser[] = [
  {
    id: '1',
    name: 'Minh Tuấn',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: '2',
    name: 'Thùy Linh',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
];

const BlockedUsers = () => {
  const navigate = useNavigate();
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch blocked users from an API
    setTimeout(() => {
      setBlockedUsers(dummyBlockedUsers);
      setLoading(false);
    }, 500);
  }, []);

  const handleUnblock = (userId: string, userName: string) => {
    setBlockedUsers(prev => prev.filter(user => user.id !== userId));
    toast.success(`Đã bỏ chặn ${userName}`);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/settings')}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">Danh sách người bị chặn</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary rounded-full border-t-transparent animate-spin mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Đang tải...</p>
          </div>
        </div>
      ) : blockedUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 h-[60vh]">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <UserX size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">Chưa chặn ai</h3>
          <p className="text-muted-foreground text-center">
            Danh sách người bị chặn sẽ hiển thị tại đây
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {blockedUsers.map((user) => (
            <Card key={user.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">Đã bị chặn</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUnblock(user.id, user.name)}
                  className="flex items-center gap-2"
                >
                  <Unlock size={16} />
                  Bỏ chặn
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlockedUsers;
