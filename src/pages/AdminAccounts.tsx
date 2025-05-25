
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Ban, CheckCircle } from 'lucide-react';

const AdminAccounts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data
  const accounts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    username: `user${i + 1}`,
    password: '••••••••',
    email: `user${i + 1}@example.com`,
    createdAt: new Date(2024, 0, i + 1).toLocaleDateString('vi-VN'),
    updatedAt: new Date(2024, 4, i + 1).toLocaleDateString('vi-VN'),
    diamond: Math.floor(Math.random() * 1000),
    isBanned: Math.random() > 0.8,
  }));

  const totalPages = Math.ceil(accounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAccounts = accounts.slice(startIndex, startIndex + itemsPerPage);

  const toggleBanStatus = (userId: number) => {
    // Handle ban/unban logic
    console.log('Toggle ban status for user:', userId);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Quản lý tài khoản</h1>
        
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên đăng nhập</TableHead>
                <TableHead>Mật khẩu</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Ngày cập nhật</TableHead>
                <TableHead>Kim cương</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.username}</TableCell>
                  <TableCell>{account.password}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>{account.createdAt}</TableCell>
                  <TableCell>{account.updatedAt}</TableCell>
                  <TableCell>{account.diamond}</TableCell>
                  <TableCell>
                    <Badge variant={account.isBanned ? "destructive" : "default"}>
                      {account.isBanned ? 'Bị khóa' : 'Hoạt động'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link to={`/admin/user-profile/${account.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Xem hồ sơ
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant={account.isBanned ? "default" : "destructive"}
                        onClick={() => toggleBanStatus(account.id)}
                      >
                        {account.isBanned ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Bỏ khóa
                          </>
                        ) : (
                          <>
                            <Ban className="h-4 w-4 mr-1" />
                            Khóa tài khoản
                          </>
                        )}
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

export default AdminAccounts;
