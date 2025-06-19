import { useEffect, useState } from 'react';

export const useAutoLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [timezone, setTimezone] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setTimezone(tz);
      },
      (err) => {
        setError(`'Геолокация не определена'${err}`);
      }
    );
  }, []);
  

  return { location, timezone, error };
};
