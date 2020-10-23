import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import Header from '../components/Common/Header';
import PaddingContainer from '../components/Common/PaddingContainer';
import ScrollContainer from '../components/Common/ScrollContainer';
import DetailFriendsContainer from '../containers/DetailFriends/DetailFriendsContainer';

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.palette.sub};
`;
const Span = styled.Text`
  font-weight: 700;
  color: ${props => props.theme.palette.main};
`;
const DetailFriends: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ScrollContainer>
        <PaddingContainer>
          <DetailFriendsContainer />
        </PaddingContainer>
      </ScrollContainer>
      <Header>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={require('../../assets/icon/back.png')}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
          <HeaderTitle>
            <Span>이바람</Span>님이 공유한 일정목록
          </HeaderTitle>
        </View>
      </Header>
    </View>
  );
};

export default DetailFriends;
