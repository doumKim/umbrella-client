import React from 'react';
import { ActivityIndicator, Dimensions, Image } from 'react-native';
import styled from 'styled-components/native';
import ClockViewer from './ClockViewer';
import { WeatherDB } from '../../lib/util/WeatherDB';
const { height } = Dimensions.get('screen');

type Props = {
  isLoading: boolean;
  temperature: number;
  name: string;
  icon: string;
  main: string;
};

const Container = styled.ImageBackground`
  min-height: ${height / 2}px;
  max-height: 700px;
  border-radius: 12px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: white;
`;
const Wrapper = styled.View`
  min-height: 250px;
  align-items: center;
  justify-content: center;
`;

const MainWeather: React.FC<Props> = ({
  isLoading,
  main,
  temperature,
  name,
  icon,
}: Props) => {
  return (
    <Container
      source={{
        uri: WeatherDB[main]
          ? WeatherDB[main].backdrop
          : 'https://i.ibb.co/j4hxLcF/backdrop-cloudy.png',
      }}
    >
      {isLoading ? (
        <Wrapper>
          <ActivityIndicator color="white" size="large" />
        </Wrapper>
      ) : (
        <Wrapper>
          <RowContainer>
            <Image
              source={require('../../../assets/icon/flag-white.png')}
              style={{ width: 30, height: 30 }}
            />
            <StyledText>{name}</StyledText>
          </RowContainer>
          {WeatherDB[main] ? (
            <Image
              style={{ width: 150, height: 150 }}
              source={{ uri: WeatherDB[main].iconName }}
            />
          ) : (
            <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: `http://openweathermap.org/img/wn/${icon}@4x.png`,
              }}
            />
          )}
          <StyledText style={{ fontSize: 45, marginRight: 20 }}>
            {temperature}°
          </StyledText>
        </Wrapper>
      )}
      <ClockViewer />
    </Container>
  );
};

export default MainWeather;
