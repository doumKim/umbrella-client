import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './src/navigation/Stack';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/lib/styles/Theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
