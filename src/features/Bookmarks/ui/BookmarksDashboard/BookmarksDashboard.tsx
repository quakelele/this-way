import React from 'react';
import styles from './BookmarksDashboard.module.scss';
import { BookmarkStatistic } from '../BookmarkStatistic/BookmarkStatistic';
import { BookmarkFilters } from '../BookmarkFilters/BookmarkFilters';
import { BookmarksList } from '../BookmarksList/BookmarksList';


export const BookmarksDashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 >Мои закладки</h1>
          <p>Управляйте сохраненными аятами, аудио и заметками</p>
        </div>

        <BookmarkStatistic />
        <BookmarkFilters />
        <BookmarksList />




      </div>
    </div>
  );
};