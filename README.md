
# Air Quality Search — AQI Search Engine

A small full-stack project that lets users search Air Quality Index (AQI) by city name.  
It includes:
- A backend web service (Node.js + Express) that proxies and caches requests to a vendor AQI API.
- A frontend (React) that allows users to search cities and view rich AQI details and visual cues.

---
# Live URL : https://air-quality-index-teller.vercel.app/

---

## Demo / Features

- Search for a city by name (partial or full).
- Show the city location, AQI value, dominant pollutant, time of measurement.
- Color-coded AQI display and short health message.
- Caching layer on the backend to reduce vendor API calls and speed repeated queries.
- Simple, responsive UI with a searchable input and result cards.

---

## Architecture & Tech Stack

- **Backend**: Node.js, Express, axios, node-cache (or a small LRU cache)
- **Frontend**: React (Create React App or Vite), fetch/axios, minimal CSS (or Tailwind/Bootstrap optional)
- **API Provider (recommended)**: [AQICN API (aqicn.org)](https://aqicn.org/api/) — provides city AQI data globally.
---

## API Provider / Choice & Notes

**Recommended provider**: **AQICN (aqicn.org)**

- Why: Global AQI coverage, widely used, free tier available (requires token).
- How to get token: sign up at https://aqicn.org/data-platform/token/ and get a token/API key.
- The backend acts as a proxy to avoid exposing the token to the frontend.

---

## Screenshots

<img width="1426" height="776" alt="Screenshot 2025-11-25 at 11 38 31 AM" src="https://github.com/user-attachments/assets/b97a6e67-b032-4c8f-a4cf-08daf87b5d87" />
<img width="1426" height="776" alt="Screenshot 2025-11-25 at 11 38 41 AM" src="https://github.com/user-attachments/assets/ec36e308-81cb-41f9-a1b2-9055fdbe0e6f" />
<img width="1420" height="775" alt="Screenshot 2025-11-25 at 11 39 02 AM" src="https://github.com/user-attachments/assets/735816d1-7bd1-43db-be22-821c44fcda56" />
<img width="1411" height="776" alt="Screenshot 2025-11-25 at 11 39 16 AM" src="https://github.com/user-attachments/assets/408672c7-47b9-4908-bc87-e42da5fa270b" />



