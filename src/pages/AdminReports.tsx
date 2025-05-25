
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Ban } from 'lucide-react';

const AdminReports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data
  const reports = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    reporter: `user${i + 1}`,
    reported: `user${i + 50}`,
    content: `Nội dung vi phạm số ${i + 1}: Hành vi không phù hợp`,
    reportedAt: new Date(2024, 4, i + 1).toLocaleDateString('vi-VN'),
  }));

  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = reports.slice(startIndex, startIndex + itemsPerPage);

  const handleBanUser = (reportId: number) => {
    console.log('Ban user from report:', reportId);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Quản lý vi phạm báo cáo</h1>
        
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người báo cáo</TableHead>
                <TableHead>Người bị báo cáo</TableHead>
                <TableHead>Nội dung</TableHead>
                <TableHead>Ngày báo cáo</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.reporter}</TableCell>
                  <TableCell>{report.reported}</TableCell>
                  <TableCell className="max-w-xs truncate">{report.content}</TableCell>
                  <TableCell>{report.reportedAt}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleBanUser(report.id)}
                    >
                      <Ban className="h-4 w-4 mr-1" />
                      Khóa tài khoản
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

export default AdminReports;
