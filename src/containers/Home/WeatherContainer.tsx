import React, { useEffect, useState } from 'react';
import MainWeather from '../../components/Home/MainWeather';
import axios from 'axios';
import * as Location from 'expo-location';
import { Alert, Dimensions, RefreshControl } from 'react-native';
import Forecast from '../../components/Home/Forecast';
import styled from 'styled-components/native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import { getUserInfo } from '../../api/etc';

const WEATHER_API = '7445083dcf354d54e1688965b5591b85';

const socket = io('http://bringumb.tk', { transports: ['websocket'] });

const { height } = Dimensions.get('screen');

const HomeScrollView = styled.ScrollView`
  background: ${props => props.theme.palette.mainBackground};
  margin-top: 50px;
  min-height: ${height}px;
  z-index: -100;
`;
const Padding = styled.View`
  padding: 0 15px 170px;
`;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const WeatherContainer: React.FC = () => {
  const [results, setResults] = useState({
    temperature: 0,
    weather: {
      id: 0,
      icon: '',
      main: '',
    },
    name: '',
  });

  //const [id, setId] = useState(0);

  const [weekResults, setWeekResults] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const registerForPushNotificationsAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }
    const pushToken = await Notifications.getExpoPushTokenAsync();
    return await axios.patch('http://bringumb.tk/pushToken', {
      token: pushToken.data,
    });
  };

  const getWeather = async (latitude: number, longitude: number) => {
    !isLoading && setIsLoading(true);
    const {
      data: {
        main: { temp },
        weather,
        name,
      },
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${WEATHER_API}&units=metric&lang=kr`
    );
    setResults({ ...results, temperature: temp, weather: weather[0], name });
    setIsLoading(false);
  };

  const getWeekWeather = async (latitude: number, longitude: number) => {
    !isLoading && setIsLoading(true);
    const {
      data: { daily },
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${WEATHER_API}&units=metric&lang=kr`
    );
    setWeekResults(daily);
    setIsLoading(false);
  };

  const saveSocketId = async (id: number) => {
    await socket.emit('login', { id: id });
  };

  useEffect(() => {
    const registerPushToken = async () => {
      await registerForPushNotificationsAsync();
      const { id } = await getUserInfo();
      await saveSocketId(id);
    };
    registerPushToken();

    const subscription = Notifications.addNotificationResponseReceivedListener(
      () => {
        navigation.navigate('Friend');
      }
    );

    (async () => {
      try {
        await Location.requestPermissionsAsync();
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({});
        getWeather(latitude, longitude);
        getWeekWeather(latitude, longitude);
      } catch (e) {
        Alert.alert('위치를 찾을 수 없습니다.');
      }
    })();
    return () => subscription.remove();
  }, []);

  const handleRefersh = () => {
    (async () => {
      try {
        await Location.requestPermissionsAsync();
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({});
        getWeather(latitude, longitude);
        getWeekWeather(latitude, longitude);
      } catch (e) {
        Alert.alert('위치를 찾을 수 없습니다.');
      }
    })();
  };
  return (
    <HomeScrollView
      refreshControl={
        <RefreshControl onRefresh={handleRefersh} refreshing={isLoading} />
      }
    >
      <Padding>
        <MainWeather
          isLoading={isLoading}
          main={results.weather.main}
          temperature={Math.round(results.temperature)}
          icon={results.weather.icon}
          name={results.name}
        />
        <Forecast isLoading={isLoading} results={weekResults} />
      </Padding>
    </HomeScrollView>
  );
};

export default WeatherContainer;
