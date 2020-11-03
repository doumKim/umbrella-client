import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { sortSchedules } from '../modules/helper';
import { ScheduleInputState } from '../modules/todos/types';
import { getWeatherIcon } from './weather';
const getUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch (e) {
    console.error(e);
  }
};

axios.defaults.baseURL = 'http://bringumb.tk';

export type ScheduleType = {
  id: number;
  creator: number;
  title: string;
  date: Date;
  todos: TodoType[];
};

export type TodoType = {
  id: number;
  placeName: string;
  latitude: string;
  longitude: string;
  hour: number;
  minutes: number;
  note: string;
  backdrop: string;
  iconName: string;
  temp: string;
};

export type RemovedResultType = {
  success: boolean;
  status: number;
};

export type FriendSchedulesType = {
  id: number;
  avatarUrl: string;
  username: string;
  friendSchedules: ScheduleType[];
};

export const getUserSchedule = async (): Promise<ScheduleType[] | undefined> => {
  await getUserToken();
  const { data } = await axios.get<ScheduleType[]>('/schedule/all');
  //날씨 이모티콘, 배경 받아오기
  await Promise.all(data.map(async (_schedule) => {
    await Promise.all(_schedule.todos.map(async (_todo: TodoType) => {
      const { backdrop, iconName, temp } = await getWeatherIcon(_schedule.date, _todo.latitude, _todo.longitude, _todo.hour);
      _todo.backdrop = backdrop;
      _todo.iconName = iconName;
      _todo.temp = temp;
    }));
  }));
  // for (const _schedule of data) {
  //   for (const _todo of _schedule.todos) {
  //     const { backdrop, iconName } = await getWeatherIcon(_schedule.date, _todo.latitude, _todo.longitude, _todo.hour);
  //     _todo.backdrop = backdrop;
  //     _todo.iconName = iconName;
  //   }
  // }
  return sortSchedules(data);
};

export const removeUserSchedule = async (
  scheduleId: number
): Promise<RemovedResultType> => {
  await getUserToken();
  const { data } = await axios.delete<RemovedResultType>(
    `/schedule/${scheduleId}`
  );
  return data;
};

export const createUserSchedule = async (
  schedule: ScheduleInputState
): Promise<ScheduleType> => {
  await getUserToken();
  const { data } = await axios.post('/schedule', { ...schedule });
  //날씨 이모티콘, 배경 받아오기
  await Promise.all(data.todos.map(async (_todo: TodoType) => {
    const { backdrop, iconName, temp } = await getWeatherIcon(data.date, _todo.latitude, _todo.longitude, _todo.hour);
    _todo.backdrop = backdrop;
    _todo.iconName = iconName;
    _todo.temp = temp;
  }));
  return data;
};

export const shareUserSchedule = async (
  scheduleId?: number,
  friendId?: number
): Promise<void> => {
  await getUserToken();
  if (scheduleId && friendId) {
    await axios.post('/schedule/share', {
      friendId,
      scheduleId,
    });
  }
};
