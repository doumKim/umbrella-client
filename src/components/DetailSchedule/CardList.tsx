import React, { useState } from 'react';
import CardItem from './CardItem';
import styled from 'styled-components/native';
import { Image, TouchableOpacity } from 'react-native';
import Header from '../Common/Header';
import { useNavigation } from '@react-navigation/native';
import BottomModal from '../Common/BottomModal';

const Wrapper = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;
const Title = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: ${props => props.theme.palette.main};
`;

type Props = {
  type: string;
};

const CardList: React.FC<Props> = ({ type }: Props) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      <Wrapper>
        <Title>논현역 방문하기</Title>
      </Wrapper>
      <CardItem />
      <CardItem />
      <CardItem />
      {type !== 'home' && (
        <Header>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={require('../../../assets/icon/back.png')}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
          {type === 'my' && (
            <TouchableOpacity onPress={openModal}>
              <Image
                source={require('../../../assets/icon/rowdot.png')}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          )}
        </Header>
      )}
      {type === 'my' && (
        <BottomModal show={show} closeModal={closeModal} type="schedule" />
      )}
    </>
  );
};

export default CardList;
