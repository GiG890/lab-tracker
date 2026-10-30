import { Alert, Button } from 'antd';

interface Props {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: Props) => (
  <div style={{ padding: '20px 0' }}>
    <Alert
      message="Ошибка загрузки"
      description={message}
      type="error"
      showIcon
      action={
        onRetry && (
          <Button size="small" danger onClick={onRetry}>
            Повторить
          </Button>
        )
      }
    />
  </div>
);