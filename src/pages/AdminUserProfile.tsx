
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
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Hồ sơ người dùng</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} alt={user.fullName} />
                  <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{user.fullName}</h3>
                  <p className="text-gray-600">ID: {user.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-gray-700">Họ và tên:</label>
                  <p className="text-gray-900">{user.fullName}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Ngày sinh:</label>
                  <p className="text-gray-900">{user.birthDay}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Giới tính:</label>
                  <p className="text-gray-900">{user.gender}</p>
                </div>
              </div>
              
              <div>
                <label className="font-medium text-gray-700">Mô tả:</label>
                <p className="text-gray-900 mt-2">{user.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hình ảnh hồ sơ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
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
