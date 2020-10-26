import React from 'react';
import { StackNavigator } from './src/navigation/Stack';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/lib/styles/Theme';
import { StatusBar } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import rootReducer, { rootSaga } from './src/modules';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

//TODO: 로그인 여부에 따른 MainStack or LoginStack 조건부 렌더링\

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const App: React.FC = () => {
  return (
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
