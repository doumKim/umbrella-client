import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  TouchableOpacity,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import FriendsItem from '../Friends/FriendsItem';

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

type Props = {
  type: string;
  loading: boolean;
  keyword: string;
  name: string;
  id: number;
  avatar: string;
  onChangeText?(text: string): void;
  onFindClick(): void;
  clearKeyword(): void;
  sendPushAlarm(): void;
};

/* type) search: 친구 검색 및 친구, add: 친구 추가  */
const SearchViewer: React.FC<Props> = ({
  type,
  loading,
  keyword,
  name,
  id,
  avatar,
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
        {type === 'search' && (
          <>
            <SearchInput placeholder={'나의 친구목록 검색'} />
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
      {/* {type === 'search' && (
        <ScrollView>
          <FriendsItem type="search" />
        </ScrollView>
      )} */}
      {/* TODO: 확인 후 추가할 친구가 있다면 렌더링 */}
      {type === 'add' && loading ? (
        <View>
          <ActivityIndicator color={'black'} size={'large'} />
        </View>
      ) : (
        <View>
          {name ? (
            <FriendsItem
              type="add"
              name={name}
              id={id}
              avatar={avatar}
              sendPushAlarm={sendPushAlarm}
            />
          ) : null}
        </View>
      )}
    </Container>
  );
};

export default SearchViewer;
