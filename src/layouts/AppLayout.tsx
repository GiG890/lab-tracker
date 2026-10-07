import { Layout, Menu } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'

const { Sider, Content } = Layout

function AppLayout() {
  const location = useLocation()

  const menuItems = [
    {
      key: '/',
      label: <Link to="/">Предметы</Link>,
    },
    {
      key: '/login',
      label: <Link to="/login">Вход</Link>,
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ color: 'white', padding: '16px', fontWeight: 'bold' }}>
          Трекер заданий
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout