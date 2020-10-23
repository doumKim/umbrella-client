import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import WriteUserInfoContainer from '../../containers/WriteUserInfo/WriteUserInfoContainer';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.palette.mainBackground};
  padding: 45px 15px 0;
`;

const Notice = styled.Text`
  font-size: 35px;
  color: ${props => props.theme.palette.title};
`;

const WriteUserInfo: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image
          source={require('../../../assets/icon/back.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
      <View style={{ alignItems: 'center' }}>
        <View style={{ width: '90%' }}>
          <Notice>가입을 위해 추가정보를 입력해주세요.</Notice>
        </View>
      </View>
      <WriteUserInfoContainer />
    </Container>
  );
};

export default WriteUserInfo;
