export type SurahType = {
  id: number
  revelation_place: string
  revelation_order: number
  bismillah_pre: false
  name_simple: string
  name_complex: string
  name_arabic: string
  verses_count: number
  pages: number[]
  translated_name: TranslatedSurah
}
export type TranslatedSurah = {
  language_name: string
  name: string
}
export type Chapters = {
    chapters: SurahType[]
}
// {
//     "id": 1,
//     "revelation_place": "makkah",
//     "revelation_order": 5,
//     "bismillah_pre": false,
//     "name_simple": "Al-Fatihah",
//     "name_complex": "Al-Fātiĥah",
//     "name_arabic": "الفاتحة",
//     "verses_count": 7,
//     "pages": [
//         1,
//         1
//     ],
//     "translated_name": {
//         "language_name": "russian",
//         "name": "Открывающая Коран"
//     }
// }
