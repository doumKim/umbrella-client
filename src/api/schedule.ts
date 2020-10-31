import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { sortSchedules } from '../modules/helper';
import { ScheduleInputState } from '../modules/todos/types';

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

export const getUserSchedule = async (): Promise<ScheduleType[]> => {
  await getUserToken();
  const { data } = await axios.get<ScheduleType[]>('/schedule/all');
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
