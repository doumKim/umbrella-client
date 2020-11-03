import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import styled from 'styled-components/native';
import { TimestampToDate, TimestampToWeek } from '../../lib/util/DateConverter';
import { WeatherDB } from '../../lib/util/WeatherDB';

const Container = styled.View`
  background: ${props => props.theme.palette.scheduleCard};
  border-radius: 12px;
  padding: 10px 30px;
  justify-content: center;
  min-height: 450px;
`;

const Item = styled.View`
  margin: 7px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const WeekText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.palette.main};
  margin-right: 7px;
`;
const DateText = styled.Text`
  font-size: 15px;
  color: ${props => props.theme.palette.main};
`;
const TempText = styled.Text`
  color: ${(props: TempType) => (props.isMax ? '#3d7ea6' : '#cc0e74')};
`;
const Slash = styled.Text`
  color: ${props => props.theme.palette.main};
  margin: 0 5px;
`;
const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${(props: RowType) =>
    props.isLeft ? 'flex-start' : 'flex-end'};
  min-width: ${(props: RowType) => (props.isLeft ? '65px' : '60px')};
`;
type WeatherData = {
  main: string;
  icon: string;
};

type ArrayData = {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: Array<WeatherData>;
};
type Props = {
  results: Array<ArrayData>;
  isLoading: boolean;
};

type TempType = {
  isMax?: boolean;
};
type RowType = {
  isLeft?: boolean;
};

const Forecast: React.FC<Props> = ({ results, isLoading }: Props) => {
  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        results &&
        results.map((result, index) => (
          <View key={result.dt}>
            <Item>
              <RowWrapper isLeft>
                <WeekText>{TimestampToWeek(result.dt)}</WeekText>
                <DateText>{TimestampToDate(result.dt)}</DateText>
              </RowWrapper>
              {WeatherDB[result.weather[0].main] ? (
                <Image
                  style={{ width: 40, height: 40 }}
                  source={{ uri: WeatherDB[result.weather[0].main].iconName }}
                />
              ) : (
                <Image
                  style={{ width: 40, height: 40 }}
                  source={{
                    uri: `http://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`,
                  }}
                />
              )}
              <RowWrapper>
                <TempText>{Math.round(result.temp.min)}°</TempText>
                <Slash>/</Slash>
                <TempText isMax>{Math.round(result.temp.max)}°</TempText>
              </RowWrapper>
            </Item>
            {index !== results.length - 1 && (
              <View style={{ width: '100%', alignItems: 'center' }}>
                <View
                  style={{
                    width: '90%',
                    height: 2,
                    backgroundColor: '#DBDBDB',
                  }}
                />
              </View>
            )}
          </View>
        ))
      )}
    </Container>
  );
};

export default Forecast;
