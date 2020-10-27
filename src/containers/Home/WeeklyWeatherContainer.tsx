import React, { useEffect, useState } from 'react';
import Forecast from '../../components/Home/Forecast';
import axios from 'axios';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
const WEATHER_API = '7445083dcf354d54e1688965b5591b85';

const WeeklyWeatherContainer: React.FC = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getWeather = async (latitude: number, longitude: number) => {
    !isLoading && setIsLoading(true);
    // const {
    //   data: { list },
    // } = await axios.get(
    //   `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${WEATHER_API}&units=metric&lang=kr`
    // );
    const {
      data: { daily },
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${WEATHER_API}&units=metric&lang=kr`
    );
    setResults(daily);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        await Location.requestPermissionsAsync();
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({});
        getWeather(latitude, longitude);
      } catch (e) {
        Alert.alert('위치를 찾을 수 없습니다.');
      }
    })();
  }, []);

  const handleRefersh = () => {
    (async () => {
      try {
        await Location.requestPermissionsAsync();
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({});
        getWeather(latitude, longitude);
      } catch (e) {
        Alert.alert('위치를 찾을 수 없습니다.');
      }
    })();
  };
  return (
    <>
      <Forecast results={results} />
    </>
  );
};

export default WeeklyWeatherContainer;
