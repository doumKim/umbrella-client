import React from 'react';
import { Dimensions, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { memberWithdraw } from '../api/auth';
import MyProfileContainer from '../containers/Etc/MyProfileContainer';
import { removeUserTokenAsync } from '../modules/auth';

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
  justify-content: flex-end;
  margin-top: 10px;
  flex-direction: row;
`;

const MemberBtn = styled.TouchableOpacity`
  margin-right: ${(props: BtnType) => (props.isUnsubscribe ? '10px' : '20px')};
  background: ${(props: BtnType) =>
    props.isUnsubscribe ? '#aa96da' : '#eaeaea'};
  padding: 8px 15px;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
`;

const MemberText = styled.Text`
  font-size: 15px;
  font-weight: 500;
`;

type BtnType = {
  isUnsubscribe?: boolean;
};

const Etc: React.FC = () => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(removeUserTokenAsync.request());
  };
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
        <MemberBtn
          isUnsubscribe
          onPress={() => {
            memberWithdraw();
            handleSignOut();
          }}
        >
          <MemberText>회원탈퇴</MemberText>
        </MemberBtn>
        <MemberBtn onPress={handleSignOut}>
          <MemberText>로그아웃</MemberText>
        </MemberBtn>
      </Wrapper>
    </Container>
  );
};

export default Etc;
