
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { User } from '@/types/User';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const CreateProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<User>({
    name: '',
    birthdate: '',
    gender: 'Nam',
    bio: '',
    avatar: '',
    photos: []
  });

  const handleSave = () => {
    // Validate required fields
    if (!profile.name) {
      toast.error('Vui lòng nhập tên của bạn');
      return;
    }
    if (!profile.birthdate) {
      toast.error('Vui lòng chọn ngày sinh của bạn');
      return;
    }
    if (!profile.avatar) {
      toast.error('Vui lòng chọn ảnh đại diện');
      return;
    }

    // In a real app, we would save this profile to the backend
    toast.success('Hồ sơ đã được tạo thành công!');
    
    // Save profile to localStorage to simulate persistence
    localStorage.setItem('userProfile', JSON.stringify(profile));
    
    // Navigate to home page
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/login');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfile({
            ...profile,
            avatar: event.target.result as string
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePhotoAdd = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const photos = [...(profile.photos || [])];
          photos[index] = event.target.result as string;
          setProfile({
            ...profile,
            photos
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-background border-b">
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <X size={20} />
        </Button>

        <h1 className="text-xl font-bold">Tạo hồ sơ</h1>

        <Button variant="ghost" size="icon" onClick={handleSave}>
          <Check size={20} />
        </Button>
      </header>

      <div className="container px-4 pt-20 pb-20">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 relative">
            {profile.avatar ? (
              <img 
                src={profile.avatar} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <label 
                className="w-full h-full flex items-center justify-center bg-muted cursor-pointer"
                htmlFor="avatar-input"
              >
                <Upload size={24} className="text-muted-foreground/50" />
                <span className="sr-only">Chọn ảnh đại diện</span>
              </label>
            )}
            <input 
              type="file"
              id="avatar-input"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            {profile.avatar && (
              <div 
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => document.getElementById('avatar-input')?.click()}
              >
                <Upload size={24} className="text-white" />
              </div>
            )}
          </div>

          <div className="w-full space-y-6 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="name">Tên</Label>
              <Input 
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                placeholder="Nhập tên của bạn"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthdate">Ngày sinh</Label>
              <Input 
                id="birthdate"
                type="date"
                value={profile.birthdate}
                onChange={(e) => setProfile({...profile, birthdate: e.target.value})}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Giới tính</Label>
              <RadioGroup 
                value={profile.gender} 
                onValueChange={(value) => setProfile({...profile, gender: value})}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Nam" id="male" />
                  <Label htmlFor="male">Nam</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Nữ" id="female" />
                  <Label htmlFor="female">Nữ</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Khác" id="other" />
                  <Label htmlFor="other">Khác</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Mô tả bản thân</Label>
              <Textarea 
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                placeholder="Viết gì đó về bản thân..."
                rows={4}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Ảnh của bạn</Label>
              <div className="grid grid-cols-3 gap-2">
                {Array(6).fill(0).map((_, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden relative">
                    {(profile.photos && profile.photos[index]) ? (
                      <>
                        <img 
                          src={profile.photos[index]} 
                          alt={`Photo ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <div 
                          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                          onClick={() => document.getElementById(`photo-input-${index}`)?.click()}
                        >
                          <Upload size={24} className="text-white" />
                        </div>
                      </>
                    ) : (
                      <label 
                        className="w-full h-full flex items-center justify-center bg-muted cursor-pointer"
                        htmlFor={`photo-input-${index}`}
                      >
                        <Upload size={24} className="text-muted-foreground/50" />
                      </label>
                    )}
                    <input 
                      type="file"
                      id={`photo-input-${index}`}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handlePhotoAdd(e, index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
