import React from 'react'
import { Button, Divider } from 'antd'
import styles from './PaginationControls.module.scss'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'shared/hooks/useTranslation'

type Props = {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  hasNextPage?: boolean
}

export const PaginationControls: React.FC<Props> = ({ page, setPage }) => {
  const { t } = useTranslation()
  const prevPage = () => setPage(p => Math.max(1, p - 1))
  const nextPage = () => setPage(p => Math.min(604, p + 1))

  return (
    <>
      <Divider className={styles.divider} />
      <div className={styles.pagination}>
        {' '}
        <button
          className={styles.paginationButton}
          onClick={nextPage}>
          <ChevronLeft />
        </button>
        <span className={styles.pageNumber}>
          {t('Страница')} {page}
        </span>
        <button
          className={styles.paginationButton}
          disabled={page <= 1}
          onClick={prevPage}>
          <ChevronRight />
        </button>
      </div>
    </>
  )
}
