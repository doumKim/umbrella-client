import React from 'react';
import { Dimensions, Image } from 'react-native';
import styled from 'styled-components/native';
import MyProfileContainer from '../containers/Etc/MyProfileContainer';

const { height } = Dimensions.get('screen');

const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.palette.mainBackground};
`;

const TopHeader = styled.View`
  height: ${height / 3}px;
  background: ${props => props.theme.palette.scheduleCard};
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const Wrapper = styled.View`
  align-items: flex-end;
`;

const Logout = styled.Text`
  font-size: 15px;
  font-weight: 500;
  margin-right: 20px;
`;

const Etc: React.FC = () => {
  return (
    <Container>
      <TopHeader>
        <Image
          source={require('../../assets/icon/logo.png')}
          style={{ width: 180, height: 130 }}
        />
      </TopHeader>
      <MyProfileContainer />
      <Wrapper>
        <Logout>로그아웃</Logout>
      </Wrapper>
    </Container>
  );
};

export default Etc;
