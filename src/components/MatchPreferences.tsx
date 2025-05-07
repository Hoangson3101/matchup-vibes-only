
import { useState } from 'react';
import { X } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MatchPreferencesProps {
  open: boolean;
  onClose: () => void;
}

const MatchPreferences = ({ open, onClose }: MatchPreferencesProps) => {
  const [gender, setGender] = useState<string>('any');
  const [distance, setDistance] = useState<number>(25);
  const [ageRange, setAgeRange] = useState<number[]>([18, 35]);

  const handleSave = () => {
    // In a real app, we would save these preferences to a backend
    toast.success('Tiêu chí ghép đôi đã được cập nhật!');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-matchup-purple">Tiêu chí ghép đôi</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Giới tính</h3>
            <RadioGroup value={gender} onValueChange={setGender} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Nam</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Nữ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="any" />
                <Label htmlFor="any">Bất kỳ</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-foreground">Khoảng cách</h3>
              <span className="text-sm text-muted-foreground">{distance} km</span>
            </div>
            <Slider
              value={[distance]}
              onValueChange={(values) => setDistance(values[0])}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-foreground">Độ tuổi</h3>
              <span className="text-sm text-muted-foreground">{ageRange[0]} - {ageRange[1]}</span>
            </div>
            <Slider
              value={ageRange}
              onValueChange={(values) => setAgeRange([values[0], values[1]])}
              min={18}
              max={60}
              step={1}
              className="w-full"
            />
          </div>
        </div>
        
        <Button 
          onClick={handleSave}
          className="w-full rounded-full bg-matchup-purple text-white hover:bg-matchup-purple-dark"
        >
          Lưu lựa chọn
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MatchPreferences;
