
import { useNavigate } from 'react-router-dom';
import SettingsComponent from '@/components/Settings';
import { toast } from 'sonner';

const SettingsPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, we would call an API to log the user out
    toast.success('Đăng xuất thành công!');
    
    // For demo, just navigate to home
    navigate('/');
  };

  return <SettingsComponent onLogout={handleLogout} />;
};

export default SettingsPage;
