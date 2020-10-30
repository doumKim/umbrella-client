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

export type MyInfoType = {
  id: number;
  userId: string;
  username: string;
  avatarUrl: string;
};

export type NameResType = {
  id: number;
  username: string;
};

export type IdResType = {
  userId: string;
};

type FormDataType = Blob & {
  uri: string,
  name: string | undefined,
  type: string
};

export const getUserInfo = async (): Promise<MyInfoType> => {
  await getUserToken();
  const { data } = await axios.get<MyInfoType>('/user/detail');
  return data;
};

export const changeUsername = async (username: string): Promise<NameResType> => {
  await getUserToken();
  const { data } = await axios.patch<NameResType>('/user/username', { username });
  return data;
};


export const changeAvatar = async (uri: string): Promise<string> => {
  await getUserToken();
  const formData = new FormData();
  const localUri = uri;
  const name: string | undefined = localUri.split('/').pop();
  const match = /\.(\w+)$/.exec(name || '');
  const type = match ? `image/${match[1]}` : 'image';

  formData.append('avatar', { uri, name, type } as FormDataType);
  const { data } = await axios.patch('/user/avatar', formData);
  return data;
};

export const addUserId = async (userId: string): Promise<IdResType> => {
  await getUserToken();
  const { data } = await axios.patch<IdResType>('/user/userId', { userId });
  return data;
};