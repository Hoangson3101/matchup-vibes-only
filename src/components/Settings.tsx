
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, MapPin, FileText, MessageSquareText, LogOut, Info, Lock, Diamond } from 'lucide-react';

interface SettingsProps {
  onLogout: () => void;
}

const Settings = ({ onLogout }: SettingsProps) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Cài đặt</h2>
      
      <div className="space-y-3">
        <Link to="/change-password" className="w-full">
          <Button variant="outline" className="w-full justify-start text-base font-normal h-12">
            <Lock className="mr-2 h-5 w-5" />
            Đổi mật khẩu
          </Button>
        </Link>

        <Button variant="outline" className="w-full justify-start text-base font-normal h-12">
          <MapPin className="mr-2 h-5 w-5" />
          Cập nhật vị trí
        </Button>
        
        <Button variant="outline" className="w-full justify-start text-base font-normal h-12 text-primary">
          <Diamond className="mr-2 h-5 w-5" />
          Nạp kim cương
        </Button>
        
        <Button variant="outline" className="w-full justify-start text-base font-normal h-12">
          <FileText className="mr-2 h-5 w-5" />
          Chính sách & Quyền riêng tư
        </Button>
        
        <Button variant="outline" className="w-full justify-start text-base font-normal h-12">
          <MessageSquareText className="mr-2 h-5 w-5" />
          Hỗ trợ & Feedback
        </Button>
        
        <Button variant="outline" onClick={onLogout} className="w-full justify-start text-base font-normal h-12 text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="mr-2 h-5 w-5" />
          Đăng xuất
        </Button>
        
        <Button variant="outline" className="w-full justify-start text-base font-normal h-12">
          <Info className="mr-2 h-5 w-5" />
          Về chúng tôi
        </Button>
      </div>
    </div>
  );
};

export default Settings;
