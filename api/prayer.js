export default async function handler_prayer(req, res) {
  const { type, city, country, month, year, date } = req.query



  if (!city || !country || !type) {
    console.error('Missing required parameters: city, country, or type')
    return res.status(400).json({ error: 'Missing required parameters: city, country, or type' })
  }

  let apiUrl = ''
  if (type === 'today') {
    if (!date) {
      console.error('Missing date for today')
      return res.status(400).json({ error: 'Missing date parameter for today' })
    }
    apiUrl = `http://api.aladhan.com/v1/timingsByCity/${date}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`
  } else if (type === 'month') {
    if (!month || !year) {
      console.error('Missing month or year for month')
      return res.status(400).json({ error: 'Missing month or year parameters for month' })
    }
    apiUrl = `http://api.aladhan.com/v1/calendarByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&month=${month}&year=${year}`
  } else {
    console.error('Invalid type parameter')
    return res.status(400).json({ error: 'Invalid type parameter' })
  }



  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      console.error('API error:', response.status, response.statusText)
      return res.status(response.status).json({ error: 'API request failed' })
    }
    const data = await response.json()


    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(data)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Failed to fetch prayer times' })
  }
}