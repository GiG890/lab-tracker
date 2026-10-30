import { Spin } from 'antd';

export const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
    <Spin size="large" />
  </div>
);