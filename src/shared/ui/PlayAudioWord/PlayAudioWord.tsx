export const playAudio = (audioUrl: string | null, cache: Map<string, HTMLAudioElement> = new Map()): void => {
  if (!audioUrl) return;
  const fullUrl = `https://audio.qurancdn.com/${audioUrl}`;
  let audio = cache.get(fullUrl);
  if (!audio) {
    audio = new Audio(fullUrl);
    cache.set(fullUrl, audio);
  }
  audio.play().catch((error) => console.error('Audio playback error:', error));
};