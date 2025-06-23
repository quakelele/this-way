
import { useState, useEffect } from 'react';

 type Location = {
  lat: number;
  lng: number;
  timezone: string;
  city: string;
  address?: Record<string, string>;
  isAuto: boolean;
};
const LOCAL_STORAGE_KEY = 'prayer_location';

export const useLocationWithSearch = (onLocationChange?: (loc: Location) => void) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setLocation(parsed);
      onLocationChange?.(parsed);
    } else {
      autoDetect();
    }
  }, []);

  const autoDetect = async () => {
    setLoading(true);
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = pos.coords;
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            'User-Agent': 'myapp@example.com',
          },
        }
      );
      const data = await res.json();

      

      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.county ||
        'Ваше местоположение';

      // const loc: Location = {
      //   lat: latitude,
      //   lng: longitude,
      //   timezone: tz || 'Asia/Baku', // Дефолтная зона
      //   city,
      //   isAuto: true,
      // };

      const loc: Location = {
        lat: latitude,
        lng: longitude,
        timezone: tz || 'Asia/Baku',
        city,
        isAuto: true,
        address: data.address, // сохраняем всё
      };


      setLocation(loc);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loc));
      onLocationChange?.(loc);
      setError(null);
    } catch {
      setError('Не удалось определить местоположение');
    } finally {
      setLoading(false);
    }
  };

  const searchCity = async (city: string) => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError('Город не указан');
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          city
        )}&limit=1`,
        {
          headers: {
            'User-Agent': 'myapp@example.com',
          },
        }
      );
      const data = await res.json();
      if (!data.length) {
        setError('Город не найден');
        setLoading(false);
        return;
      }

      const place = data[0];
      const tz = city.toLowerCase() === 'баку' ? 'Asia/Baku' : Intl.DateTimeFormat().resolvedOptions().timeZone;


      const loc: Location = {
        lat: parseFloat(place.lat),
        lng: parseFloat(place.lon),
        timezone: tz || 'Asia/Baku',
        city: city,
        isAuto: false,
      };

      setLocation(loc);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loc));
      onLocationChange?.(loc);
      setError(null);
    } catch {
      setError('Ошибка при поиске города');
    } finally {
      setLoading(false);
    }
  };

  return { location, error, loading, searchCity, autoDetect };
};