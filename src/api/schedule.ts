import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { sortSchedules } from '../modules/helper';
import schedule from '../modules/schedule';

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
  date: string;
  todos: TodoType[];
};

export type ScheduleInputType = {
  title: string;
  date: string;
  todos: TodoType[];
};

export type TodoType = {
  id: number;
  location: string;
  date: string;
  note: string;
};

export type RemovedResultType = {
  success: boolean;
  status: number;
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

export const createUserSchedule = async (schedule: string): Promise<void> => {
  await getUserToken();
  const { data } = await axios.post('/schedule', { schedule });
  return data;
};
