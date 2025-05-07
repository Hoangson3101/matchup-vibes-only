
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User } from '@/types/User';

// Sample likes data
const dummyLikes: User[] = [
  {
    id: '5',
    name: 'Tuấn',
    birthdate: '1997-07-10',
    gender: 'Nam',
    bio: 'Yêu âm nhạc và cafe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: '6',
    name: 'Phương',
    birthdate: '1999-02-15',
    gender: 'Nữ',
    bio: 'Thích du lịch và khám phá',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: '7',
    name: 'Hùng',
    birthdate: '1998-05-20',
    gender: 'Nam',
    bio: 'Mê thể thao và phiêu lưu',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1448&q=80',
  },
];

const Likes = () => {
  const [likes, setLikes] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch likes from an API
    setTimeout(() => {
      setLikes(dummyLikes);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="bg-background min-h-screen pt-16 pb-20">
      <header className="matchup-header">
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft size={20} />
            </Link>
          </Button>

          <h1 className="text-xl font-bold">Ai thích bạn?</h1>

          <div className="w-8"></div>
        </div>
      </header>

      <div className="container px-4 pt-4">
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-matchup-purple rounded-full border-t-transparent animate-spin mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Đang tải...</p>
            </div>
          </div>
        ) : likes.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 h-[60vh]">
            <div className="w-24 h-24 rounded-full bg-matchup-purple/10 flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-matchup-purple">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-center">Chưa có ai thích bạn</h2>
            <p className="text-muted-foreground text-center mt-2">
              Hãy tiếp tục swipe để tìm những người phù hợp!
            </p>
            <Button asChild className="mt-6 bg-matchup-purple hover:bg-matchup-purple-dark">
              <Link to="/">Quay lại trang chủ</Link>
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">
              {likes.length} người đã thích bạn
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {likes.map((user) => (
                <Link
                  key={user.id}
                  to={`/like-detail/${user.id}`}
                  className="block"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={user.avatar || 'https://via.placeholder.com/300?text=User'}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                        <h3 className="text-white font-bold">{user.name}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Likes;
