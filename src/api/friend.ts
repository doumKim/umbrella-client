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

export type FriendListType = {
  id: number;
  username: string;
  avatarUrl: string;
  followers: FriendType[];
};

export type RequestFriendListType = {
  id: number;
  username: string;
  avatarUrl: string;
  applicants: FriendType[];
};

export type FriendType = {
  id: number;
  username: string;
  userId: string;
  avatarUrl: string;
  pushToken: string;
  socketId: string;
};

export const searchUser = async (text: string): Promise<FriendType> => {
  await getUserToken();
  const { data } = await axios.get<FriendType>(`/user/search/${text}`);
  return data;
};

export const getFriends = async (): Promise<FriendListType> => {
  await getUserToken();
  const { data } = await axios.get<FriendListType>('/friend?scope=followers');
  return data;
};

export const getRequestFriends = async (): Promise<RequestFriendListType> => {
  await getUserToken();
  const { data } = await axios.get<RequestFriendListType>(
    '/friend?scope=applicants'
  );
  return data;
};

export const addFriend = async (id: number): Promise<void> => {
  await getUserToken();
  await axios.post('/friend/waiting', { friendId: id });
};

export const accpetFriend = async (id: number): Promise<void> => {
  await getUserToken();
  await axios.post('/friend/accept', { friendId: id });
};

export const rejectFriend = async (id: number): Promise<void> => {
  await getUserToken();
  await axios.delete(`/friend/reject/${id}`);
};

export const dropFriend = async (id: number): Promise<void> => {
  await getUserToken();
  await axios.delete(`/friend/${id}`);
};
