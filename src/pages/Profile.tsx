
import { useState, useEffect } from 'react';
import UserProfile from '@/components/UserProfile';
import { User } from '@/types/User';
import { useNavigate } from 'react-router-dom';

// Sample user data
const dummyUser: User = {
  id: 'self',
  name: 'Lan Anh',
  birthdate: '1998-05-15',
  gender: 'Nữ',
  bio: 'Coffee addict ☕ | Travel enthusiast ✈️ | Vibe seeker 🌟 | Just looking for someone to laugh at my jokes and bring me food 🍕',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
  photos: [
    'https://images.unsplash.com/photo-1604519098877-9cac5c07aeda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1533646775097-a39c4d4e3cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1576490833448-44775bad2ae1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  ]
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, we would fetch the user profile from an API
    // For this demo, we'll use the dummy data
    setUser(dummyUser);
  }, []);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  return <UserProfile user={user} editable={true} />;
};

export default Profile;
