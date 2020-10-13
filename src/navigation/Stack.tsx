import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabs } from './Tabs';

const Stack = createStackNavigator();

export const MainStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
