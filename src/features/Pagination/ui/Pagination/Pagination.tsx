import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <div className={styles.pagination}>
    <button
      className={styles.paginationButton}
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      ← Предыдущая
    </button>
    <div className={styles.paginationInfo}>
      Страница {currentPage} из {totalPages}
    </div>
    <button
      className={styles.paginationButton}
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Следующая →
    </button>
  </div>
);
