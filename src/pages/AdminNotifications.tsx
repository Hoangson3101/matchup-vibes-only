
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

const AdminNotifications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({ content: '' });
  const itemsPerPage = 10;

  // Mock data
  const notifications = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    content: `Thông báo hệ thống số ${i + 1}: Cập nhật tính năng mới`,
    createdAt: new Date(2024, 4, i + 1).toLocaleDateString('vi-VN'),
  }));

  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotifications = notifications.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateNotification = () => {
    console.log('Create notification:', newNotification);
    setIsCreateOpen(false);
    setNewNotification({ content: '' });
  };

  const handleDeleteNotification = (id: number) => {
    console.log('Delete notification:', id);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Quản lý thông báo</h1>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tạo thông báo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo thông báo mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nội dung thông báo:</label>
                  <Textarea
                    value={newNotification.content}
                    onChange={(e) => setNewNotification({ content: e.target.value })}
                    placeholder="Nhập nội dung thông báo..."
                    rows={4}
                  />
                </div>
                <Button onClick={handleCreateNotification} className="w-full">
                  Tạo thông báo
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nội dung</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell className="max-w-md">{notification.content}</TableCell>
                  <TableCell>{notification.createdAt}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteNotification(notification.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Xóa
                    </Button>
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

export default AdminNotifications;
