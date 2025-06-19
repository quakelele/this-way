export default async function handler(req, res) {
  const { q, lang } = req.query; 
  const url = `https://alquran-api.pages.dev/api/quran/search?q=${q}&lang=${lang}`;
  
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('API error:', response.status, response.statusText);
      return res.status(response.status).json({ error: 'API request failed' });
    }
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}