import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import SearchViewer from '../../components/SearchFriends/SearchViewer';

const AddFriendsContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [friendData, setFriendData] = useState({
    avatarUrl: '',
    id: 0,
    username: '',
  });

  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (e) {
      console.error(e);
    }
  };
  //친구요청 할 유저 Find
  // TODO: 이미 있는 친구 어떻게 처리하는지??
  const handleFindClick = () => {
    (async () => {
      try {
        setLoading(prev => {
          return !prev;
        });
        await getUserToken();
        const {
          data: { avatarUrl, id, username },
        } = await axios.get(`http://bringumb.tk/user/search/${keyword}`);
        setFriendData({ ...friendData, avatarUrl, id, username });
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
        await axios.post('http://bringumb.tk/friend/waiting', {
          friendId: friendData.id,
        });
        setFriendData({ avatarUrl: '', id: 0, username: '' });
      } catch (e) {
        Alert.alert('친구 요청이 실패했습니다.');
      }
    })();
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
      avatar={friendData.avatarUrl}
      onChangeText={onChangeText}
      clearKeyword={clearKeyword}
      onFindClick={handleFindClick}
      onReqClick={handleReqClick}
    />
  );
};

export default AddFriendsContainer;
