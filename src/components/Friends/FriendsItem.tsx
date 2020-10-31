import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { accpetFriend, rejectFriend } from '../../api/friend';
import BottomModal from '../Common/BottomModal';

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
  sendPushAlarm(): void;
};

type NameProps = {
  name: string;
  avatar: string;
};

const ImageWrapper = styled.View`
  border-radius: 20px;
  overflow: hidden;
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
  sendPushAlarm,
}: Props) => {
  const [show, setShow] = useState(false);

  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };

  const navigation = useNavigation();
  const goToDetail = (name: string) => {
    navigation.navigate('DetailFriends', { name, id });
  };
  return (
    <>
      {type === 'req' && (
        <Wrapper>
          <Container>
            <Profile name={name} avatar={avatar} />
          </Container>
          <RightContent>
            <AcceptBtn
              onPress={() => {
                accpetFriend(id);
              }}
            >
              <AcceptText>수락</AcceptText>
            </AcceptBtn>
            <RejectBtn
              onPress={() => {
                rejectFriend(id);
              }}
            >
              <RejectText>거절</RejectText>
            </RejectBtn>
          </RightContent>
        </Wrapper>
      )}
      {(type === 'search' || type === 'list') && (
        <Wrapper>
          <TouchableOpacity onPress={() => goToDetail(name)}>
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
