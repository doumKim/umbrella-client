import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getUserToken = async (): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('token이 없습니다.');
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const removeUserToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('userToken');
};

export const getPushToken = async (): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem('pushToken');
    if (!token) {
      throw new Error('token을 받아오지 못했습니다');
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const memberWithdraw = async (): Promise<void> => {
  try {
    await axios.delete('http://bringumb.tk/user/withdraw');
  } catch (e) {
    throw new Error(e);
  }
};

// 만약 토큰이 전역 state로 관리될 때 사용할 타입
export type SignInToken = {
  accessToken: string;
  success: boolean;
};
