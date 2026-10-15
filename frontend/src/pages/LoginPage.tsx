import { Button, Card, Form, Input } from 'antd'

function LoginPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
      <Card title="Вход" style={{ width: 400 }}>
        <Form layout="vertical">
          <Form.Item label="Логин" name="login">
            <Input placeholder="Введите логин" />
          </Form.Item>
          <Form.Item label="Пароль" name="password">
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default LoginPage