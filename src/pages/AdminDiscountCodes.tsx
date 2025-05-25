
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Ban, CheckCircle } from 'lucide-react';

const AdminDiscountCodes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCode, setEditingCode] = useState(null);
  const itemsPerPage = 10;

  // Mock data
  const discountCodes = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    code: `DISCOUNT${i + 1}`,
    percentage: Math.floor(Math.random() * 50) + 5,
    description: `Mã giảm giá ${i + 1}`,
    startDate: new Date(2024, 4, i + 1).toLocaleDateString('vi-VN'),
    endDate: new Date(2024, 5, i + 15).toLocaleDateString('vi-VN'),
    isActive: Math.random() > 0.3,
  }));

  const totalPages = Math.ceil(discountCodes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCodes = discountCodes.slice(startIndex, startIndex + itemsPerPage);

  const handleToggleActive = (id: number) => {
    console.log('Toggle active status for code:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete discount code:', id);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Quản lý mã giảm giá</h1>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Thêm mã giảm giá
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm mã giảm giá mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Mã code" />
                <Input placeholder="% giảm giá" type="number" />
                <Textarea placeholder="Mô tả" />
                <Input placeholder="Ngày bắt đầu" type="date" />
                <Input placeholder="Ngày hết hạn" type="date" />
                <Button className="w-full">Tạo mã giảm giá</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã code</TableHead>
                <TableHead>% giảm giá</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Ngày bắt đầu</TableHead>
                <TableHead>Ngày hết hạn</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCodes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell className="font-medium">{code.code}</TableCell>
                  <TableCell>{code.percentage}%</TableCell>
                  <TableCell>{code.description}</TableCell>
                  <TableCell>{code.startDate}</TableCell>
                  <TableCell>{code.endDate}</TableCell>
                  <TableCell>
                    <Badge variant={code.isActive ? "default" : "secondary"}>
                      {code.isActive ? 'Hoạt động' : 'Vô hiệu hóa'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={code.isActive ? "secondary" : "default"}
                        onClick={() => handleToggleActive(code.id)}
                      >
                        {code.isActive ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(code.id)}
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

export default AdminDiscountCodes;
