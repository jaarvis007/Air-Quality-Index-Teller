import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import AqiCard from './components/AqiCard';
import { motion } from 'framer-motion';

function App() {
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aqiData, setAqiData] = useState(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const searchCity = async (city) => {
    if (!city || !city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);
    setAqiData(null);

    try {
      const response = await axios.get(`https://air-quality-index-teller-1.onrender.com/api/aqi/${encodeURIComponent(city.trim())}`);
      setAqiData(response.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error === 'DEMO_TOKEN_LIMITATION') {
        setError(err.response.data.message);
      } else if (err.response && err.response.status === 404) {
        setError('City not found. Please check the city name.');
      } else {
        setError('Failed to fetch AQI data. Please try again or check the city name.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start p-6 font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800'}`}>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        title="Toggle Theme"
      >
        {theme === 'dark' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center my-8"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
          Air Quality Index
        </h1>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Check the air quality in your city instantly.
        </p>
      </motion.div>

      <Search onSearch={searchCity} loading={loading} theme={theme} />

      <div className="mt-8 w-full flex items-center justify-center">
        <AqiCard data={aqiData} theme={theme} loading={loading} />
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-6 mb-4 rounded shadow-md max-w-md w-full flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{error}</p>
        </motion.div>
      )}

      <footer className={`mt-12 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        Developed by <a href="https://github.com/jaarvis007/Air-Quality-Index-Teller" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Aman Jain 👨🏻‍💻</a>
      </footer>
    </div>
  );
}

export default App;
