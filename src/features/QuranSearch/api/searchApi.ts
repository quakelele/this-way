import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL_SEARCH } from 'shared/api/config';
import { SearchFormTypes, SearchResponse } from 'shared/model/types';



export const searchApi = createApi({
    reducerPath: 'searchApi',
    tagTypes: ['Aya'],
    baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL_SEARCH,
    }),
    endpoints: build => ({
      getAya: build.query<SearchResponse, SearchFormTypes  >({
        query: ({ searchText, selectedLanguage }) => ({
          url: `?q=${searchText}&lang=${selectedLanguage}`,
        //   url: `?q=${searchText}&lang=${selectedLanguage}`,
        }),

        providesTags: [{ type: 'Aya', id: 'LIST' }],
      }),
    }),
  });
  
export const { useGetAyaQuery, useLazyGetAyaQuery } = searchApi
