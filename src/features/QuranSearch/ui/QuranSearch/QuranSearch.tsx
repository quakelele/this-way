import { useState } from 'react'

import styles from './QuranSearch.module.scss'
import { QuranSearchForm } from '../QuranSearchForm/QuranSearchForm'
import { SearchFormTypes } from 'shared/model/types'
import { useGetAyaQuery } from 'features/QuranSearch/api/searchApi'
import { AyahCard } from 'entities/AyahCard/ui/AyahCard/AyahCard'
import { AyahCardSkeleton } from 'shared/ui/Skeletons/AyahCardSkeleton/AyahCardSkeleton'
import { NavigationButtons } from 'features/NavigationButtons/NavigationButtons'

export const QuranSearch = () => {
  const [query, setQuery] = useState<SearchFormTypes | undefined>(undefined)
  const { data: searchData, isFetching, } = useGetAyaQuery(query as SearchFormTypes, {
    skip: !query,
  })

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 >Поиск в Коране</h1>
          <p >
            Найдите аяты и получите духовное руководство
          </p>
        </div>

        <QuranSearchForm

          setQuery={setQuery}
          isLoading={isFetching}
        />
        <NavigationButtons search={searchData?.query || ''} />

        {searchData && (
          <div className={styles.results}>
            <h2 className={styles.resultsTitle}>
              Результаты поиска ({searchData?.search?.total_results})
            </h2>
            {isFetching ? <AyahCardSkeleton /> : (searchData?.search?.results.map((quran, index) => (
              <AyahCard
                search={searchData?.query}
                key={index}
                {...quran}
              />
            )))}
            {!searchData?.search?.results?.length && !isFetching && (
              <div className={styles.emptyState}>

                <h3 className={styles.emptyTitle}>Начните поиск</h3>
                <p className={styles.emptyText}>Введите слово или фразу для поиска в Коране</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// {/* Восстановить при необходимости


//   "search": {
//     "query": "пророк",
//       "total_results": 86,
//         "current_page": 1,
//           "total_pages": 86,
//             "results": [
//               {
//                 "verse_key": "33:53",
//                 "verse_id": 3586,
//                 "text": "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ لَا تَدْخُلُوا۟ بُيُوتَ ٱلنَّبِىِّ إِلَّآ أَن يُؤْذَنَ لَكُمْ إِلَىٰ طَعَامٍ غَيْرَ نَـٰظِرِينَ إِنَىٰهُ وَلَـٰكِنْ إِذَا دُعِيتُمْ فَٱدْخُلُوا۟ فَإِذَا طَعِمْتُمْ فَٱنتَشِرُوا۟ وَلَا مُسْتَـْٔنِسِينَ لِحَدِيثٍ ۚ إِنَّ ذَٰلِكُمْ كَانَ يُؤْذِى ٱلنَّبِىَّ فَيَسْتَحْىِۦ مِنكُمْ ۖ وَٱللَّهُ لَا يَسْتَحْىِۦ مِنَ ٱلْحَقِّ ۚ وَإِذَا سَأَلْتُمُوهُنَّ مَتَـٰعًا فَسْـَٔلُوهُنَّ مِن وَرَآءِ حِجَابٍ ۚ ذَٰلِكُمْ أَطْهَرُ لِقُلُوبِكُمْ وَقُلُوبِهِنَّ ۚ وَمَا كَانَ لَكُمْ أَن تُؤْذُوا۟ رَسُولَ ٱللَّهِ وَلَآ أَن تَنكِحُوٓا۟ أَزْوَٰجَهُۥ مِنۢ بَعْدِهِۦٓ أَبَدًا ۚ إِنَّ ذَٰلِكُمْ كَانَ عِندَ ٱللَّهِ عَظِيمًا",
//                 "highlighted": null,
//                 "words": [],
//                 "translations": [
//                   {
//                     "text": "О те, которые уверовали! Не входите в дома \u003Cem\u003EПророка\u003C/em\u003E, если только вас не пригласят на трапезу, но не дожидайтесь ее приготовления (не приходите заранее). Если же вас пригласят, то входите, а когда поедите, то расходитесь и не усаживайтесь для разговоров. Этим вы причиняете неудобство \u003Cem\u003EПророку\u003C/em\u003E. Он стыдится вас, но Аллах не стыдится истины. Если вы просите у них (жен \u003Cem\u003EПророка\u003C/em\u003E) какую-либо утварь, то просите у них через завесу. Так будет чище для ваших сердец и их сердец. Вам не подобает ни обижать Посланника Аллаха, ни жениться на его женах после его смерти. Воистину, это является великим грехом перед Аллахом.",
//                     "resource_id": 45,
//                     "name": "Russian Translation ( Elmir Kuliev )",
//                     "language_name": "russian"
//                   }
//                 ]
//               }
//             ]
//   }
// }