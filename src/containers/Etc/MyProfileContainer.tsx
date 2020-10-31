import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import MyProfile from '../../components/Etc/MyProfile';
import axios from 'axios';
import { Alert, Platform } from 'react-native';
import {
  changeUsername,
  getUserInfo,
  addUserId,
  changeAvatar,
} from '../../api/etc';
import * as ImagePicker from 'expo-image-picker';

type MyData = {
  id?: number;
  userId?: string;
  username?: string;
  avatarUrl?: string;
};

const MyProfileContainer: React.FC = () => {
  const [myData, setMyData] = useState<MyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [keywordName, setKeywordName] = useState('');
  const [keywordId, setKeywordId] = useState('');
  const [warning, setWarning] = useState('');
  const [image, setImage] = useState('');

  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (e) {
      console.error(e);
    }
  };

  // My유저 정보 불러오기
  useEffect(() => {
    (async () => {
      try {
        await getUserToken();
        const { id, userId, username, avatarUrl } = await getUserInfo();
        setMyData({ ...myData, id, userId, username, avatarUrl });
        setImage(avatarUrl);
      } catch (e) {
        Alert.alert('유저정보를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  // 유효성 검사
  const onChangeNickname = (text: string) => {
    if (text.length > 7) {
      setWarning('닉네임은 최대 7글자까지 입력할 수 있어요.');
    } else {
      setKeywordName(text);
      setWarning('');
    }
  };
  const onChangeUserId = (text: string) => {
    if (text.length > 10) {
      setWarning('아이디는 최대 10글자까지 입력할 수 있어요.');
    }
    if (!/^[a-z0-9]*$/.test(text)) {
      setWarning('아이디는 영문(소문자), 숫자 조합으로 입력하세요.');
    }
    if (text.length <= 10 && /^[a-z0-9]*$/.test(text)) {
      setKeywordId(text);
      setWarning('');
    }
  };
  const clearKeyword = () => {
    setKeywordName('');
    setKeywordId('');
    setWarning('');
  };

  const handleSubmitNickname = async () => {
    const { username } = await changeUsername(keywordName);
    setMyData({ ...myData, username });
    clearKeyword();
  };
  const handleSubmitUserId = async () => {
    const { userId } = await addUserId(keywordId);
    setMyData({ ...myData, userId });
    clearKeyword();
  };
  const onImageClick = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('사진/파일 조회에 대한 권한이 필요합니다.');
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      try {
        const url = await changeAvatar(result.uri);
        setImage(url);
      } catch (e) {
        Alert.alert('이미지 수정 실패');
      }
    }
  };

  return (
    <MyProfile
      nickname={myData?.username}
      userId={myData?.userId}
      image={image}
      isLoading={isLoading}
      warning={warning}
      keywordName={keywordName}
      keywordId={keywordId}
      onChangeNickname={onChangeNickname}
      onChangeUserId={onChangeUserId}
      clearKeyword={clearKeyword}
      onSubmitNickname={handleSubmitNickname}
      onSubmitUserId={handleSubmitUserId}
      onImageClick={onImageClick}
    />
  );
};

export default MyProfileContainer;
