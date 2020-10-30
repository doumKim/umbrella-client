import React from 'react';
import { Text, View } from 'react-native';
import { FriendType } from '../../api/friend';
import FriendsItem from './FriendsItem';

type Props = {
  type: string;
  friendList: FriendType[] | undefined;
};

// isReq: 친구요청 or 친구목록에 따른 조건부 렌더링
// TODO: 친구 요청이 없습니다. 친구목록이 비어있습니다. 추가
const FriendsList: React.FC<Props> = ({ type, friendList }: Props) => {
  return (
    <>
      {type === 'req' &&
        (friendList?.length !== 0 ? (
          friendList?.map(friend => {
            return (
              <FriendsItem
                type="req"
                key={friend.id}
                id={friend.id}
                name={friend.username}
                avatar={friend.avatarUrl}
                pushToken=""
                onReqClick={() => {
                  console.log('');
                }}
              />
            );
          })
        ) : (
          <View>
            <Text>친구 요청 목록이 비어있습니다.</Text>
          </View>
        ))}
      {type === 'search' &&
        (friendList?.length !== 0 ? (
          friendList?.map(friend => {
            return (
              <FriendsItem
                type="search"
                key={friend.id}
                id={friend.id}
                name={friend.username}
                avatar={friend.avatarUrl}
                pushToken=""
                onReqClick={() => {
                  console.log('');
                }}
              />
            );
          })
        ) : (
          <View>
            <Text>친구 목록이 비어있습니다.</Text>
          </View>
        ))}
    </>
  );
};

export default FriendsList;
