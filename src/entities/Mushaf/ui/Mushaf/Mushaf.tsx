import React, { useEffect, useState } from 'react';
import { useGetMushafPageQuery } from 'entities/Mushaf/api/mushafApi';
import { quranSurahPages } from 'entities/Mushaf/lib/quranSurahPages';
import styles from './Mushaf.module.scss';
import { groupByLine } from 'entities/Mushaf/utils/groupByLine';
import { MushafPageData } from 'entities/Mushaf/model/types';
import { PaginationControls } from '../PaginationControls/PaginationControls';
import { BasmalaSvg } from 'shared/ui/BasmalaSvg/BasmalaSvg';
import { MushafLine } from '../MushafLine/MushafLine';

type Props = {
  chapterId: number;
};






export const Mushaf: React.FC<Props> = ({ chapterId }) => {
  const [page, setPage] = useState(quranSurahPages[chapterId] || 1);
  const { data, isLoading, error } = useGetMushafPageQuery(page);

  useEffect(() => {
    setPage(quranSurahPages[chapterId] || 1);
  }, [chapterId]);

  if (isLoading) return <div className={styles.loading}>Загрузка...</div>;
  if (error || !data) return <div className={styles.error}>Ошибка загрузки данных</div>;

  const { verses, pagination }: MushafPageData = data;
  const groupedByLine = groupByLine(verses);
  const sortedLines = Object.keys(groupedByLine)
    .map(Number)
    .sort((a, b) => a - b);
console.log(data)
  return (
    <div className={styles.mushafContainer}>
      <div className={styles.pageContainer}>
        {chapterId === 1 && page === 1 && <BasmalaSvg />}
        <div className={styles.page}>
          {sortedLines.map((lineNumber) => (
            <MushafLine key={lineNumber} words={groupedByLine[lineNumber]} />
          ))}

        </div>
      </div>
      <PaginationControls
        page={page}
        setPage={setPage}
        hasNextPage={!!pagination.next_page && page < 604}
      />
    </div>
  );
};
