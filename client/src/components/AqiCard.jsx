import React from 'react';
import { motion } from 'framer-motion';

const getAqiColor = (aqi) => {
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  if (aqi <= 300) return 'bg-purple-500';
  return 'bg-red-900';
};

const getAqiStatus = (aqi) => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

const AqiCard = ({ data, theme }) => {
  if (!data) return null;

  const { aqi, city, dominentpol, time, iaqi } = data;
  const colorClass = getAqiColor(aqi);
  const status = getAqiStatus(aqi);

  const cardBg = theme === 'dark' ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-white/20';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const subTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const detailBg = theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-2xl mx-auto backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border ${cardBg}`}
    >
      <div className={`${colorClass} p-8 text-white text-center relative overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
        <h2 className="text-3xl font-bold mb-2 relative z-10">{city.name}</h2>
        <div className="text-9xl font-black mb-2 relative z-10">{aqi}</div>
        <div className="text-2xl font-medium relative z-10">{status}</div>
        <p className="mt-4 opacity-80 relative z-10">Last updated: {time.s}</p>
      </div>

      <div className="p-8">
        <h3 className={`text-xl font-semibold mb-6 ${textColor}`}>Pollutants & Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className={`${detailBg} p-4 rounded-xl shadow-sm`}>
            <span className={`block text-sm mb-1 ${subTextColor}`}>Dominant Pollutant</span>
            <span className={`text-lg font-bold uppercase ${textColor}`}>{dominentpol}</span>
          </div>
          {iaqi && Object.entries(iaqi).map(([key, value]) => (
            <div key={key} className={`${detailBg} p-4 rounded-xl shadow-sm`}>
              <span className={`block text-sm mb-1 uppercase ${subTextColor}`}>{key}</span>
              <span className={`text-lg font-bold ${textColor}`}>{value.v}</span>
            </div>
          ))}
        </div>

        {data.forecast && data.forecast.daily && (
          <div>
            <h3 className={`text-xl font-semibold mb-6 ${textColor}`}>Forecast (PM2.5)</h3>
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-4">
                {data.forecast.daily.pm25 && data.forecast.daily.pm25.map((day, index) => (
                  <div key={index} className={`${detailBg} p-4 rounded-xl shadow-sm min-w-[120px] text-center`}>
                    <span className={`block text-sm mb-1 ${subTextColor}`}>{day.day}</span>
                    <span className={`block text-lg font-bold ${textColor}`}>{day.avg}</span>
                    <span className="text-xs text-gray-400">Avg AQI</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AqiCard;
