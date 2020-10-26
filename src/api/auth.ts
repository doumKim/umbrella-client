import AsyncStorage from '@react-native-async-storage/async-storage';

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

// 만약 토큰이 전역 state로 관리될 때 사용할 타입
export type SignInToken = {
  accessToken: string;
  success: boolean;
};
