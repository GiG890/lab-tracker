import { useState } from 'react';
import { Button, Card, Form, Input, Alert, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';

const { Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (values.password.length < 6) {
        throw new Error('Неверный email или пароль');
      }

      const role = values.email.includes('teacher') ? 'teacher' : 'student';
      
      const fakeUser = {
        id: 1,
        name: role === 'teacher' ? 'Преподаватель Петров' : 'Студент Иванов',
        email: values.email,
        role: role,
        created_at: new Date().toISOString(),
      };

      login(fakeUser);
      localStorage.setItem('token', 'fake-jwt-token');
      
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
      <Card style={{ width: 400 }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          Вход в систему
        </Title>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        <Form<LoginFormValues>
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Введите email' },
              { type: 'email', message: 'Введите корректный email' },
            ]}
          >
            <Input size="large" placeholder="student@test.ru или teacher@test.ru" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Введите пароль' },
              { min: 6, message: 'Пароль должен быть не менее 6 символов' },
            ]}
          >
            <Input.Password size="large" placeholder="Пароль" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isLoading}
          >
            Войти
          </Button>
        </Form>
      </Card>
    </div>
  );
};