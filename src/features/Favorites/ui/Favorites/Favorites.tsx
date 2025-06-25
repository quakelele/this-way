// import { AyahCardQuran } from 'entities';
// import styles from './Favorites.module.scss';
// import { StarOutlined } from '@ant-design/icons';
// import { useStoredState } from 'shared/hooks/useStoredState';
// // import { useGetAyahByIdQuery } from 'features/QuranReader/api/quranApi';
// import { Ayah } from 'features/QuranReader/model/types';

// const Favorites: React.FC = () => {
//   const [favorites] = useStoredState<string[]>('quran-favorites', []);
//   const favoriteAyahs: Ayah[] = favorites
//     .map((verseKey) => {
//       const { data: ayah, isLoading, error } = useGetAyahByIdQuery(verseKey);
//       if (isLoading || error || !ayah) return null;
//       return ayah;
//     })
//     .filter((ayah): ayah is Ayah => !!ayah);

//   return (
//     <div className={styles.favoritesList}>
//       {favoriteAyahs.length === 0 ? (
//         <div className={styles.emptyState}>
//           <StarOutlined className={styles.emptyStateIcon} />
//           <h3 className={styles.emptyStateTitle}>Пока нет избранных аятов</h3>
//           <p className={styles.emptyStateText}>
//             Добавляйте аяты в избранное, нажимая на сердечко.
//           </p>
//         </div>
//       ) : (
//         favoriteAyahs.map((ayah) => <AyahCardQuran key={ayah.id} ayah={ayah} />)
//       )}
//     </div>
//   );
// };

// export default Favorites;