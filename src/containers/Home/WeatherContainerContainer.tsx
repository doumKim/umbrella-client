import React from 'react';
import Forecast from '../../components/Home/Forecast';
import MainWeather from '../../components/Home/MainWeather';

const WeatherContainer: React.FC = () => {
  //   const [results, setResults] = useState({
  //     temp: 0,
  //     weather: [],
  //     name: ''
  //   });
  //   const [isLoading, setIsLoading] = useState(true);
  //   const getWeather = async (latitude, longitude) => {
  //     const {
  //       data: {
  //         main: { temp },
  //         weather,
  //         name
  //       }
  //     } = await axios.get(
  //       `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${WEATHER_API}&units=metric`
  //     );
  //     setResults({...results, temp, weather, name});
  //     setIsLoading(false);
  //   };

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         await Location.requestPermissionsAsync();
  //         const { coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({});
  //         getWeather(latitude, longitude);
  //       } catch (e) {
  //         Alert.alert('위치를 찾을 수 없습니다.');
  //       }
  //     })();
  //   }, []);

  return (
    <>
      <MainWeather />
      <Forecast />
    </>
  );
};

export default WeatherContainer;
