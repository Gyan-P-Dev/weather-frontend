import React, { useState, useEffect } from "react";
import { getWeatherData } from "../services/weatherService";
import { FaSearch } from "react-icons/fa";
import "./WeatherDisplay.css";
import image from "../assets/cloud.png";
import countryList from "react-select-country-list";

const WeatherDisplay = () => {
  const [city, setCity] = useState("");
  const countries = countryList().getData();
  const [country, setCountry] = useState(countries[0]?.value || "");
  const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (countries.length > 0) {
      setCountry(countries[0].value);
      setSelectedCountry(countries[0]);
    }
  }, [countries])

  const fetchWeather = async () => {
    setError(null);
    if (!city || !country) {
      setError("Please fill all fields before searching.");
      return;
    }
    try {
      const data = await getWeatherData(city, country);
      setWeather(data);
    } catch (error) {
      setError("Failed to fetch weather data. Please try again.");
    }
  };

  const handleCountryChange = (e) => {
    const selectedValue = e.target.value;
    setCountry(selectedValue);
    const countryDetails = countries.find((c) => c.value === selectedValue);
    setSelectedCountry(countryDetails);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchWeather();
    }
  };

  return (
    <div className="weather-container">

      <div className="weather-form">
        <img className="weather-icon" src={image} alt="Weather Icon" />
        <div className="country-flag">
          {selectedCountry && (
            <img
              src={`https://flagcdn.com/w320/${selectedCountry.value.toLowerCase()}.png`}
              alt={selectedCountry.label}

            />
          )}
          <select
            value={country}
            onChange={handleCountryChange}
            placeholder="Select a country"
          >
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.value}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Please enter your location..."
            onKeyPress={handleKeyPress}
          />
          <FaSearch
            onClick={fetchWeather}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {weather && (
        <div className="weather-info">
          <div className="temperature-box">
            <h2>{`${city}, ${selectedCountry?.label}`}</h2>
            <p>{weather.average_temp}<span>°C</span></p>
          </div>

          <div className="seven-day-forecast">
            <ul>
              {weather.seven_day_forecast.map((day) => (
                <li key={day.date}>
                  <span className="day-name">{day.date}</span>{" "}
                  <span className="day-tem">{day.temp}<span className="unit-temp">°C</span></span>
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
