import React from 'react';
import { View } from 'react-native';
import { FriendType } from '../../api/friend';
import FriendsEmpty from '../Common/FriendsEmpty';
import FriendsItem from './FriendsItem';

type Props = {
  type: string;
  friendList: FriendType[] | undefined;
  keyword?: string;
  scheduleId?: number;
};

/* Props(type) 
   - list: 친구 목록[Tab]
   - req: 친구 요청[Tab]
   - search: 친구 검색[Detail]
   - add: 친구 추가[Detail]
*/
const FriendsList: React.FC<Props> = ({
  type,
  friendList,
  keyword,
  scheduleId,
}: Props) => {
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
                sendPushAlarm={async () => {
                  console.log('');
                }}
              />
            );
          })
        ) : (
          <View>
            <FriendsEmpty>😐 새로운 요청이 없습니다.</FriendsEmpty>
          </View>
        ))}
      {type === 'list' &&
        (friendList?.length !== 0 ? (
          friendList?.map(friend => {
            return (
              <FriendsItem
                type="list"
                key={friend.id}
                id={friend.id}
                name={friend.username}
                avatar={friend.avatarUrl}
                sendPushAlarm={async () => {
                  console.log('');
                }}
              />
            );
          })
        ) : (
          <View>
            <FriendsEmpty>🤫 친구 목록이 비어있습니다.</FriendsEmpty>
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
                sendPushAlarm={async () => {
                  console.log('');
                }}
              />
            );
          })
        ) : (
          <View>
            <FriendsEmpty>
              🤔 &quot;{keyword}&quot; 와 일치하는 결과가 없습니다.
            </FriendsEmpty>
          </View>
        ))}
      {type === 'share' &&
        (friendList?.length !== 0 ? (
          friendList?.map(friend => {
            return (
              <FriendsItem
                scheduleId={scheduleId}
                type="search"
                action="share"
                key={friend.id}
                id={friend.id}
                name={friend.username}
                avatar={friend.avatarUrl}
                sendPushAlarm={async () => {
                  console.log('');
                }}
              />
            );
          })
        ) : (
          <View>
            <FriendsEmpty>🤫 친구 목록이 비어있습니다.</FriendsEmpty>
          </View>
        ))}
    </>
  );
};

export default FriendsList;
