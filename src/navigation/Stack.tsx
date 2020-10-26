import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabs } from './Tabs';
import DetailSchedule from '../screens/DetailSchedule';
import DetailFriends from '../screens/DetailFriends';
import WriteSchedule from '../screens/WriteSchedule';
import SearchFriends from '../screens/SearchFriends';
import AuthIntro from '../screens/Auth/AuthIntro';
import { NavigationContainer } from '@react-navigation/native';
import WriteUserInfo from '../screens/Auth/WriteUserInfo';
import AddFriends from '../screens/AddFriends';

const Stack = createStackNavigator();

const LoginStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthIntro" component={AuthIntro} />
      <Stack.Screen name="WriteUserInfo" component={WriteUserInfo} />
    </Stack.Navigator>
  );
};

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={MainTabs} />
      <Stack.Screen name="DetailSchedule" component={DetailSchedule} />
      <Stack.Screen name="DetailFriends" component={DetailFriends} />
      <Stack.Screen name="WriteSchedule" component={WriteSchedule} />
      <Stack.Screen name="SearchFriends" component={SearchFriends} />
      <Stack.Screen name="AddFriends" component={AddFriends} />
    </Stack.Navigator>
  );
};

export const StackNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};
