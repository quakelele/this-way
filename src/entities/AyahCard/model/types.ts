export type Ayah = {
  hizb_number: number
  id: number
  surahNumber: number
  verse_key: string
  text_uthmani: string
  translations: [
    {
      id: number
      resource_id: number
      text: string
    }
  ]
}
