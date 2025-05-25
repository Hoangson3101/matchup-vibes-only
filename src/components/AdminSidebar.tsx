
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, AlertTriangle, Bell, Percent, Package, Receipt } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Tổng quan', icon: BarChart3 },
    { path: '/admin/accounts', label: 'Quản lý tài khoản', icon: Users },
    { path: '/admin/reports', label: 'Quản lý vi phạm báo cáo', icon: AlertTriangle },
    { path: '/admin/notifications', label: 'Quản lý thông báo', icon: Bell },
    { path: '/admin/discount-codes', label: 'Quản lý mã giảm giá', icon: Percent },
    { path: '/admin/packages', label: 'Quản lý các gói nạp', icon: Package },
    { path: '/admin/invoices', label: 'Quản lý hóa đơn', icon: Receipt },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-primary">Admin Dashboard</h2>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant={location.pathname === item.path ? "default" : "ghost"}
              className="w-full justify-start mb-2 mx-2"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
