import { Card, Progress, List, Tag } from 'antd'

const student = {
  name: 'Иванов Иван',
  group: 'БПИ2402',
  role: 'Студент',
}

const progress = {
  percent: 42,
  completed: 5,
  total: 12,
}

const upcomingDeadlines = [
  { id: 1, title: 'Лабораторная работа №1', deadline: '12.09.2026' },
  { id: 2, title: 'Домашнее задание №1', deadline: '15.09.2026' },
]

function ProfilePage() {
  return (
    <div>
      <h1>Личный кабинет</h1>

      <Card style={{ marginBottom: 16 }}>
        <p style={{ margin: 0, fontSize: 20, fontWeight: 'bold' }}>
          {student.name}
        </p>
        <p style={{ margin: '8px 0 0 0', color: '#888' }}>
          Группа: {student.group}
        </p>
        <p style={{ margin: '4px 0 0 0', color: '#888' }}>
          Роль: {student.role}
        </p>
      </Card>

      <Card title="Прогресс" style={{ marginBottom: 16 }}>
        <Progress percent={progress.percent} />
        <p>Сдано {progress.completed} из {progress.total} заданий</p>
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
  )
}

export default ProfilePage