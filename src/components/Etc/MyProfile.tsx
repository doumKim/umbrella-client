import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import ChangeProfileModal from './ChangeProfileModal';

const Container = styled.View`
  background: ${props => props.theme.palette.profileCard};
  border-radius: 25px;
  padding: 20px 50px;
  align-items: center;
  justify-content: center;
`;

const TopContent = styled.View`
  position: relative;
  margin-bottom: 10px;
`;
const BottomContent = styled.View`
  align-items: center;
  width: 70%;
  max-width: 300px;
`;
const Span = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 10px;
  width: 100%;
`;
const Label = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin-right: 20px;
`;
const NickName = styled.Text`
  font-size: 18px;
  margin-right: 10px;
  color: ${props => props.theme.palette.title};
  min-width: 110px;
`;
const UserId = styled.Text`
  font-size: 18px;
  margin-right: 10px;
  color: ${props => props.theme.palette.title};
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: black;
  min-width: 110px;
`;

const MyProfile: React.FC = () => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState('nickname');

  const closeModal = () => {
    setShow(false);
  };
  const openNicknameModal = () => {
    setType('nickname');
    setShow(true);
  };
  const openUserIdModal = () => {
    setType('userid');
    setShow(true);
  };
  return (
    <Container>
      <TopContent>
        <Image
          source={require('../../../assets/icon/camera.png')}
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            top: -2,
            left: -2,
            zIndex: 100,
          }}
        />
        <Image
          source={require('../../../assets/icon/defaultprofile.png')}
          style={{ width: 80, height: 80 }}
        />
      </TopContent>
      <BottomContent>
        <Span>
          <Label>닉네임</Label>
          <TouchableOpacity
            onPress={openNicknameModal}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <NickName>김장마</NickName>
            <Image
              source={require('../../../assets/icon/write.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </Span>
        <Span>
          <Label>유저ID</Label>
          {/* TODO: Conatiner에서 받은 id값 여부에 따라 수정 아이콘, 밑줄 보임 구현하기 */}
          <UserId></UserId>
          <TouchableOpacity
            onPress={openUserIdModal}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Image
              source={require('../../../assets/icon/write.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </Span>
      </BottomContent>
      <ChangeProfileModal type={type} show={show} closeModal={closeModal} />
    </Container>
  );
};

export default MyProfile;
