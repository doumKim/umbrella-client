import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  margin-bottom: 15px;
`;

const Card = styled.View`
  background: green;
  padding: 15px;
  border-radius: 12px;
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

const CardItem: React.FC = () => {
  return (
    <Container>
      <Card>
        <TextContent>
          <Wrapper>
            <Image
              source={require('../../../assets/icon/flag-white.png')}
              style={{ width: 28, height: 28 }}
            />
            <Location>평택시청</Location>
          </Wrapper>
          <Date>10월 9일 (금) 08:00</Date>
        </TextContent>
        <WeatherContent>
          <Image
            source={require('../../../assets/weather/rainy.png')}
            style={{ width: 150, height: 150 }}
          />
          <Temperature>20°C</Temperature>
        </WeatherContent>
      </Card>
    </Container>
  );
};

export default CardItem;
