import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
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
};

type NameProps = {
  name: string;
};

const Profile: React.FC<NameProps> = ({ name }: NameProps) => {
  return (
    <LeftContent>
      <Image
        source={require('../../../assets/icon/defaultprofile.png')}
        style={{ width: 40, height: 40 }}
      />
      <Title>{name}</Title>
    </LeftContent>
  );
};

const FriendsItem: React.FC<Props> = ({ type }: Props) => {
  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
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
            <Profile name="고태풍" />
          </Container>
          <RightContent>
            <AcceptBtn>
              <AcceptText>수락</AcceptText>
            </AcceptBtn>
            <RejectBtn>
              <RejectText>거절</RejectText>
            </RejectBtn>
          </RightContent>
        </Wrapper>
      )}
      {type === 'search' && (
        <Wrapper>
          <TouchableOpacity onPress={goToDetail}>
            <Container>
              <Profile name="고태풍" />
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
          <BottomModal type="friends" show={show} closeModal={closeModal} />
        </Wrapper>
      )}
      {type === 'add' && (
        <Wrapper>
          <Container>
            <Profile name="고태풍" />
          </Container>
          <RightContent>
            <AcceptBtn>
              <AcceptText>요청</AcceptText>
            </AcceptBtn>
          </RightContent>
        </Wrapper>
      )}
    </>
  );
};

export default FriendsItem;
