import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Schedule from '../screens/Schedule';
import Etc from '../screens/Etc';
import Friends from '../screens/Friends';
import { Image } from 'react-native';

const Tabs = createBottomTabNavigator();
const mainRoute = [
  {
    name: 'Home',
    component: Home,
    inactive: require('../../assets/tab/home-outline.png'),
    active: require('../../assets/tab/home.png'),
  },
  {
    name: 'Schedule',
    component: Schedule,
    inactive: require('../../assets/tab/schedule-outline.png'),
    active: require('../../assets/tab/schedule.png'),
  },
  {
    name: 'Friends',
    component: Friends,
    inactive: require('../../assets/tab/user-outline.png'),
    active: require('../../assets/tab/user.png'),
  },
  {
    name: 'Etc',
    component: Etc,
    inactive: require('../../assets/tab/etc-outline.png'),
    active: require('../../assets/tab/etc.png'),
  },
];

type TabBarIconProps = {
  focused: boolean;
};

export const MainTabs: React.FC = () => (
  <Tabs.Navigator
    tabBarOptions={{
      showLabel: false,
      tabStyle: { borderTopWidth: 0 },
      style: {
        elevation: 0,
        backgroundColor: '#fbfbfb',
        borderTopColor: 'transparent',
      },
    }}
  >
    {mainRoute.map(route => (
      <Tabs.Screen
        key={`screen-${route.name}`}
        name={route.name}
        component={route.component}
        options={{
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            <Image
              source={focused ? route.active : route.inactive}
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
    ))}
  </Tabs.Navigator>
);
