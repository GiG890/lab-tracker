import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Spin, message, Descriptions } from 'antd';
import { useAuth } from '@/app/providers/AuthProvider';
import { apiRequest } from '@/shared/api/client';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    apiRequest<UserProfile>('/users/me')
      .then(setProfile)
      .catch(() => message.error('Не удалось загрузить профиль'))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) return <Spin />;

  return (
    <Card title="Личный кабинет">
      {profile && (
        <Descriptions column={1}>
          <Descriptions.Item label="Имя">{profile.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
          <Descriptions.Item label="Роль">{profile.role}</Descriptions.Item>
        </Descriptions>
      )}
      <Button danger onClick={handleLogout} style={{ marginTop: 16 }}>
        Выйти
      </Button>
    </Card>
  );
};