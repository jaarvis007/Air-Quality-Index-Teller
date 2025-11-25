const axios = require('axios');
const { LRUCache } = require('lru-cache');

const cache = new LRUCache({
  max: 100, // Max 100 entries
  ttl: 1000 * 60 * 60, // 1 hour TTL
});

const AQICN_TOKEN = process.env.AQICN_TOKEN; 

const getAqi = async (city ) => {
  const token =  process.env.AQICN_TOKEN;
  const cacheKey = `${city.toLowerCase()}_${token}`
  
  
  if (cache.has(cacheKey)) {
    console.log(`Cache hit for ${city}`);
    return { ...cache.get(cacheKey), fromCache: true };
  }

  try {
    const response = await axios.get(`https://api.waqi.info/feed/${city}/?token=${token}`);
    
    if (response.data.status !== 'ok') {
      throw new Error(response.data.data);
    }

    const data = response.data.data;
    cache.set(cacheKey, data);
    return { ...data, fromCache: false };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAqi,
};
