import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import styles from './FavoriteButton.module.scss';
import { useFavorites } from 'features/Favorites/hooks/useFavorites';

interface FavoriteButtonProps {
  ayahId: string; // Используем verse_key (например, "1:1")
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ ayahId }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(ayahId);

  return (
    <button
      className={`${styles.actionButton} ${isFavorite ? styles.actionButtonActive : ''}`}
      onClick={() => toggleFavorite(ayahId)}
      title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      {isFavorite ? <HeartFilled /> : <HeartOutlined />}
    </button>
  );
};

export default FavoriteButton;