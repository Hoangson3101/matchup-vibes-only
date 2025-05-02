
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Heart, MessageCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MatchPreferences from './MatchPreferences';

const Header = () => {
  const [showPreferences, setShowPreferences] = useState(false);

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
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            >
              <path d="M16.5 8.25A4.5 4.5 0 0 0 12 12m0 0a4.5 4.5 0 0 0-4.5 4.5M12 12a4.5 4.5 0 0 1-4.5-4.5M12 12a4.5 4.5 0 0 1 4.5 4.5m-1.8-9a8.5 8.5 0 0 0-8.4 0m8.4 9a8.5 8.5 0 0 1-8.4 0" />
            </svg>
          </Button>
          
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
