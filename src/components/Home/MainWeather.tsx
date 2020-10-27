import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import ClockViewer from './ClockViewer';
import { FontAwesome } from '@expo/vector-icons';
import { WeatherDB } from '../../lib/util/WeatherDB';
const { height } = Dimensions.get('screen');

type Props = {
  isLoading: boolean;
  temperature: number;
  name: string;
  icon: string;
  main: string;
  handleRefersh(): void;
};

type ContainerTypes = {
  backdrop: string;
};

const Container = styled.View`
  min-height: ${height / 2}px;
  border-radius: 12px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  background: ${(props: ContainerTypes) => props.backdrop};
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
  handleRefersh,
}: Props) => {
  return (
    <Container
      backdrop={
        WeatherDB[main] && WeatherDB[main].backdrop
          ? WeatherDB[main].backdrop
          : 'gray'
      }
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
          <RowContainer>
            <StyledText style={{ fontSize: 36, marginRight: 20 }}>
              {temperature}°C
            </StyledText>
            <TouchableOpacity onPress={handleRefersh}>
              <FontAwesome name="refresh" size={24} color="white" />
            </TouchableOpacity>
          </RowContainer>
        </Wrapper>
      )}
      <ClockViewer />
    </Container>
  );
};

export default MainWeather;
