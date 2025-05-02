
import { ArrowLeft, Lock, MapPin, FileText, MessageCircle, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface SettingsProps {
  onLogout: () => void;
}

const Settings = ({ onLogout }: SettingsProps) => {
  const settingsItems = [
    {
      icon: <Lock size={18} />,
      title: 'Đổi mật khẩu',
      subtitle: 'Cập nhật mật khẩu mới',
      action: () => console.log('Change password')
    },
    {
      icon: <MapPin size={18} />,
      title: 'Cập nhật vị trí',
      subtitle: 'Đặt lại vị trí hiện tại của bạn',
      action: () => console.log('Update location')
    },
    {
      icon: <FileText size={18} />,
      title: 'Chính sách & Quyền riêng tư',
      subtitle: 'Tìm hiểu về quyền riêng tư của bạn',
      action: () => console.log('Privacy policy')
    },
    {
      icon: <MessageCircle size={18} />,
      title: 'Hỗ trợ & Feedback',
      subtitle: 'Liên hệ với nhóm hỗ trợ',
      action: () => console.log('Support')
    },
    {
      icon: <User size={18} />,
      title: 'Về chúng tôi',
      subtitle: 'Thông tin về MatchUp và đội ngũ phát triển',
      action: () => console.log('About us')
    },
    {
      icon: <LogOut size={18} />,
      title: 'Đăng xuất',
      subtitle: 'Đăng xuất khỏi tài khoản',
      action: onLogout,
      danger: true
    }
  ];

  return (
    <div className="bg-background min-h-screen pt-16 pb-20">
      <header className="matchup-header">
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft size={20} />
            </Link>
          </Button>

          <h1 className="text-xl font-bold">Cài đặt</h1>

          <div className="w-8"></div>
        </div>
      </header>

      <div className="container px-4 pt-4">
        <div className="space-y-4">
          {settingsItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`w-full justify-start p-4 h-auto ${
                item.danger ? 'text-red-500 hover:text-red-600 hover:bg-red-50' : ''
              }`}
              onClick={item.action}
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.danger ? 'bg-red-100' : 'bg-matchup-purple/10'
                }`}>
                  {item.icon}
                </div>
                <div className="ml-3 text-left">
                  <h3 className={`font-medium ${item.danger ? 'text-red-500' : ''}`}>{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
