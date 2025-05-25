
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, MapPin, FileText, MessageSquareText, LogOut, Info, Lock, Diamond, Shield, HeadphonesIcon, SlidersHorizontal, UserX, Home, UserCog } from 'lucide-react';
import MatchPreferences from './MatchPreferences';

interface SettingsProps {
  onLogout: () => void;
}

const Settings = ({ onLogout }: SettingsProps) => {
  const [showPreferences, setShowPreferences] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <Link to="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <Home className="h-5 w-5" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold text-center flex-1">Cài đặt</h2>
      </div>
      
      <div className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full justify-start text-base font-normal h-12"
          onClick={() => setShowPreferences(true)}
        >
          <SlidersHorizontal className="mr-3 h-5 w-5 text-blue-600" />
          Tiêu chí ghép đôi
        </Button>

        <Link to="/change-password" className="w-full">
          <Button variant="outline" className="w-full justify-start text-base font-normal h-12">
            <Lock className="mr-3 h-5 w-5" />
            Đổi mật khẩu
          </Button>
        </Link>

        <Link to="/blocked-users" className="w-full">
          <Button variant="outline" className="w-full justify-start text-base font-normal h-12">
            <UserX className="mr-3 h-5 w-5 text-red-600" />
            Danh sách người bị chặn
          </Button>
        </Link>

        <Button variant="outline" className="w-full justify-start text-base font-normal h-12">
          <MapPin className="mr-3 h-5 w-5" />
          Cập nhật vị trí
        </Button>
        
        <Link to="/diamond-recharge" className="w-full">
          <Button variant="outline" className="w-full justify-start text-base font-normal h-12 text-primary">
            <Diamond className="mr-3 h-5 w-5" />
            Nạp kim cương
          </Button>
        </Link>
        
        <Link to="/privacy-policy" className="w-full">
          <Button variant="outline" className="w-full justify-start text-base font-normal h-12">
            <Shield className="mr-3 h-5 w-5 text-green-600" />
            Chính sách & Quyền riêng tư
          </Button>
        </Link>
        
        <Link to="/support-feedback" className="w-full">
          <Button variant="outline" className="w-full justify-start text-base font-normal h-12">
            <HeadphonesIcon className="mr-3 h-5 w-5 text-blue-600" />
            Hỗ trợ & Feedback
          </Button>
        </Link>
        
        <Link to="/admin" className="w-full">
          <Button variant="outline" className="w-full justify-start text-base font-normal h-12 text-orange-600 hover:text-orange-600 hover:bg-orange-50">
            <UserCog className="mr-3 h-5 w-5" />
            Đăng nhập Admin
          </Button>
        </Link>
        
        <Button variant="outline" onClick={onLogout} className="w-full justify-start text-base font-normal h-12 text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="mr-3 h-5 w-5" />
          Đăng xuất
        </Button>
        
        <Link to="/about-us" className="w-full">
          <Button variant="outline" className="w-full justify-start text-base font-normal h-12">
            <Info className="mr-3 h-5 w-5 text-purple-600" />
            Về chúng tôi
          </Button>
        </Link>
      </div>

      <MatchPreferences open={showPreferences} onClose={() => setShowPreferences(false)} />
    </div>
  );
};

export default Settings;
