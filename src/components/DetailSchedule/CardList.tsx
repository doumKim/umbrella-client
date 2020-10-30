import React, { useState } from 'react';
import CardItem from './CardItem';
import styled from 'styled-components/native';
import { Image, TouchableOpacity } from 'react-native';
import Header from '../Common/Header';
import { useNavigation } from '@react-navigation/native';
import BottomModal from '../Common/BottomModal';
import { ScheduleType } from '../../api/schedule';

const Wrapper = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;
const Title = styled.Text`
  font-size: 24px;
  font-weight: 500;
  padding-top: ${(props: TitleProps) => (props.isMypage ? '30px' : 0)};
  color: ${props => props.theme.palette.main};
`;

type Props = {
  type: string;
  schedule: ScheduleType | null;
};

type TitleProps = {
  isMypage: number;
};

const CardList: React.FC<Props> = ({ type, schedule }: Props) => {
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
        <Title isMypage={type === 'my' ? 1 : 0}>{schedule?.title}</Title>
      </Wrapper>
      {schedule?.todos.map(todo => {
        return <CardItem key={todo.id} todo={todo} />;
      })}
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
        <BottomModal
          show={show}
          closeModal={closeModal}
          type="schedule"
          scheduleId={schedule?.id}
          id={null}
        />
      )}
    </>
  );
};

export default CardList;
