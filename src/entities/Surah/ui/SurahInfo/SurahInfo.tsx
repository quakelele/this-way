import { BookOutlined } from '@ant-design/icons';
import styles from './SurahInfo.module.scss';

interface SurahInfoProps {
  surahNumber: number;
  surahName: string;
}

export const SurahInfo: React.FC<SurahInfoProps> = ({ surahNumber, surahName }) => (
  <div className={styles.surahInfo}>
    <BookOutlined />
    Сура {surahNumber}: {surahName}
  </div>
);
