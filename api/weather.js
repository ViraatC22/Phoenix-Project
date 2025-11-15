exports.handler = async (event) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'OPENWEATHER_API_KEY not configured' })
    };
  }

  const params = new URLSearchParams(event.queryStringParameters || {});
  const city = params.get('city') || 'Alpharetta,US';
  const units = params.get('units') || 'imperial';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${encodeURIComponent(units)}&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'Upstream error', status: res.status })
      };
    }
    const data = await res.json();
    const normalized = {
      name: data.name,
      temp: data.main && data.main.temp,
      humidity: data.main && data.main.humidity,
      windSpeed: data.wind && data.wind.speed,
      condition: data.weather && data.weather[0] && data.weather[0].main,
      description: data.weather && data.weather[0] && data.weather[0].description,
      icon: data.weather && data.weather[0] && data.weather[0].icon
    };
    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json', 'cache-control': 'max-age=300' },
      body: JSON.stringify(normalized)
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'Proxy error' })
    };
  }
};

