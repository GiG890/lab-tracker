import { Empty } from 'antd';

interface Props {
  description?: string;
}

export const EmptyState = ({ description = 'Данных пока нет' }: Props) => (
  <Empty description={description} style={{ padding: '40px 0' }} />
);