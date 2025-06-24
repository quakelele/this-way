import { useStoredState } from '../../../shared/hooks/useStoredState';

export const useFavorites = () => {
  const [favorites, setFavorites] = useStoredState<string[]>('quran-favorites', []);

  const toggleFavorite = (ayahId: string) => {
    setFavorites((prev) =>
      prev.includes(ayahId) ? prev.filter((id) => id !== ayahId) : [...prev, ayahId]
    );
  };

  return { favorites, toggleFavorite };
};