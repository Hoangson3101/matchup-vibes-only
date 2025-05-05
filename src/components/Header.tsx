
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Heart, MessageCircle, Settings, Diamond } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MatchPreferences from './MatchPreferences';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [diamonds, setDiamonds] = useState(100); // Default diamond count

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
          
          <div className="relative">
            <Button variant="ghost" size="icon" asChild className="text-foreground">
              <Link to="/settings">
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
