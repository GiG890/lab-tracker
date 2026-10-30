import { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, message } from 'antd';
import type { Dayjs } from 'dayjs';
import { apiRequest, ApiError } from '@/shared/api/client';
import type { TaskCreate, Task } from '@/entities/task/model/types';

interface Props {
  channelId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormValues {
  title: string;
  description?: string;
  type: string;
  deadline: Dayjs;
}

export const CreateTaskForm = ({ channelId, onSuccess, onCancel }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const taskData: TaskCreate = {
        title: values.title,
        description: values.description,
        type: values.type,
        deadline: values.deadline.toISOString(),
        channel_id: channelId,
      };

      await apiRequest<Task>('/tasks/', {
        method: 'POST',
        body: JSON.stringify(taskData),
      });

      message.success('Задание успешно добавлено');
      onSuccess(); 
    } catch (err) {
      if (err instanceof ApiError) {
        message.error(err.message);
      } else {
        message.error('Не удалось создать задание');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form<FormValues> layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Название задания"
        name="title"
        rules={[{ required: true, message: 'Введите название' }]}
      >
        <Input placeholder="Например: Лабораторная работа №3" />
      </Form.Item>

      <Form.Item label="Описание" name="description">
        <Input.TextArea rows={3} placeholder="Необязательно" />
      </Form.Item>

      <Form.Item
        label="Тип"
        name="type"
        rules={[{ required: true, message: 'Выберите тип' }]}
      >
        <Select
          options={[
            { value: 'lab', label: 'Лабораторная' },
            { value: 'homework', label: 'Домашняя' },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Дедлайн"
        name="deadline"
        rules={[{ required: true, message: 'Выберите дату' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button onClick={onCancel}>Отмена</Button>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Создать
        </Button>
      </div>
    </Form>
  );
};