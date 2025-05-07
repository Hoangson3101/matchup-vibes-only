
import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, X, MoreVertical } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User } from '@/types/User';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Extended sample likes data with more details
const detailedLikes: Record<string, User> = {
  '5': {
    id: '5',
    name: 'Tuấn',
    birthdate: '1997-07-10',
    gender: 'Nam',
    bio: 'Yêu âm nhạc và cafe. Thích khám phá những địa điểm mới và gặp gỡ những con người thú vị. Đam mê du lịch và chụp ảnh phong cảnh.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ]
  },
  '6': {
    id: '6',
    name: 'Phương',
    birthdate: '1999-02-15',
    gender: 'Nữ',
    bio: 'Thích du lịch và khám phá. Yêu động vật, đặc biệt là chó. Đam mê nấu ăn và thường tìm kiếm công thức mới để thử.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1484329081568-bed9ba42793e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ]
  },
  '7': {
    id: '7',
    name: 'Hùng',
    birthdate: '1998-05-20',
    gender: 'Nam',
    bio: 'Mê thể thao và phiêu lưu. Thích leo núi vào cuối tuần. Làm việc trong ngành công nghệ và đam mê đọc sách về khoa học.',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1448&q=80',
    photos: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1448&q=80',
      'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
      'https://images.unsplash.com/photo-1506902550945-7645732aaae8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=724&q=80'
    ]
  }
};

const LikeDetail = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (profileId && detailedLikes[profileId]) {
      setUser(detailedLikes[profileId]);
    } else {
      // Navigate back if profile not found
      navigate('/likes');
    }
  }, [profileId, navigate]);

  const handlePreviousPhoto = () => {
    if (user && user.photos) {
      setCurrentPhotoIndex((prev) => (prev === 0 ? user.photos!.length - 1 : prev - 1));
    }
  };

  const handleNextPhoto = () => {
    if (user && user.photos) {
      setCurrentPhotoIndex((prev) => (prev === user.photos!.length - 1 ? 0 : prev + 1));
    }
  };

  const handleLike = () => {
    toast.success(`Bạn đã thích ${user?.name}!`);
    toast.success(`Chúc mừng! Bạn và ${user?.name} đã match!`);
    navigate('/messages');
  };

  const handleDislike = () => {
    toast.info(`Bạn đã bỏ qua ${user?.name}`);
    navigate('/likes');
  };

  const handleBlock = () => {
    toast.success(`Đã chặn ${user?.name}`);
    navigate('/likes');
  };

  const handleReport = () => {
    toast.success(`Đã báo cáo ${user?.name}`);
    navigate('/likes');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-matchup-purple rounded-full border-t-transparent animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Calculate age from birthdate
  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(user.birthdate);

  return (
    <div className="bg-background min-h-screen pt-16 pb-20">
      <header className="matchup-header">
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/likes">
              <ArrowLeft size={20} />
            </Link>
          </Button>

          <h1 className="text-xl font-bold">{user.name}</h1>

          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleBlock} className="text-red-500 cursor-pointer">
                  Chặn người dùng
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleReport} className="cursor-pointer">
                  Báo cáo vi phạm
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="h-[60vh] relative">
        {user.photos && user.photos.length > 0 ? (
          <>
            <img
              src={user.photos[currentPhotoIndex]}
              alt={user.name}
              className="w-full h-full object-cover"
            />
            {/* Photo navigation dots */}
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-2">
              {user.photos.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentPhotoIndex(index)}
                />
              ))}
            </div>
            {/* Left/right swipe areas */}
            <div
              className="absolute top-0 left-0 w-1/5 h-full cursor-pointer"
              onClick={handlePreviousPhoto}
            />
            <div
              className="absolute top-0 right-0 w-1/5 h-full cursor-pointer"
              onClick={handleNextPhoto}
            />
            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
              <h2 className="text-3xl font-bold mb-1">
                {user.name}, {age}
              </h2>
              <p className="text-lg opacity-90">{user.gender}</p>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">Giới thiệu</h3>
        <p className="text-muted-foreground">{user.bio}</p>
      </div>

      {/* Action buttons */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-6 z-20">
        <Button 
          onClick={handleDislike}
          className="dislike-button"
          aria-label="Dislike"
        >
          <X size={24} />
        </Button>
        
        <Button 
          onClick={handleLike}
          className="like-button"
          aria-label="Like"
        >
          <Heart size={24} />
        </Button>
      </div>
    </div>
  );
};

export default LikeDetail;
