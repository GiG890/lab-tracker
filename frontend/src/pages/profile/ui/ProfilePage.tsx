import { Card, Progress, List, Tag, Typography } from 'antd';
import type { User, UserProgress, UpcomingDeadline } from '@/entities/user/model/types';

const { Title, Text } = Typography;

const student: User = {
  id: 1,
  name: 'Иванов Иван',
  group: 'БПИ2402', 
  role: 'Студент',
  email: 'ivanov@example.com',
  created_at: new Date().toISOString(),
};

const progress: UserProgress = {
  percent: 42,
  completed: 5,
  total: 12,
};

const upcomingDeadlines: UpcomingDeadline[] = [
  { id: 1, title: 'Лабораторная работа №1', deadline: '12.09.2026' },
  { id: 2, title: 'Домашнее задание №1', deadline: '15.09.2026' },
];

export const ProfilePage = () => {
  return (
    <div className="page-transition">
      <Title level={2}>Личный кабинет</Title>

      <Card style={{ marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>
          {student.name}
        </Title>

        <Text type="secondary">Группа: {student.group}</Text>
        <br />
        <Text type="secondary">Роль: {student.role}</Text>
      </Card>

      <Card title="Прогресс" style={{ marginBottom: 16 }}>
        <Progress percent={progress.percent} />
        <Text>Сдано {progress.completed} из {progress.total} заданий</Text>
      </Card>

      <Card title="Ближайшие дедлайны">
        <List
          dataSource={upcomingDeadlines}
          renderItem={(item) => (
            <List.Item>
              {item.title} — <Tag color="red">{item.deadline}</Tag>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};