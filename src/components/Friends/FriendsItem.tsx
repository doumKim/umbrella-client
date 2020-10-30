import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { accpetFriend, rejectFriend, addFriend } from '../../api/friend';
import BottomModal from '../Common/BottomModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
//import { getPushToken } from '../../api/auth';
const Container = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftContent = styled.View`
  flex-direction: row;
  align-items: center;
`;
const RightContent = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  right: 0;
`;

const AcceptBtn = styled(TouchableOpacity)`
  background: ${props => props.theme.palette.title};
  padding: 6px 11px;
  border-radius: 5px;
`;
const AcceptText = styled.Text`
  color: ${props => props.theme.palette.mainBackground};
`;
const RejectBtn = styled(TouchableOpacity)`
  margin-left: 10px;
  background: white;
  padding: 5px 10px;
  border: 2px solid #edeef5;
  border-radius: 5px;
`;
const RejectText = styled.Text``;
const Title = styled.Text`
  margin-left: 10px;
  font-weight: 500;
  color: ${props => props.theme.palette.main};
`;

const Wrapper = styled.View`
  position: relative;
  justify-content: center;
`;

type Props = {
  type: string;
  id: number;
  name: string;
  avatar: string;
  pushToken: string;
  onReqClick(): void;
};

type NameProps = {
  name: string;
  avatar: string;
};

const ImageWrapper = styled.View`
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;
const Profile: React.FC<NameProps> = ({ name, avatar }: NameProps) => {
  return (
    <LeftContent>
      <ImageWrapper>
        <Image
          source={{
            uri: avatar
              ? avatar
              : 'https://i.ibb.co/nkxzFDZ/default-profile.png',
          }}
          style={{ width: 40, height: 40 }}
        />
      </ImageWrapper>
      <Title>{name}</Title>
    </LeftContent>
  );
};

const FriendsItem: React.FC<Props> = ({
  type,
  id,
  name,
  avatar,
  pushToken,
  onReqClick,
}: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const socket = io('http://bringumb.tk', {
      transports: ['websocket'],
    });
  }, []);
  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };
  //받은pushToken으로 pushAlarm날림
  const sendPushNotification = async (expoPushToken: string) => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'push알림이 왔습니다',
      body: '잘도착했나요?',
      data: { data: 'goes here' },
    };

    await fetch('http://bringumb.tk/pushAlarm', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  const sendPushAlarm = async () => {
    //친구요청보냄
    await onReqClick();
    await sendPushNotification(pushToken);
  };

  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('DetailFriends');
  };
  return (
    <>
      {type === 'req' && (
        <Wrapper>
          <Container>
            <Profile name={name} avatar={avatar} />
          </Container>
          <RightContent>
            <AcceptBtn onPress={() => accpetFriend}>
              <AcceptText>수락</AcceptText>
            </AcceptBtn>
            <RejectBtn onPress={() => rejectFriend}>
              <RejectText>거절</RejectText>
            </RejectBtn>
          </RightContent>
        </Wrapper>
      )}
      {type === 'search' && (
        <Wrapper>
          <TouchableOpacity onPress={goToDetail}>
            <Container>
              <Profile name={name} avatar={avatar} />
            </Container>
          </TouchableOpacity>
          <RightContent>
            <TouchableOpacity onPress={openModal}>
              <Image
                source={require('../../../assets/icon/coldot.png')}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
          </RightContent>
          <BottomModal
            type="friends"
            show={show}
            id={id}
            closeModal={closeModal}
            scheduleId={null}
          />
        </Wrapper>
      )}
      {type === 'add' && (
        <Wrapper>
          <Container>
            <Profile name={name} avatar={avatar} />
          </Container>
          <RightContent>
            <AcceptBtn
              onPress={() => {
                sendPushAlarm();
              }}
            >
              <AcceptText>요청</AcceptText>
            </AcceptBtn>
          </RightContent>
        </Wrapper>
      )}
    </>
  );
};

export default FriendsItem;
