// src/entities/prayer/api/prayer-api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AladhanMonthResponse, AladhanResponse, AladhanTodayResponse, PrayerMonthQuery, PrayerQueryBase } from 'entities/PrayerTimes/model/types';

// type LocationApiResponse = {

// }

export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.aladhan.com/v1/' }),
  endpoints: (builder) => ({
    getTodayPrayer: builder.query<AladhanTodayResponse, PrayerQueryBase>({
      query: ({ latitude, longitude, method, timezone }) =>
        `timings?latitude=${latitude}&longitude=${longitude}&method=${method}&timezonestring=${timezone}`,
    }),
    getMonthPrayer: builder.query<AladhanMonthResponse, PrayerMonthQuery>({
      query: ({ latitude, longitude, method, timezone, month, year }) =>
        `calendar?latitude=${latitude}&longitude=${longitude}&method=${method}&timezonestring=${timezone}&month=${month}&year=${year}`,
    }),
  }),
});

export const { useGetTodayPrayerQuery, useGetMonthPrayerQuery } = locationApi;
