import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { ScheduleType, TodoType } from '../../api/schedule';
import { makeEllipsisText } from '../../modules/helper';

const Container = styled.TouchableOpacity`
  background: ${props => props.theme.palette.scheduleCard};
  height: 60px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 10px;
`;

const Time = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.palette.main};
`;
const Location = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.palette.subSub};
`;
const Content = styled.View``;
type Props = {
  type: string;
  todo: TodoType;
  schedule: ScheduleType;
};

const TodoItem: React.FC<Props> = ({ type, todo, schedule }: Props) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('DetailSchedule', { type, schedule });
  };
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={goToDetail}>
      <Container>
        <Content>
          <Time>
            {todo.hour < 10 ? `0${todo.hour}` : todo.hour}시{' '}
            {todo.minutes < 10 ? `0${todo.minutes}` : todo.minutes}분
          </Time>
          <Location>{makeEllipsisText(todo?.note, 23)}</Location>
        </Content>
        <Image
          source={{
            uri: todo.iconName
              ? todo.iconName
              : 'https://i.ibb.co/yf3gqDD/noweather.png',
          }}
          style={{ width: 40, height: 40 }}
        />
      </Container>
    </TouchableOpacity>
  );
};

export default TodoItem;
