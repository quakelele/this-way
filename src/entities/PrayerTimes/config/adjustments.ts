export const timeAdjustments: { [key: string]: number } = {
  // Qusar: 6,
  // Lankaran: -2,
  // Tynda: 3,
}

export const customOffsets: { [key: string]: { [key: string]: number } } = {
  Qusar: { Maghrib: -24, Fajr: -7, Isha: -3 },
  Baku: { Maghrib: -16 },
  Lankaran: { Fajr: 5 },
  Bologoe: { Fajr: -23, Sunrise: 1, Isha: 30 },
  Yaroslavl: {
    Dhuhr: 15,
    Fajr: 22,
    Asr: 1,
    Maghrib: 1,
    Isha: 1,
  },
}
