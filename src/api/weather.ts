import axios from 'axios';
import { WeatherDB } from '../lib/util/WeatherDB';
const WEATHER_API = '7445083dcf354d54e1688965b5591b85';

type HourlyType = {
  dt: number;
};

type ReturnType = {
  backdrop: string,
  iconName: string
  temp: string
}

export const getWeatherIcon = async (date: Date, lat: string, lon: string, hour: number): Promise<ReturnType> => {
  const { data: { hourly } } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${WEATHER_API}&units=metric&lang=kr`);
  const tempDate = new Date(date);
  const todoDate = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${makeDigit(tempDate.getDate())}`;
  const targetDate = new Date(`${todoDate}T${makeDigit(hour)}:00:00Z`).getTime() / 1000;
  const foundWeatherData = hourly.filter((hour: HourlyType) => hour.dt === targetDate);
  return foundWeatherData[0] ?
    {
      backdrop: WeatherDB[foundWeatherData[0].weather[0].main].backdrop,
      iconName: WeatherDB[foundWeatherData[0].weather[0].main].iconName,
      temp: String(Math.round(foundWeatherData[0].temp))
    } : {
      backdrop: 'https://i.ibb.co/j4hxLcF/backdrop-cloudy.png',
      iconName: 'https://i.ibb.co/yf3gqDD/noweather.png',
      temp: ''
    };
  // return { backdrop: 'https://i.ibb.co/j4hxLcF/backdrop-cloudy.png', iconName: 'https://i.ibb.co/yf3gqDD/noweather.png' };
  // const foundIcon = hourly.filter((hour: HourlyType) => hour.dt === targetDate).map((val: ValType) => WeatherDB[val.weather[0].main]);
  // return foundIcon[0] ? foundIcon[0] : { backdrop: 'https://i.ibb.co/j4hxLcF/backdrop-cloudy.png', iconName: 'https://i.ibb.co/yf3gqDD/noweather.png' };
};

const makeDigit = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`;
};