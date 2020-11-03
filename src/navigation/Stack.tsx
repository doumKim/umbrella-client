import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabs } from './Tabs';
import DetailSchedule from '../screens/DetailSchedule';
import DetailFriends from '../screens/DetailFriends';
import WriteSchedule from '../screens/WriteSchedule';
import SearchFriends from '../screens/SearchFriends';
import AuthIntro from '../screens/Auth/AuthIntro';
import { NavigationContainer } from '@react-navigation/native';
import AddFriends from '../screens/AddFriends';
import Friend from '../screens/Friends';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getUserTokenAsync } from '../modules/auth';
import { getUserScheduleAsync } from '../modules/schedule';

const Stack = createStackNavigator();

const LoginStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthIntro" component={AuthIntro} />
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
      <Stack.Screen name="Friend" component={Friend} />
    </Stack.Navigator>
  );
};

export const StackNavigator: React.FC = () => {
  const { authenticated } = useSelector(
    (state: RootState) => state.auth.authStatus
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserTokenAsync.request());
    dispatch(getUserScheduleAsync.request());
  }, []);

  return (
    <NavigationContainer>
      {authenticated ? <MainStack /> : <LoginStack />}
    </NavigationContainer>
  );
};
