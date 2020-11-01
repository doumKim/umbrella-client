import React from 'react';
import { Image, View } from 'react-native';
import styled from 'styled-components/native';
import { TodoType } from '../../api/schedule';
import { makeEllipsisText } from '../../modules/helper';

const Container = styled.View`
  margin-bottom: 15px;
`;
const Card = styled.ImageBackground`
  padding: 15px;
  border-radius: 12px;
  overflow: hidden;
`;
const TextContent = styled.View``;
const Wrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;
const Place = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: ${props => props.theme.palette.brightFont};
  margin-bottom: 2px;
`;
const Note = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: #cadefc;
  margin-bottom: 5px;
`;
const Date = styled.Text`
  font-size: 15px;
  margin-left: 28px;
  color: ${props => props.theme.palette.brightFont};
`;
const WeatherContent = styled.View`
  align-items: center;
`;
const Temperature = styled.Text`
  font-size: 35px;
  color: ${props => props.theme.palette.brightFont};
`;

type Props = {
  todo: TodoType | null;
};

const CardItem: React.FC<Props> = ({ todo }: Props) => {
  return (
    <Container>
      <Card
        source={{
          uri: todo?.backdrop
            ? todo?.backdrop
            : 'https://i.ibb.co/j4hxLcF/backdrop-cloudy.png',
        }}
      >
        <TextContent>
          <Wrapper>
            <Image
              source={require('../../../assets/icon/flag-white.png')}
              style={{ width: 24, height: 24 }}
            />
            <View>
              <Place>{makeEllipsisText(todo?.placeName, 28)}</Place>
              <Note>{makeEllipsisText(todo?.note, 25)}</Note>
            </View>
          </Wrapper>
          <Date>
            {todo && todo.hour < 10 ? `0${todo.hour}` : todo?.hour}시{' '}
            {todo && todo.minutes < 10 ? `0${todo.minutes}` : todo?.minutes}분
          </Date>
        </TextContent>
        <WeatherContent>
          <Image
            source={{
              uri: todo?.iconName
                ? todo?.iconName
                : 'https://i.ibb.co/yf3gqDD/noweather.png',
            }}
            style={{ width: 150, height: 150 }}
          />
          <Temperature>{todo?.temp === '' ? '' : `${todo?.temp}°`}</Temperature>
        </WeatherContent>
      </Card>
    </Container>
  );
};

export default CardItem;
