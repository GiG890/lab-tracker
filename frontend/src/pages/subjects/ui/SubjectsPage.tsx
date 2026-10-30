import { useEffect, useState } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { apiRequest, ApiError } from '@/shared/api/client';
import type { Channel } from '@/entities/channel/model/types';
import { Loader } from '@/shared/ui/Loader';
import { ErrorState } from '@/shared/ui/ErrorState';
import { EmptyState } from '@/shared/ui/EmptyState';

const { Title } = Typography;

export const SubjectsPage = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChannels = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiRequest<Channel[]>('/channels');
      setChannels(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Не удалось загрузить список предметов');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={fetchChannels} />;
  if (channels.length === 0) return <EmptyState description="Предметов пока нет" />;

    return (
    <div className="page-transition">
      <Title level={2}>Предметы</Title>
      <Row gutter={[16, 16]}>
        {channels.map((channel) => (
          <Col key={channel.id} xs={24} sm={12} md={8}>
            <Link to={`/subjects/${channel.id}`}>
              <Card title={channel.name} hoverable className="animate-fade-in-up">
                <p style={{ margin: 0, color: '#888' }}>
                  {channel.description || 'Без описания'}
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}