import React from 'react';
import { Typography } from 'antd';
import {  CheckOutlined } from '@ant-design/icons';
import styles from './CopyButton.module.scss';
import { Files } from 'lucide-react';

export const CopyButton = ({ text }: { text: string }) => {
  return (
    <Typography.Text
      className={styles.copy}
      copyable={{
        text,
        icon: [<Files size={20} /> , <CheckOutlined size={20} style={{ color: 'green' }} />],
        tooltips: ['Скопировать', 'Скопировано!'],
      }}
    />
  );
};
