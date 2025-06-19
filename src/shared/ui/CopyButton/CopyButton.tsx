import React from 'react';
import { Typography } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import styles from './CopyButton.module.scss';

export const CopyButton = ({ text }: { text: string }) => {
  return (
    <Typography.Text
      className={styles.copy}
      copyable={{
        text,
        icon: [<CopyOutlined />, <CheckOutlined style={{ color: 'green' }} />],
        tooltips: ['Скопировать', 'Скопировано!'],
      }}
    />
  );
};
