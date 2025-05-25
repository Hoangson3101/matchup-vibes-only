
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminInvoices = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data
  const invoices = Array.from({ length: 35 }, (_, i) => ({
    id: i + 1,
    accountId: `ACC${(i + 1).toString().padStart(4, '0')}`,
    originalAmount: (i + 1) * 50000,
    discountCode: i % 3 === 0 ? `DISCOUNT${i + 1}` : null,
    finalAmount: i % 3 === 0 ? (i + 1) * 50000 * 0.9 : (i + 1) * 50000,
    createdAt: new Date(2024, 4, i + 1).toLocaleDateString('vi-VN'),
    status: ['Thành công', 'Đang xử lý', 'Thất bại'][Math.floor(Math.random() * 3)],
  }));

  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInvoices = invoices.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Thành công':
        return <Badge variant="default">Thành công</Badge>;
      case 'Đang xử lý':
        return <Badge variant="secondary">Đang xử lý</Badge>;
      case 'Thất bại':
        return <Badge variant="destructive">Thất bại</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Quản lý hóa đơn</h1>
        
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã tài khoản</TableHead>
                <TableHead>Số tiền ban đầu</TableHead>
                <TableHead>Mã giảm giá</TableHead>
                <TableHead>Số tiền sau giảm giá</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.accountId}</TableCell>
                  <TableCell>{formatCurrency(invoice.originalAmount)}</TableCell>
                  <TableCell>{invoice.discountCode || '-'}</TableCell>
                  <TableCell>{formatCurrency(invoice.finalAmount)}</TableCell>
                  <TableCell>{invoice.createdAt}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
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

export default AdminInvoices;
