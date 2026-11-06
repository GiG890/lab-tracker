import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Select, message } from 'antd';
import { apiRequest } from '@/shared/api/client';

export const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    setLoading(true);
    try {
      await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      message.success('Аккаунт создан, войдите в систему');
      navigate('/login');
    } catch (error: any) {
      message.error(error.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Регистрация" style={{ maxWidth: 400, margin: '0 auto' }}>
      <Form layout="vertical" onFinish={onFinish} initialValues={{ role: 'student' }}>
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input />
        </Form.Item>
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
          rules={[
            { required: true, message: 'Введите пароль' },
            { min: 8, message: 'Минимум 8 символов' },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Роль" name="role">
          <Select
            options={[
              { value: 'student', label: 'Студент' },
              { value: 'teacher', label: 'Преподаватель' },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center' }}>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </div>
    </Card>
  );
};