
import { useParams } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AdminUserProfile = () => {
  const { userId } = useParams();

  // Mock user data
  const user = {
    id: userId,
    fullName: 'Nguyễn Văn A',
    birthDay: '15/03/1995',
    gender: 'Nam',
    description: 'Tôi là một người yêu thích du lịch và khám phá những điều mới mẻ. Hy vọng tìm được người bạn đồng hành trong cuộc sống.',
    avatar: '/placeholder.svg',
    profileImages: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64 p-4 lg:p-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6">Hồ sơ người dùng</h1>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Avatar className="h-16 w-16 lg:h-20 lg:w-20">
                  <AvatarImage src={user.avatar} alt={user.fullName} />
                  <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg lg:text-xl font-semibold">{user.fullName}</h3>
                  <p className="text-gray-600 text-sm">ID: {user.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-gray-700 text-sm">Họ và tên:</label>
                  <p className="text-gray-900 text-sm lg:text-base">{user.fullName}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700 text-sm">Ngày sinh:</label>
                  <p className="text-gray-900 text-sm lg:text-base">{user.birthDay}</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="font-medium text-gray-700 text-sm">Giới tính:</label>
                  <p className="text-gray-900 text-sm lg:text-base">{user.gender}</p>
                </div>
              </div>
              
              <div>
                <label className="font-medium text-gray-700 text-sm">Mô tả:</label>
                <p className="text-gray-900 mt-2 text-sm lg:text-base leading-relaxed">{user.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Hình ảnh hồ sơ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {user.profileImages.map((image, index) => (
                  <div key={index} className="aspect-square">
                    <img
                      src={image}
                      alt={`Profile ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminUserProfile;
