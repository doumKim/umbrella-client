import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  View,
  Text,
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
};

/* type) search: 친구 검색 및 친구, add: 친구 추가  */
const SearchViewer: React.FC<Props> = ({ type }: Props) => {
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
        <SearchInput
          placeholder={type === 'search' ? '나의 친구목록 검색' : '친구 ID'}
        />
        {type === 'search' && (
          <Image
            source={require('../../../assets/icon/close.png')}
            style={{ width: 20, height: 20 }}
          />
        )}
        {type === 'add' && (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../../assets/icon/close.png')}
              style={{ width: 20, height: 20, marginRight: 20 }}
            />
            <TouchableOpacity>
              <Text style={{ fontSize: 16 }}>확인</Text>
            </TouchableOpacity>
          </View>
        )}
      </InputOutline>
      {type === 'search' && (
        <ScrollView>
          <FriendsItem type="search" />
        </ScrollView>
      )}
      {/* TODO: 확인 후 추가할 친구가 있다면 렌더링 */}
      {type === 'add' && (
        <View>
          <FriendsItem type="add" />
        </View>
      )}
    </Container>
  );
};

export default SearchViewer;
