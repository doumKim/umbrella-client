import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background: ${props => props.theme.palette.profileCard};
  border-radius: 25px;
  padding: 20px 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LeftContent = styled.View`
  position: relative;
  margin-right: 5%;
`;
const RightContent = styled.View`
  margin-right: 20px;
  margin-left: 5%;
`;
const Span = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 10px;
`;
const Label = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin-right: 20px;
`;
const ModifiableText = styled.Text`
  font-size: 18px;
  margin-right: 10px;
  color: ${props => props.theme.palette.title};
`;
const NormalText = styled.Text`
  font-size: 18px;
`;

const MyProfile: React.FC = () => {
  return (
    <Container>
      <LeftContent>
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
      </LeftContent>
      <RightContent>
        <Span>
          <Label>닉네임</Label>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <ModifiableText>김장마</ModifiableText>
            <Image
              source={require('../../../assets/icon/write.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </Span>
        <Span>
          <Label>유저ID</Label>
          <NormalText>test123</NormalText>
        </Span>
      </RightContent>
    </Container>
  );
};

export default MyProfile;
