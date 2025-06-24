
import { IconProps } from 'shared/model/types';
import styles from './PlayCircle.module.scss';

const PlayCircle: React.FC<IconProps> = ({ className, ...props }) => (
  <svg viewBox="0 0 24 24" className={`${styles.icon} ${className}`} {...props}>
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    <polygon points="10,8 16,12 10,16" fill="currentColor" />
  </svg>
);

export default PlayCircle;