import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './src/navigation/Stack';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/lib/styles/Theme';
import { StatusBar } from 'react-native';

//TODO: 로그인 여부에 따른 MainStack or LoginStack 조건부 렌더링
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar backgroundColor={'transparent'} translucent={true} barStyle = 'dark-content' />
        <MainStack />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
