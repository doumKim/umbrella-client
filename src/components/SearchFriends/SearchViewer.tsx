import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import FriendsItem from '../Friends/FriendsItem';

const Container = styled.View`

`;

const InputOutline = styled.View`
  background: #f9f7f7;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 15px;
  elevation: 6;
`;
const SearchInput = styled(TextInput)`
  font-size: 20px;
  width: 70%;
`;

const SearchViewer: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <InputOutline>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <Image source={require('../../../assets/icon/back.png') } style={{ width: 30, height: 30 }}/>
        </TouchableOpacity>
        <SearchInput/>
        <Image source={require('../../../assets/icon/close.png') } style={{ width: 20, height: 20 }}/>
      </InputOutline>
      <ScrollView>
        <FriendsItem isReq={false}/>
      </ScrollView>
    </Container>
  );
};

export default SearchViewer;