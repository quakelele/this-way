export type LocationData = {
    code: number
    status: string
    data: {
      date: {
        gregorian: { date: string, format: string, day: string, weekday: { en: string }, month: { number: number, en: string }, year: string },
        hijri: { date: string, format: string, day: string, weekday: { en: string, ar: string }, month: { number: number, en: string, ar: string, days: number }, year: string, holydays: [], }
      }
      readable: string
      timestamp: string
    },
    meta: {
      latitude: number
      longtitude: number
      method: { id: number, name: string, }
      timezone: string
    }
    timings: {
      Fajr: string,
      Dhuhr: string
      Asr: string
      Maghrib: string
      Isha: string
      Sunset: string
      Sunrise: string
      Midnight: string
      Lastthird: string
      Imsak: string
    }
  }