import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, List, Tag, Typography, Modal } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { apiRequest, ApiError } from '@/shared/api/client';
import type { Task } from '@/entities/task/model/types';
import { Loader } from '@/shared/ui/Loader';
import { ErrorState } from '@/shared/ui/ErrorState';
import { EmptyState } from '@/shared/ui/EmptyState';
import { CreateTaskForm } from '@/features/create-task-form/ui/CreateTaskForm';
import { useAuth } from '@/app/providers/AuthProvider'; 

const { Title, Paragraph } = Typography;

export const TasksPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isTeacher } = useAuth(); 
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiRequest<Task[]>(`/tasks/`);

      const channelTasks = data.filter(t => t.channel_id === Number(id));
      setTasks(channelTasks);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Не удалось загрузить задания');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchTasks(); 
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={fetchTasks} />;

  return (
    <div className="page-transition">
      <Button 
        type="link" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/')}
        style={{ padding: 0, marginBottom: 16 }}
      >
        Назад к предметам
      </Button>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>Задания</Title>
        
        {isTeacher && (
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Добавить задание
          </Button>
        )}
      </div>

      {tasks.length === 0 ? (
        <EmptyState description="В этом предмете пока нет заданий" />
      ) : (
        <List
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item>
              <Card style={{ width: '100%' }}>
                <Title level={4} style={{ margin: 0 }}>{task.title}</Title>
                {task.description && <Paragraph type="secondary">{task.description}</Paragraph>}
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <Tag color={task.type === 'lab' ? 'blue' : 'green'}>
                    {task.type === 'lab' ? 'Лабораторная' : 'Домашняя'}
                  </Tag>
                  {task.deadline && (
                    <Tag color="red">
                      Срок: {new Date(task.deadline).toLocaleDateString()}
                    </Tag>
                  )}
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}

      <Modal
        title="Новое задание"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <CreateTaskForm
          channelId={Number(id)}
          onSuccess={handleSuccess}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};