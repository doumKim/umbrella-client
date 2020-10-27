import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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

export type TodoType = {
  id: number;
  location: string;
  date: string;
  note: string;
};

export const getUserSchedule = async (): Promise<ScheduleType[]> => {
  await getUserToken();
  const { data } = await axios.get<ScheduleType[]>('/schedule/all');
  return data;
};
