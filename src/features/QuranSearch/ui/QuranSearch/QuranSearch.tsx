import { useState, useEffect, useRef } from 'react'
import styles from './QuranSearch.module.scss'
import { QuranSearchForm } from '../QuranSearchForm/QuranSearchForm'
import { SearchFormTypes } from 'shared/model/types'
import { useGetAyaInfiniteQuery } from 'features/QuranSearch/api/searchApi'
import { AyahCard } from 'entities/AyahCard/ui/AyahCard/AyahCard'
import { AyahCardSkeleton } from 'shared/ui/Skeletons/AyahCardSkeleton/AyahCardSkeleton'
import { NavigationButtons } from 'features/NavigationButtons/NavigationButtons'

export const QuranSearch = () => {
  const [query, setQuery] = useState<SearchFormTypes>()

  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetAyaInfiniteQuery(query as SearchFormTypes, {
    skip: !query,
  })

  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
console.log(data)
console.log(data)
  const allResults = data?.pages.flatMap(page => page.search.results) ?? []
  const totalResults = data?.pages[0]?.search?.total_results
  const searchText = data?.pages[0]?.search?.query || ''

  useEffect(() => {
    if (!hasNextPage || isFetching) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage()
        }
      },
      {
        rootMargin: '300px',
        threshold: 0.5,
      }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    observerRef.current = observer

    return () => observer.disconnect()
  }, [hasNextPage, isFetching, fetchNextPage])

  const renderResults = () => {
    if (isFetching && !allResults.length) {
      return <AyahCardSkeleton />
    }

    if (!allResults.length && !isFetching) {
      return (
        <div className={styles.emptyState}>
          <h3 className={styles.emptyTitle}>Начните поиск</h3>
          <p className={styles.emptyText}>
            Введите слово или фразу для поиска в Коране
          </p>
        </div>
      )
    }

    return (
      <>
        {allResults.map(quran => (
          <AyahCard key={quran.verse_id} {...quran} />
        ))}
        {hasNextPage && (
          <div ref={loadMoreRef} className={styles.loadMoreTrigger} />
        )}
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1>Поиск в Коране</h1>
          <p>Найдите аяты и получите духовное руководство</p>
        </header>

        <QuranSearchForm setQuery={setQuery} isLoading={isFetching} />
        <NavigationButtons search={searchText} />

        {data && (
          <section className={styles.results}>
            <h2 className={styles.resultsTitle}>
              Результаты поиска ({totalResults})
            </h2>
            {renderResults()}
          </section>
        )}
      </div>
    </div>
  )
}

// import { useEffect, useRef, useState } from 'react';

// import styles from './QuranSearch.module.scss';
// import { QuranSearchForm } from '../QuranSearchForm/QuranSearchForm';
// import { SearchFormTypes } from 'shared/model/types';
// import { useGetAyaQuery } from 'features/QuranSearch/api/searchApi';
// import { AyahCard } from 'entities/AyahCard/ui/AyahCard/AyahCard';
// import { AyahCardSkeleton } from 'shared/ui/Skeletons/AyahCardSkeleton/AyahCardSkeleton';
// import { NavigationButtons } from 'features/NavigationButtons/NavigationButtons';

// export const QuranSearch = () => {
//   const [query, setQuery] = useState<SearchFormTypes | undefined>(undefined);
//   const [page, setPage] = useState(1);
//   const { data, isFetching, isLoading } = useGetAyaQuery(
//     { ...query, page },
//     {
//       skip: !query,
//       refetchOnMountOrArgChange: true, // важно!
//     }
//   );

//   const [allResults, setAllResults] = useState<any[]>([]);
//   const loaderRef = useRef<HTMLDivElement | null>(null);

//   const totalPages = data?.search.total_pages;
//   useEffect(() => {
//     if (page === 1 && data?.search?.results) {
//       setAllResults(data.search.results);
//     } else if (data?.search?.results) {
//       setAllResults(prev => [...prev, ...data.search.results]);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (!loaderRef.current || !query) return;

//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !isFetching && page < totalPages!) {
//         setPage(prev => prev + 1);
//       }
//     });

//     observer.observe(loaderRef.current);

//     return () => {
//       if (loaderRef.current) observer.unobserve(loaderRef.current);
//     };
//   }, [data, isFetching, page, query]);

//   useEffect(() => {
//     console.log('current page:', page);
//   }, [page]);

//   const handleNewSearch = (newQuery: SearchFormTypes) => {
//     setQuery(newQuery);
//     setPage(1);
//     setAllResults([]);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.content}>
//         <div className={styles.header}>
//           <h1>Поиск в Коране</h1>
//           <p>Найдите аяты и получите духовное руководство</p>
//         </div>

//         <QuranSearchForm
//           setQuery={handleNewSearch}
//           isLoading={isFetching}
//         />

//         <NavigationButtons search={data?.search.query || ''} />

//         {query && (
//           <div className={styles.results}>
//             <h2 className={styles.resultsTitle}>
//               Результаты поиска ({data?.search?.total_results || 0})
//             </h2>

//             {allResults.map(quran => (
//               <AyahCard key={quran.verse_id} {...quran} />
//             ))}

//             {isFetching && <AyahCardSkeleton />}

//             <div ref={loaderRef} style={{ height: '1px' }} />

//             {!allResults.length && !isFetching && (
//               <div className={styles.emptyState}>
//                 <h3 className={styles.emptyTitle}>Начните поиск</h3>
//                 <p className={styles.emptyText}>
//                   Введите слово или фразу для поиска в Коране
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// import { useState } from 'react'

// import styles from './QuranSearch.module.scss'
// import { QuranSearchForm } from '../QuranSearchForm/QuranSearchForm'
// import { SearchFormTypes } from 'shared/model/types'
// import { useGetAyaQuery } from 'features/QuranSearch/api/searchApi'
// import { AyahCard } from 'entities/AyahCard/ui/AyahCard/AyahCard'
// import { AyahCardSkeleton } from 'shared/ui/Skeletons/AyahCardSkeleton/AyahCardSkeleton'
// import { NavigationButtons } from 'features/NavigationButtons/NavigationButtons'

// export const QuranSearch = () => {
//   const [query, setQuery] = useState<SearchFormTypes | undefined>(undefined)
//   const [page, setPage] = useState(1)
//   const { data, isFetching } = useGetAyaQuery(query as SearchFormTypes, {
//     skip: !query,
//   })

//   return (
//     <div className={styles.container}>
//       <div className={styles.content}>
//         <div className={styles.header}>
//           <h1>Поиск в Коране</h1>
//           <p>Найдите аяты и получите духовное руководство</p>
//         </div>

//         <QuranSearchForm
//           setQuery={setQuery}
//           isLoading={isFetching}
//         />
//         <NavigationButtons search={data?.search.query || ''} />

//         {data && (
//           <div className={styles.results}>
//             <h2 className={styles.resultsTitle}>
//               Результаты поиска ({data?.search?.total_results})
//             </h2>
//             {isFetching ? (
//               <AyahCardSkeleton />
//             ) : (
//               data?.search?.results.map(quran => (
//                 <AyahCard
//                   key={quran.verse_id}
//                   {...quran}
//                 />
//               ))
//             )}
//             {!data?.search?.results?.length && !isFetching && (
//               <div className={styles.emptyState}>
//                 <h3 className={styles.emptyTitle}>Начните поиск</h3>
//                 <p className={styles.emptyText}>
//                   Введите слово или фразу для поиска в Коране
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

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
