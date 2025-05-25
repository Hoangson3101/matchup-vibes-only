
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Ban, CheckCircle } from 'lucide-react';

const AdminPackages = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const itemsPerPage = 10;

  // Mock data
  const packages = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    price: (i + 1) * 20000,
    diamonds: (i + 1) * 100,
    isActive: Math.random() > 0.2,
  }));

  const totalPages = Math.ceil(packages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPackages = packages.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleToggleActive = (id: number) => {
    console.log('Toggle active status for package:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete package:', id);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Quản lý các gói nạp</h1>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Thêm gói nạp
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm gói nạp mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Giá tiền (VND)" type="number" />
                <Input placeholder="Số lượng kim cương" type="number" />
                <Button className="w-full">Tạo gói nạp</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Giá tiền</TableHead>
                <TableHead>Số lượng kim cương</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{formatCurrency(pkg.price)}</TableCell>
                  <TableCell>{pkg.diamonds}</TableCell>
                  <TableCell>
                    <Badge variant={pkg.isActive ? "default" : "secondary"}>
                      {pkg.isActive ? 'Hoạt động' : 'Vô hiệu hóa'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={pkg.isActive ? "secondary" : "default"}
                        onClick={() => handleToggleActive(pkg.id)}
                      >
                        {pkg.isActive ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(pkg.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          <div className="flex justify-center items-center p-4 gap-2">
            <Button 
              variant="outline" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Trước
            </Button>
            <span className="mx-4">
              Trang {currentPage} / {totalPages}
            </span>
            <Button 
              variant="outline" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Sau
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPackages;
