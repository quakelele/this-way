type Params = {
  lat: number
  lng: number
  timezone: string
  city: string
  address?: Record<string, string>
  isAuto: boolean
}

export const getReadableLocation = (loc: Params | null): string => {
  if (!loc) return ''
  const a = loc.address || {}
  return (
    a.city ||
    a.town ||
    a.village ||
    a.state ||
    loc.city ||
    'Ваше местоположение'
  )
}
