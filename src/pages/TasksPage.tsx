import { List, Tag } from 'antd'

const tasks = [
  { id: 1, title: 'Лабораторная работа №1', type: 'lab', deadline: '12.09.2026' },
  { id: 2, title: 'Домашнее задание №1', type: 'homework', deadline: '15.09.2026' },
  { id: 3, title: 'Лабораторная работа №2', type: 'lab', deadline: '19.09.2026' },
]

function TasksPage() {
  return (
    <div>
      <h1>Задания</h1>
      <List
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item>
            <div>
              <p style={{ margin: 0 }}>{task.title}</p>
              <Tag color={task.type === 'lab' ? 'blue' : 'green'}>
                {task.type === 'lab' ? 'Лабораторная' : 'Домашняя'}
              </Tag>
              <span style={{ marginLeft: 8 }}>
                Срок: {task.deadline}
              </span>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default TasksPage