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

export type Verses = {
  hizb_number: number
  id: number
  juz_number: number
  manzil_number: number
  page_number: number
  rub_el_hizb_number: number
  ruku_number: number
  text_uthmani: string
  translations: Translations[]
  verse_key: string
  verse_number: number
}
export type Translations = {
  id: number
  resource_id: number
  text: string
}

export type GetAyaResponse = {
  verses: Verses[]
  pagination: Pagination
}

export type Pagination = {
  per_page: number
  current_page: number
  next_page: number
  total_pages: number
  total_records: number
}

export interface GetAyaArg {
  chapter_id: number

}

export type AyahTransliterationResponse = {
  data: {
    edition: {
      identifier: string
      language: string
      name: string
      englishName: string
      format: string
      type: string
      direction: string
    }
    surah: {
      number: number
      name: string
      englishName: string
      englishNameTranslation: string
      numberOfAyahs: number
      revelationType: string
    }
    text: string
    numberInSurah: number
    number: number
  }
}

export type AyahAudioResponse = {
  data: {
    audioSecondary: [string]
    edition: {
      identifier: string
      language: string
      name: string
      englishName: string
      format: string
      type: string
      direction: string
    }
    surah: {
      number: number
      name: string
      englishName: string
      englishNameTranslation: string
      numberOfAyahs: number
      revelationType: string
    }
    numberInSurah: number
    juz: number
    manzil: number
    page: number
    ruku: number
    hizbQuarter: number
    sajda: false
    text: string
  }
}
