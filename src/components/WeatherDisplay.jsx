import React, { useState } from "react";
import { getWeatherData } from "../services/weatherService";
import "./WeatherDisplay.css";

const WeatherDisplay = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setError(null);
    try {
      const data = await getWeatherData(city, country);
      setWeather(data);
    } catch (error) {
      setError("Failed to fetch weather data. Please try again.");
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <div className="error">{error}</div>}

      {weather && (
        <div className="weather-info">
          <h2>{`${city}, ${country}`}</h2>
          <p>Average Temperature: {weather.average_temp}°C</p>
          <div className="seven-day-forecast">
            <h3>7-Day Forecast</h3>
            <ul>
              {weather.seven_day_forecast.map((day) => (
                <li key={day.date}>
                  {day.date}: {day.temp}°C
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
