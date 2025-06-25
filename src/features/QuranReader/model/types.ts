export interface Ayah {
  id: number
  number: number
  verse_key: string
  arabicText: string
  translation: string
  transliteration: string
  surahNumber: number
  surahName: string
  text_uthmani: string
  audioUrl: string
  translations: [
    {
      id: number
      resource_id: number
      text: string
    }
  ]
}

export interface QuranResponse {
  ayahs: Ayah[]
  totalPages: number
  currentPage: number
  hasMore: boolean
}
