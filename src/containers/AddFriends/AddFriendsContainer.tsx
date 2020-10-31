import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Socket } from 'socket.io-client';
import { addFriend, searchUser } from '../../api/friend';
import SearchViewer from '../../components/SearchFriends/SearchViewer';

const AddFriendsContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [friendData, setFriendData] = useState({
    avatarUrl: '',
    id: 0,
    username: '',
    pushToken: '',
    socketId: '',
  });
  //

  const sendPushNotification = async (expoPushToken: string) => {
    const userToken = await AsyncStorage.getItem('userToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'push알림이 왔습니다',
      body: '잘도착했나요?',
      data: { data: 'goes here' },
    };
    return await axios.post('http://bringumb.tk/pushAlarm', {
      ...message,
    });
  };

  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (e) {
      console.error(e);
    }
  };
  //친구요청 할 유저 Find
  const handleFindClick = () => {
    (async () => {
      try {
        setLoading(prev => {
          return !prev;
        });
        await getUserToken();
        const {
          avatarUrl,
          id,
          username,
          pushToken,
          socketId,
        } = await searchUser(keyword);
        setFriendData({
          ...friendData,
          avatarUrl,
          id,
          username,
          pushToken,
          socketId,
        });
      } catch (e) {
        Alert.alert('해당하는 친구가 없습니다.');
      } finally {
        setKeyword('');
        setLoading(false);
      }
    })();
  };
  //친구요청
  const handleReqClick = () => {
    (async () => {
      try {
        await getUserToken();
        await addFriend(friendData.id);
      } catch (e) {
        Alert.alert('친구 요청이 실패했습니다.');
      }
    })();
  };
  //친구요청 및 푸쉬알림 보냄
  const sendPushAlarm = async () => {
    await handleReqClick();
    await sendPushNotification(friendData.pushToken);

    await Socket.emit('sendPushAlarm', friendData.socketId);
    setFriendData({
      avatarUrl: '',
      id: 0,
      username: '',
      pushToken: '',
      socketId: '',
    });
  };
  const onChangeText = (text: string) => {
    setKeyword(text);
  };
  const clearKeyword = () => {
    setKeyword('');
  };
  return (
    <SearchViewer
      type="add"
      loading={loading}
      keyword={keyword}
      name={friendData.username}
      id={friendData.id}
      avatar={friendData.avatarUrl}
      onChangeText={onChangeText}
      clearKeyword={clearKeyword}
      onFindClick={handleFindClick}
      sendPushAlarm={sendPushAlarm}
    />
  );
};

export default AddFriendsContainer;
