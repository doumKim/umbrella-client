import React from 'react';
import { StackNavigator } from './src/navigation/Stack';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/lib/styles/Theme';
import { StatusBar } from 'react-native';

//TODO: 로그인 여부에 따른 MainStack or LoginStack 조건부 렌더링
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor={'transparent'} translucent={true} barStyle = 'dark-content' />
      <StackNavigator />
    </ThemeProvider>
  );
};

export default App;
