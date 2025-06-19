import { useEffect, useState, useMemo } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';
import { useGetMonthPrayerQuery, useGetTodayPrayerQuery } from 'entities/LocationSetting/api/locationApi';
import { useLocationWithSearch } from 'entities/LocationSetting/hooks/useLocationWithSearch';
import { getCurrentDate, adjustPrayerTime } from '../utils/helpers';
import { AladhanDay, MonthlPrayerTime, TodayPrayerTime } from '../model/types';
import { PRAYER_TYPES } from '../libs/prayerTypes';
import { RootState } from 'app/store/store';

const PRAYER_CACHE_KEY = 'prayer_times_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 часа

interface PrayerCache {
    todayPrayerTimes: TodayPrayerTime[];
    monthPrayerTimes: MonthlPrayerTime[];
    timestamp: number;
    locationKey: string;
}

export const usePrayerTimes = () => {
    const [timezone, setTimezone] = useState('');
    const [todayPrayerTimes, setTodayPrayerTimes] = useState<TodayPrayerTime[]>([]);
    const [monthPrayerTimes, setMonthPrayerTimes] = useState<MonthlPrayerTime[]>([]);
    const { month, year } = getCurrentDate();
    const { form } = useSelector((state: RootState) => state.locationForm);
    const { location } = useLocationWithSearch();

    // Ключ для проверки смены локации
    const locationKey = location
        ? `${location.lat}_${location.lng}_${location.timezone}_${form?.method || 4}`
        : '';

    // Проверка кэша в локал сторадже
    const getCachedPrayerTimes = (): PrayerCache | null => {
        const cached = localStorage.getItem(PRAYER_CACHE_KEY);
        if (!cached) return null;
        const parsed = JSON.parse(cached);
        const isCacheValid =
            parsed.timestamp &&
            Date.now() - parsed.timestamp < CACHE_DURATION &&
            parsed.locationKey === locationKey;
        return isCacheValid ? parsed : null;
    };

    // Инициализация из кэша
    useEffect(() => {
        const cached = getCachedPrayerTimes();
        if (cached) {
            setTodayPrayerTimes(cached.todayPrayerTimes);
            setMonthPrayerTimes(cached.monthPrayerTimes);
            setTimezone(location?.timezone || 'Asia/Baku');
        }
    }, [locationKey,]);

    // Параметры запроса
    const resolvedQuery = useMemo(() => {
        if (!location || !location.lat || !location.lng) return skipToken;
        const method = form?.method && !isNaN(Number(form.method)) ? Number(form.method) : 4;
        return {
            latitude: location.lat,
            longitude: location.lng,
            timezone: location.timezone || 'Asia/Baku',
            method,
            city: location.city,
        };
    }, [location, form]);

    // Запросы к API
    const {
        data: monthResponse,
        error: monthError,
        isFetching: monthFetching,
    } = useGetMonthPrayerQuery(
        resolvedQuery !== skipToken ? { ...resolvedQuery, month: Number(month), year: Number(year) } : skipToken
    );

    const {
        data: todayResponse,
        error: todayError,
        isFetching: todayFetching,
    } = useGetTodayPrayerQuery(
        resolvedQuery !== skipToken ? resolvedQuery : skipToken
    );

    // Обработка сегодняшних молитв
    const todayPrayerTimesData = useMemo(() => {
        if (!todayResponse?.data || !resolvedQuery || resolvedQuery === skipToken) return [];

        const timings = todayResponse.data.timings;
        // const timings = todayResponse.data.timings;
        if (!timings) return [];

        return PRAYER_TYPES.map(({ key, label }) => ({
            key,
            prayer: label,
            time: adjustPrayerTime(timings[key] ?? '', resolvedQuery.city, key),
            isBanner: false,
            bannerText: '',
        }));
    }, [todayResponse, resolvedQuery]);

    // Обработка месячных молитв
    const monthPrayerTimesData = useMemo(() => {
        if (!monthResponse?.data || !resolvedQuery || resolvedQuery === skipToken) return [];
        return monthResponse.data.map((day: AladhanDay) => ({
            date: day.date.readable,
            hijri: `${day.date.hijri.day} ${day.date.hijri.month.en} ${day.date.hijri.year}`,
            timings: {
                Fajr: adjustPrayerTime(day.timings.Fajr ?? '', resolvedQuery.city, 'Fajr'),
                Sunrise: adjustPrayerTime(day.timings.Sunrise ?? '', resolvedQuery.city, 'Sunrise'),
                Dhuhr: adjustPrayerTime(day.timings.Dhuhr ?? '', resolvedQuery.city, 'Dhuhr'),
                Asr: adjustPrayerTime(day.timings.Asr ?? '', resolvedQuery.city, 'Asr'),
                Maghrib: adjustPrayerTime(day.timings.Maghrib ?? '', resolvedQuery.city, 'Maghrib'),
                Isha: adjustPrayerTime(day.timings.Isha ?? '', resolvedQuery.city, 'Isha'),
            },
        }));
    }, [monthResponse, resolvedQuery]);

    // Сохранение в локал сторадж
    useEffect(() => {
        if (todayPrayerTimesData.length || monthPrayerTimesData.length) {
            setTodayPrayerTimes(todayPrayerTimesData);
            setMonthPrayerTimes(monthPrayerTimesData);
            setTimezone(
                todayResponse?.data?.meta?.timezone ||
                (resolvedQuery !== skipToken ? resolvedQuery.timezone : undefined) ||
                'Asia/Baku'
            );
            // setTimezone(todayResponse?.data?.meta?.timezone || resolvedQuery?.timezone || 'Asia/Baku');

            const cache: PrayerCache = {
                todayPrayerTimes: todayPrayerTimesData,
                monthPrayerTimes: monthPrayerTimesData,
                timestamp: Date.now(),
                locationKey,
            };
            localStorage.setItem(PRAYER_CACHE_KEY, JSON.stringify(cache));
        }
    }, [todayPrayerTimesData, monthPrayerTimesData, todayResponse, locationKey]);

    return {
        todayPrayerTimes,
        monthPrayerTimes,
        todayError,
        monthError,
        todayFetching,
        monthFetching,
        timezone,
    };
};