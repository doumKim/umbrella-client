import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import MyProfile from '../../components/Etc/MyProfile';
import axios from 'axios';
import { Alert } from 'react-native';

type MyData = {
  id: number;
  userId: string;
  username: string;
  avatarUrl: string;
};

const MyProfileContainer: React.FC = () => {
  const [myData, setMyData] = useState<MyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [keywordName, setKeywordName] = useState('');
  const [keywordId, setKeywordId] = useState('');
  const [warning, setWarning] = useState('');
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
        const {
          data: { id, userId, username, avatarUrl },
        } = await axios.get('http://bringumb.tk/user/detail');
        setMyData({ ...myData, id, userId, username, avatarUrl });
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

  const handleSubmitNickname = () => {
    console.log('닉네임 요청');
  };
  const handleSubmitUserId = () => {
    console.log('유저 아이디 요청');
  };

  return (
    <MyProfile
      avatar={myData?.avatarUrl}
      nickname={myData?.username}
      userId={myData?.userId}
      isLoading={isLoading}
      warning={warning}
      keywordName={keywordName}
      keywordId={keywordId}
      onChangeNickname={onChangeNickname}
      onChangeUserId={onChangeUserId}
      clearKeyword={clearKeyword}
      onSubmitNickname={handleSubmitNickname}
      onSubmitUserId={handleSubmitUserId}
    />
  );
};

export default MyProfileContainer;
