
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Diamond, CreditCard, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const DiamondRecharge = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const diamondPackages = [
    { id: 1, amount: 100, price: 20000, popular: false },
    { id: 2, amount: 300, price: 50000, popular: true },
    { id: 3, amount: 500, price: 80000, popular: false },
    { id: 4, amount: 1000, price: 150000, popular: false },
  ];

  const handlePurchase = () => {
    if (selectedPackage === null) {
      toast.error("Vui lòng chọn gói kim cương");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      const selectedAmount = diamondPackages.find(pkg => pkg.id === selectedPackage)?.amount || 0;
      
      // In a real app, you would update this in the backend/database
      const currentDiamonds = parseInt(localStorage.getItem('diamonds') || '100');
      localStorage.setItem('diamonds', (currentDiamonds + selectedAmount).toString());
      
      toast.success(`Nạp thành công ${selectedAmount} kim cương!`);
      navigate('/settings');
    }, 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/settings')}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">Nạp kim cương</h2>
      </div>

      <div className="mb-6 bg-gradient-to-r from-amber-100 to-amber-200 p-4 rounded-lg flex items-center">
        <Diamond className="h-10 w-10 text-amber-500 mr-3" />
        <div>
          <p className="text-sm font-medium text-amber-800">Kim cương hiện tại</p>
          <p className="text-2xl font-bold text-amber-900">
            {localStorage.getItem('diamonds') || '100'}
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-3">Chọn gói kim cương</h3>

      <div className="grid gap-4 mb-6">
        {diamondPackages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`p-4 cursor-pointer transition-all ${
              selectedPackage === pkg.id 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-muted/50'
            }`}
            onClick={() => setSelectedPackage(pkg.id)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Diamond className="h-6 w-6 text-amber-400 mr-2" />
                <span className="font-bold text-lg">{pkg.amount}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{formatPrice(pkg.price)}</div>
                {selectedPackage === pkg.id && (
                  <Check className="h-5 w-5 text-primary ml-auto" />
                )}
              </div>
            </div>
            {pkg.popular && (
              <Badge className="bg-amber-400 hover:bg-amber-500 text-black absolute -top-2 -right-2">
                Phổ biến
              </Badge>
            )}
          </Card>
        ))}
      </div>

      <Button 
        className="w-full h-12 mt-4 text-base font-medium"
        onClick={handlePurchase}
        disabled={selectedPackage === null || isProcessing}
      >
        <CreditCard className="mr-2 h-5 w-5" />
        {isProcessing ? 'Đang xử lý...' : 'Thanh toán ngay'}
      </Button>

      <p className="text-sm text-muted-foreground text-center mt-4">
        Kim cương được sử dụng để mở khóa các tính năng đặc biệt trong ứng dụng
      </p>
    </div>
  );
};

export default DiamondRecharge;
