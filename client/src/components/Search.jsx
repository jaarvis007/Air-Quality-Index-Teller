import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Search = ({ onSearch, loading, theme }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto mb-8"
    >
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name (e.g., Shanghai)"
          className={`w-full px-6 py-4 text-lg border-2 rounded-full shadow-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-900 placeholder-gray-500' 
              : 'bg-white text-gray-700 border-transparent focus:border-blue-500 focus:ring-blue-200'
          }`}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-300 shadow-md"
        >
          {loading ? (
            <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default Search;
