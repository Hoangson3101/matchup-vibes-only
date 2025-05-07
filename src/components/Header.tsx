
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Heart, MessageCircle, Settings, Diamond } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MatchPreferences from './MatchPreferences';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [diamonds, setDiamonds] = useState(0);

  useEffect(() => {
    // Initialize diamonds from localStorage or set default
    const storedDiamonds = localStorage.getItem('diamonds');
    if (!storedDiamonds) {
      localStorage.setItem('diamonds', '100');
      setDiamonds(100);
    } else {
      setDiamonds(parseInt(storedDiamonds));
    }

    // Listen for changes to localStorage
    const handleStorageChange = () => {
      const updatedDiamonds = localStorage.getItem('diamonds');
      if (updatedDiamonds) {
        setDiamonds(parseInt(updatedDiamonds));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for diamonds every second (to catch changes made in the same window)
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

  return (
    <header className="matchup-header">
      <div className="flex items-center justify-between w-full">
        <div className="text-2xl font-bold text-matchup-purple">MatchUp</div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="text-foreground">
            <Link to="/profile">
              <User size={20} />
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild className="text-foreground">
            <Link to="/likes">
              <Heart size={20} />
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild className="text-foreground">
            <Link to="/messages">
              <MessageCircle size={20} />
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="text-foreground"
            onClick={() => setShowPreferences(true)}
          >
            <Settings size={20} />
          </Button>
          
          <div className="relative">
            <Button variant="ghost" size="icon" asChild className="text-foreground">
              <Link to="/diamond-recharge">
                <Diamond size={20} className="text-amber-400" />
              </Link>
            </Button>
            <Badge 
              variant="secondary" 
              className="absolute -top-2 -right-2 bg-amber-400 text-white text-xs px-1.5 py-0.5 rounded-full"
            >
              {diamonds}
            </Badge>
          </div>
          
          <Button variant="ghost" size="icon" asChild className="text-foreground">
            <Link to="/settings">
              <Settings size={20} />
            </Link>
          </Button>
        </div>
      </div>

      <MatchPreferences open={showPreferences} onClose={() => setShowPreferences(false)} />
    </header>
  );
};

export default Header;
