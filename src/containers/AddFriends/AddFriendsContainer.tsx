import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { addFriend, searchUser } from '../../api/friend';
import Loading from '../../components/Common/Loading';
import SearchViewer from '../../components/SearchFriends/SearchViewer';
import io from 'socket.io-client';
import { getUserInfo } from '../../api/etc';

const socket = io('http://bringumb.tk', { transports: ['websocket'] });

const AddFriendsContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');
  const [friendData, setFriendData] = useState({
    avatarUrl: '',
    id: 0,
    username: '',
    pushToken: '',
  });
  const [myUsername, setMyUsername] = useState('');

  useEffect(() => {
    (async () => {
      await getUserToken();
      const { username } = await getUserInfo();
      setMyUsername(username);
    })();
  }, []);

  const sendPushNotification = async (pushParameter: {
    username: string;
    expoPushToken: string;
  }) => {
    const userToken = await AsyncStorage.getItem('userToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
    const message = {
      to: pushParameter.expoPushToken,
      sound: 'default',
      title: '우산챙겨',
      body: `${pushParameter.username}님으로 부터 친구 요청이 도착했습니다`,
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
        const { avatarUrl, id, username, pushToken } = await searchUser(
          keyword
        );

        setFriendData({
          ...friendData,
          avatarUrl,
          id,
          username,
          pushToken,
        });
      } catch (e) {
        setError('😒 해당하는 아이디가 없습니다.');
      } finally {
        setKeyword('');
        setLoading(false);
      }
    })();
  };
  //친구요청
  const handleReqClick = async () => {
    try {
      await getUserToken();
      await addFriend(friendData.id);
    } catch (e) {
      setError('🤒 친구 요청이 실패했습니다.');
    }
  };

  //친구요청 및 푸쉬알림 보냄
  const sendPushAlarm = async () => {
    const pushParameter = {
      username: myUsername,
      expoPushToken: friendData.pushToken,
    };
    await handleReqClick();
    await sendPushNotification(pushParameter);

    socket.emit('sendPushAlarm');

    setFriendData({
      avatarUrl: '',
      id: 0,
      username: '',
      pushToken: '',
    });
  };
  const onChangeText = (text: string) => {
    setKeyword(text);
  };
  const clearKeyword = () => {
    setKeyword('');
  };
  return (
    <>
      {loading && <Loading />}
      <SearchViewer
        type="add"
        keyword={keyword}
        friendData={{
          avatarUrl: friendData.avatarUrl,
          id: friendData.id,
          username: friendData.username,
        }}
        error={error}
        onChangeText={onChangeText}
        clearKeyword={clearKeyword}
        onFindClick={handleFindClick}
        sendPushAlarm={sendPushAlarm}
      />
    </>
  );
};

export default AddFriendsContainer;
