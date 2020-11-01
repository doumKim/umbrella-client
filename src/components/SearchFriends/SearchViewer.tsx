import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import { FriendType } from '../../api/friend';
import FriendsEmpty from '../Common/FriendsEmpty';
import FriendsItem from '../Friends/FriendsItem';
import FriendsList from '../Friends/FriendsList';

const Container = styled.View``;

const InputOutline = styled.View`
  background: #f9f7f7;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 15px;
`;

const SearchInput = styled(TextInput)`
  font-size: 20px;
  width: 70%;
`;
type FriendDataType = {
  id: number;
  username: string;
  avatarUrl: string;
};

type Props = {
  type: string;
  keyword: string;
  error?: string;
  scheduleId?: number;
  friendData?: FriendDataType;
  friendList?: FriendType[] | undefined;
  onChangeText(text: string): void;
  clearKeyword(): void;
  onFindClick?(): void;
  sendPushAlarm(): Promise<void>;
};

/* Props(type) 
   - list: 친구 목록[Tab]
   - req: 친구 요청[Tab]
   - search: 친구 검색[Detail]
   - add: 친구 추가[Detail]
*/
const SearchViewer: React.FC<Props> = ({
  scheduleId,
  type,
  keyword,
  error,
  friendData,
  friendList,
  onChangeText,
  onFindClick,
  clearKeyword,
  sendPushAlarm,
}: Props) => {
  const navigation = useNavigation();
  return (
    <Container>
      <InputOutline>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require('../../../assets/icon/back.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
        {(type === 'search' || type === 'share') && (
          <>
            <SearchInput
              value={keyword}
              onChangeText={onChangeText}
              placeholder={'나의 친구목록 검색'}
            />
            <Image
              source={require('../../../assets/icon/close.png')}
              style={{ width: 20, height: 20 }}
            />
          </>
        )}
        {type === 'add' && (
          <>
            <SearchInput
              onChangeText={onChangeText}
              onSubmitEditing={onFindClick}
              placeholder={'추가할 친구 ID 입력'}
              value={keyword}
            />
            <TouchableOpacity onPress={clearKeyword}>
              <Image
                source={require('../../../assets/icon/close.png')}
                style={{ width: 20, height: 20, marginRight: 20 }}
              />
            </TouchableOpacity>
          </>
        )}
      </InputOutline>
      {type === 'search' && (
        <ScrollView>
          <FriendsList
            type="search"
            friendList={friendList}
            keyword={keyword}
          />
        </ScrollView>
      )}
      {type === 'share' && (
        <ScrollView>
          <FriendsList
            type="share"
            friendList={friendList}
            keyword={keyword}
            scheduleId={scheduleId}
          />
        </ScrollView>
      )}
      {type === 'add' && (
        <View>
          {error ? (
            <FriendsEmpty>{error}</FriendsEmpty>
          ) : friendData?.username ? (
            <FriendsItem
              type="add"
              name={friendData.username}
              id={friendData.id}
              avatar={friendData.avatarUrl}
              sendPushAlarm={sendPushAlarm}
            />
          ) : null}
        </View>
      )}
    </Container>
  );
};

export default SearchViewer;
