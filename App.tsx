import React, { useEffect, useState } from 'react';
import { StackNavigator } from './src/navigation/Stack';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/lib/styles/Theme';
import { Image, StatusBar, View } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import rootReducer, { rootSaga } from './src/modules';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const _cacheResourcesAsync = async () => {
    SplashScreen.hideAsync();
    try {
      const images = [
        require('./assets/tab/etc-outline.png'),
        require('./assets/tab/etc.png'),
        require('./assets/tab/home-outline.png'),
        require('./assets/tab/home.png'),
        require('./assets/tab/schedule-outline.png'),
        require('./assets/tab/schedule.png'),
        require('./assets/tab/user-outline.png'),
        require('./assets/tab/user.png'),
        require('./assets/icon/addfriends.png'),
        require('./assets/icon/back.png'),
        require('./assets/icon/calendar.png'),
        require('./assets/icon/camera.png'),
        require('./assets/icon/clock.png'),
        require('./assets/icon/close.png'),
        require('./assets/icon/coldot.png'),
        require('./assets/icon/defaultprofile.png'),
        require('./assets/icon/delete.png'),
        require('./assets/icon/flag-white.png'),
        require('./assets/icon/flag.png'),
        require('./assets/icon/google.png'),
        require('./assets/icon/home-inactive.png'),
        require('./assets/icon/kakao.png'),
        require('./assets/icon/logo.png'),
        require('./assets/icon/naver.png'),
        require('./assets/icon/plainplus.png'),
        require('./assets/icon/home-inactive.png'),
        require('./assets/icon/plus.png'),
        require('./assets/icon/rowdot.png'),
        require('./assets/icon/search-black.png'),
        require('./assets/icon/search.png'),
        require('./assets/icon/write.png'),
        'https://i.ibb.co/92R6FCj/thunder.png',
        'https://i.ibb.co/rtzXPSH/backdrop-etc.png',
        'https://i.ibb.co/b2g83kt/backdrop-rainy.png',
        'https://i.ibb.co/VByZP3W/backdrop-sunny.png',
        'https://i.ibb.co/j4hxLcF/backdrop-cloudy.png',
        'https://i.ibb.co/F677ctj/drizzle.png',
        'https://i.ibb.co/ZYD9W7B/rainy.png',
        'https://i.ibb.co/rtNYFMY/snowy.png',
        'https://i.ibb.co/FKc6hzh/sunny.png',
        'https://i.ibb.co/NW99Jb8/cloudy.png',
        'https://i.ibb.co/yf3gqDD/noweather.png',
        'https://i.ibb.co/VY6swvG/weather.gif',
      ];
      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      });
      await Promise.all(cacheImages);
    } catch (e) {
      console.warn(e);
    } finally {
      setIsReady(true);
    }
  };

  return !isReady ? (
    <View style={{ flex: 1 }}>
      <Image
        style={{ width: '100%', height: '100%' }}
        source={require('./assets/splash.gif')}
        onLoad={_cacheResourcesAsync}
      />
    </View>
  ) : (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent={true}
          barStyle="dark-content"
        />
        <StackNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
