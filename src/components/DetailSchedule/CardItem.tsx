import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { TodoType } from '../../api/schedule';

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
const Location = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.palette.brightFont};
`;
const Date = styled.Text`
  font-size: 13px;
  margin-left: 20px;
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
              style={{ width: 28, height: 28 }}
            />
            <Location>
              {todo?.placeName} / {todo?.note}
            </Location>
          </Wrapper>
          <Date>
            {todo?.hour}시 {todo?.minutes}분
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
          <Temperature>20°C</Temperature>
        </WeatherContent>
      </Card>
    </Container>
  );
};

export default CardItem;
