
import { useNavigate } from 'react-router-dom';
import SettingsComponent from '@/components/Settings';
import { toast } from 'sonner';

const SettingsPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication state
    localStorage.removeItem("isAuthenticated");
    toast.success('Đăng xuất thành công!');
    
    // Navigate to login page
    navigate('/login');
  };

  return <SettingsComponent onLogout={handleLogout} />;
};

export default SettingsPage;
