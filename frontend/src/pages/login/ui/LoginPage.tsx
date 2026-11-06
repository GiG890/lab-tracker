import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';
import { useAuth } from '@/app/providers/AuthProvider';
import { apiRequest } from '@/shared/api/client';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface MeResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const tokens = await apiRequest<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const user = await apiRequest<MeResponse>('/users/me', {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });

      login(user, tokens);
      message.success('Вы вошли в систему');
      navigate('/profile');
    } catch (error: any) {
      message.error(error.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Вход в систему" style={{ maxWidth: 400, margin: '0 auto' }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Введите email' },
            { type: 'email', message: 'Некорректный email' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Войти
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center' }}>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </div>
    </Card>
  );
};