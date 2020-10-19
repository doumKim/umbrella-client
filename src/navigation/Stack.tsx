import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabs } from './Tabs';
import DetailSchedule from '../screens/DetailSchedule';
import DetailFriends from '../screens/DetailFriends';
import WriteSchedule from '../screens/WriteSchedule';

const Stack = createStackNavigator();

export const MainStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailSchedule"
        component={DetailSchedule}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailFriends"
        component={DetailFriends}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WriteSchedule"
        component={WriteSchedule}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
