import { Card, Col, Row } from 'antd'

const subjects = [
  { id: 1, name: 'Математика', tasksCount: 4 },
  { id: 2, name: 'Физика', tasksCount: 3 },
  { id: 3, name: 'Программирование', tasksCount: 6 },
]

function SubjectsPage() {
  return (
    <div>
      <h1>Предметы</h1>
      <Row gutter={[16, 16]}>
        {subjects.map((subject) => (
          <Col key={subject.id} xs={24} sm={12} md={8}>
            <Card title={subject.name}>
              <p>Заданий: {subject.tasksCount}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default SubjectsPage