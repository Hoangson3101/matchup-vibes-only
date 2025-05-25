import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Heart, MessageCircle, Settings, Diamond, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import NotificationPopup from './NotificationPopup';

const Header = () => {
  const [diamonds, setDiamonds] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(4);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const storedDiamonds = localStorage.getItem('diamonds');
    if (!storedDiamonds) {
      localStorage.setItem('diamonds', '100');
      setDiamonds(100);
    } else {
      setDiamonds(parseInt(storedDiamonds));
    }

    const handleStorageChange = () => {
      const updatedDiamonds = localStorage.getItem('diamonds');
      if (updatedDiamonds) {
        setDiamonds(parseInt(updatedDiamonds));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(() => {
      const currentDiamonds = localStorage.getItem('diamonds');
      if (currentDiamonds && parseInt(currentDiamonds) !== diamonds) {
        setDiamonds(parseInt(currentDiamonds));
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleCloseNotifications = () => {
    setNotificationOpen(false);
    setUnreadNotifications(0);
  };

  return (
    <header className="matchup-header">
      <div className="flex items-center justify-between w-full px-2 sm:px-4">
        <div className="text-xl sm:text-2xl font-bold text-matchup-purple">MatchLove</div>

        <div className="flex items-center gap-1 sm:gap-3">
          <Button variant="ghost" size="icon" asChild className="text-foreground h-8 w-8 sm:h-10 sm:w-10">
            <Link to="/profile">
              <User size={18} className="sm:w-5 sm:h-5" />
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild className="text-foreground h-8 w-8 sm:h-10 sm:w-10">
            <Link to="/likes">
              <Heart size={18} className="sm:w-5 sm:h-5" />
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild className="text-foreground h-8 w-8 sm:h-10 sm:w-10">
            <Link to="/messages">
              <MessageCircle size={18} className="sm:w-5 sm:h-5" />
            </Link>
          </Button>
          
          <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground relative h-8 w-8 sm:h-10 sm:w-10">
                <Bell size={18} className="sm:w-5 sm:h-5" />
                {unreadNotifications > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0 rounded-full h-4 w-4 flex items-center justify-center text-[10px]"
                  >
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] sm:w-[340px] p-0" align="end">
              <NotificationPopup onClose={handleCloseNotifications} />
            </PopoverContent>
          </Popover>
          
          <Button variant="ghost" size="icon" asChild className="text-foreground h-8 w-8 sm:h-10 sm:w-10">
            <Link to="/settings">
              <Settings size={18} className="sm:w-5 sm:h-5" />
            </Link>
          </Button>
          
          <div className="relative">
            <Button variant="ghost" size="icon" asChild className="text-foreground h-8 w-8 sm:h-10 sm:w-10">
              <Link to="/diamond-recharge">
                <Diamond size={18} className="sm:w-5 sm:h-5 text-amber-400" />
              </Link>
            </Button>
            <Badge 
              variant="secondary" 
              className="absolute -top-1 -right-1 bg-amber-400 text-white text-xs px-1 py-0 rounded-full h-4 min-w-4 flex items-center justify-center text-[10px]"
            >
              {diamonds}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
