import axios from "axios";

const API_URL = "http://localhost:3000";

export const getWeatherData = async (city, country) => {
  try {
    const response = await axios.get(`${API_URL}/forecast`, {
      params: { city, country },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data", error);
    throw error;
  }
};
