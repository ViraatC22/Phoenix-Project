document.addEventListener('DOMContentLoaded', async () => {
  const el = document.getElementById('live-weather');
  if (!el) return;
  const city = el.dataset.city || 'Alpharetta,US';
  const cacheKey = `weather:${city}`;
  const now = Date.now();
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (parsed.ts && now - parsed.ts < 5 * 60 * 1000) {
      renderWeather(el, parsed.data);
      return;
    }
  }
  let data = await fetchFromProxy(city).catch(() => null);
  if (!data) {
    const key = window.OPENWEATHER_API_KEY || el.dataset.apikey || sessionStorage.getItem('OPENWEATHER_API_KEY') || localStorage.getItem('OPENWEATHER_API_KEY') || '';
    data = key ? await fetchDirect(city, key).catch(() => null) : null;
  }
  if (data) {
    sessionStorage.setItem(cacheKey, JSON.stringify({ ts: now, data }));
    renderWeather(el, data);
  } else {
    el.textContent = 'Weather data not available right now.';
  }
});

async function fetchFromProxy(city) {
  const url = `/api/weather?city=${encodeURIComponent(city)}&units=imperial`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('bad');
  return res.json();
}

async function fetchDirect(city, key) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=imperial&appid=${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('bad');
  const raw = await res.json();
  return {
    name: raw.name,
    temp: raw.main && raw.main.temp,
    humidity: raw.main && raw.main.humidity,
    windSpeed: raw.wind && raw.wind.speed,
    condition: raw.weather && raw.weather[0] && raw.weather[0].main,
    description: raw.weather && raw.weather[0] && raw.weather[0].description,
    icon: raw.weather && raw.weather[0] && raw.weather[0].icon
  };
}

function renderWeather(el, data) {
  const t = Math.round(data.temp);
  const iconUrl = data.icon ? `https://openweathermap.org/img/wn/${data.icon}@2x.png` : '';
  el.innerHTML = `
    <div class="live-weather-row">
      <div class="live-weather-main">
        <div class="live-weather-location">${data.name}</div>
        <div class="live-weather-temp">${t}°F</div>
        <div class="live-weather-desc">${capitalize(data.description || data.condition || '')}</div>
      </div>
      <div class="live-weather-extra">
        <div class="live-weather-wind">Wind ${Math.round(data.windSpeed)} mph</div>
        <div class="live-weather-humidity">Humidity ${data.humidity}%</div>
      </div>
      ${iconUrl ? `<img class="live-weather-icon" src="${iconUrl}" alt="">` : ''}
    </div>
  `;
}

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
