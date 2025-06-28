import { FC } from 'react';
import { LoadingOutlined, PauseCircleOutlined, PlayCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import styles from './AudioButton.module.scss';

interface AudioButtonProps {
  type: 'play' | 'repeat';
  size?: number;
  isActive?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
}

export const AudioButton: FC<AudioButtonProps> = ({
  type,
  size = 2.5,
  isActive = false,
  isLoading = false,
  onClick,
  disabled = false,
  title,
}) => {
  const icon = () => {
    if (type === 'play') {
      if (isLoading) return <LoadingOutlined />;
      return isActive ? <PauseCircleOutlined /> : <PlayCircleOutlined />;
    }
    return <RetweetOutlined />;
  };

  return (
    <button
      style={{ width: `${size}rem`, height: `${size}rem` }}
      className={`${styles.actionButton} ${
        isActive && type === 'play' ? styles.actionButtonPlaying : ''
      } ${isActive && type === 'repeat' ? styles.actionButtonRepeat : ''}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {icon()}
    </button>
  );
};