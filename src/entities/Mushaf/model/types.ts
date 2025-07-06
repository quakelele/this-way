export type MushafWord = {
    id: number;
    position: number;
    audio_url: string | null;
    char_type_name: string;
    text_uthmani: string;
    line_number: number;
    translation: { text: string; language_name: string };
    transliteration: { text: string | null; language_name: string };
    verse_number: number;
    isLastInVerse?: boolean; // ← добавь сюда
  };
  
  
  export interface MushafVerse {
    id: number;
    verse_number: number;
    verse_key: string;
    text_uthmani: string;
    page_number: number;
    words: MushafWord[];
  }
  
  export interface MushafPageData {
    verses: MushafVerse[];
    pagination: {
      per_page: number;
      current_page: number;
      next_page: number | null;
      total_pages: number;
      total_records: number;
    };
  }