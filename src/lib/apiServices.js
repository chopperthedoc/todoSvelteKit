import axios from "axios";

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_APIKEY;

export function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${WEATHER_API_KEY}`;
  return axios.get(url);
}
