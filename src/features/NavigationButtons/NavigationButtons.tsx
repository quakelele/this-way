import  { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import styles from './NavigationButtons.module.scss';

type Props = {
  search: string;
};

export const NavigationButtons = ({ search }: Props) => {
  const [highlights, setHighlights] = useState<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // При смене поиска — ищем все подсвеченные элементы и сбрасываем индекс
  useEffect(() => {
    const found = Array.from(document.querySelectorAll('.highlighted')) as HTMLElement[];
    setHighlights(found);
    setCurrentIndex(found.length ? 0 : -1);
  }, [search]);

  // Функция прокрутки к элементу по индексу
  const scrollTo = (index: number) => {
    if (index < 0 || index >= highlights.length) return;
    const el = highlights[index];
    if (!el) return;

    const screenMiddle = window.innerHeight / 2;
    const elTop = el.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({ top: elTop - screenMiddle, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  // Обработка кликов по кнопкам вверх/вниз
  const handleScroll = (direction: 'up' | 'down') => {
    if (!highlights.length) return;

    let newIndex = currentIndex;

    if (direction === 'down') {
      newIndex = Math.min(currentIndex + 1, highlights.length - 1);
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    scrollTo(newIndex);
  };

  // Отслеживаем скролл мышью, чтобы обновлять currentIndex по видимости элементов
  useEffect(() => {
    if (!highlights.length) return;

    const onScroll = () => {
      const screenMiddle = window.innerHeight / 2;
      let closestIndex = -1;
      let closestDistance = Infinity;

      highlights.forEach((el, i) => {
        const elTop = el.getBoundingClientRect().top;
        const distance = Math.abs(elTop - screenMiddle);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      if (closestIndex !== currentIndex) {
        setCurrentIndex(closestIndex);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Запускаем сразу, чтобы зафиксировать индекс при загрузке
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [highlights, currentIndex]);

  if (!highlights.length) return null;

  return (
    <div className={styles.navButtons}>
      <button className={styles.navButton} onClick={() => handleScroll('up')} aria-label="Вверх">
        <ArrowUp size={16} />
      </button>

      <div className={styles.counter}>
        {currentIndex >= 0 ? currentIndex + 1 : 0} / {highlights.length}
      </div>

      <button className={styles.navButton} onClick={() => handleScroll('down')} aria-label="Вниз">
        <ArrowDown size={16} />
      </button>
    </div>
  );
};
