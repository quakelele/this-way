export interface Ayah {
    id: number;
    number: number;
    arabicText: string;
    translation: string;
    transliteration: string;
    surahNumber: number;
    surahName: string;
    audioUrl: string;
  }
  
  export interface QuranResponse {
    ayahs: Ayah[];
    totalPages: number;
    currentPage: number;
    hasMore: boolean;
  }