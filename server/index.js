const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const aqiService = require('./services/aqiService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/aqi/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const data = await aqiService.getAqi(city);
    res.json(data);
  } catch (error) {
    console.error(error);
    if (error.message === 'DEMO_TOKEN_LIMITATION') {
      res.status(403).json({ error: 'DEMO_TOKEN_LIMITATION', message: 'The demo API token only supports searching for "Shanghai". Please update the server/.env file with a valid AQICN token.' });
    } else {
      res.status(500).json({ error: 'Failed to fetch AQI data' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
