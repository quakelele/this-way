import { Typography } from 'antd';
import styles from './CopyButton.module.scss';
import { Check, Files } from 'lucide-react';

export const CopyButton = ({ text }: { text: string }) => {
  return (
    <Typography.Text
      className={styles.copy}
      copyable={{
        text,
        icon: [<Files size={20} /> , <Check  size={20} style={{ color: 'green' }}  />],
        tooltips: ['Скопировать', 'Скопировано!'],
      }}
    />
  );
};
