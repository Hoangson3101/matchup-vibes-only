
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    console.log('Toggle ban status for user:', userId);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      {/* Main content with responsive margin */}
      <div className="flex-1 lg:ml-64 p-4 lg:p-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6">Quản lý tài khoản</h1>
        
        {/* Desktop table view */}
        <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Tên đăng nhập</TableHead>
                  <TableHead className="min-w-[100px]">Mật khẩu</TableHead>
                  <TableHead className="min-w-[180px]">Email</TableHead>
                  <TableHead className="min-w-[100px]">Ngày tạo</TableHead>
                  <TableHead className="min-w-[120px]">Ngày cập nhật</TableHead>
                  <TableHead className="min-w-[100px]">Kim cương</TableHead>
                  <TableHead className="min-w-[100px]">Trạng thái</TableHead>
                  <TableHead className="min-w-[200px]">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.username}</TableCell>
                    <TableCell>{account.password}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{account.email}</TableCell>
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
          </div>
        </div>

        {/* Mobile card view */}
        <div className="lg:hidden space-y-4">
          {currentAccounts.map((account) => (
            <Card key={account.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{account.username}</CardTitle>
                  <Badge variant={account.isBanned ? "destructive" : "default"}>
                    {account.isBanned ? 'Bị khóa' : 'Hoạt động'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm"><span className="font-medium">Email:</span> {account.email}</p>
                  <p className="text-sm"><span className="font-medium">Kim cương:</span> {account.diamond}</p>
                  <p className="text-sm"><span className="font-medium">Ngày tạo:</span> {account.createdAt}</p>
                  <p className="text-sm"><span className="font-medium">Ngày cập nhật:</span> {account.updatedAt}</p>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <Link to={`/admin/user-profile/${account.id}`} className="w-full">
                    <Button size="sm" variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-1" />
                      Xem hồ sơ
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant={account.isBanned ? "default" : "destructive"}
                    onClick={() => toggleBanStatus(account.id)}
                    className="w-full"
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
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center items-center p-4 gap-2 bg-white rounded-lg shadow mt-4">
          <Button 
            variant="outline" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            size="sm"
          >
            Trước
          </Button>
          <span className="mx-2 text-sm lg:text-base">
            Trang {currentPage} / {totalPages}
          </span>
          <Button 
            variant="outline" 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            size="sm"
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminAccounts;
