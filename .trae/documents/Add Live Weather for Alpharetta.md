## Overview
- Weather section currently uses WeatherWidget.io in `status.html:44–47`.
- We will integrate live weather via an API key, without exposing the key in client code.

## API Choice
- Use OpenWeatherMap Current Weather API (imperial units for °F) via a secure serverless proxy.
- Endpoint pattern (server side): `https://api.openweathermap.org/data/2.5/weather?q=Alpharetta,US&units=imperial&appid=$OPENWEATHER_API_KEY`.

## Security
- Store `OPENWEATHER_API_KEY` in environment (platform secrets manager); never commit the key.
- Implement a serverless function `api/weather.js` (or minimal Node proxy) to call OpenWeatherMap and return sanitized JSON to the browser.
- Restrict API key by HTTP referrer or IP in provider settings if available.

## Changes
- HTML (`status.html`): add `#live-weather` container under Local Conditions; optionally remove third‑party widget.
- JS (`js/script.js`): fetch `/api/weather?city=Alpharetta,US` and render:
  - Location, temperature (°F), condition description/icon, wind speed, humidity.
  - Graceful error state if proxy fails; simple 5‑minute `sessionStorage` cache.
- CSS (`css/style.css`): minimal styles for weather row and icon, matching existing spacing/typography.

## Serverless Proxy
- `api/weather.js`:
  - Read `OPENWEATHER_API_KEY` from env.
  - Validate `city` input, call OpenWeatherMap, map fields needed by client.
  - Handle errors and return appropriate status codes; no logging of secrets.

## Verification
- Set `OPENWEATHER_API_KEY` in local environment.
- Start local server supporting serverless functions (or mock endpoint), open `status.html`, confirm current conditions render for Alpharetta within 1–2 seconds.
- Test error fallback by temporarily removing env and observing UI message.

## Rollback/Toggle
- Keep WeatherWidget.io block commented for quick rollback if needed.

## Deliverables
- Updated `status.html` with `#live-weather`.
- Client rendering in `js/script.js`.
- Secure proxy function `api/weather.js`.
- Instructions for setting `OPENWEATHER_API_KEY`.

Confirm and I will implement and verify end‑to‑end.