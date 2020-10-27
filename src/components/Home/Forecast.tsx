import React from 'react';
import { Text, Image, View } from 'react-native';
import styled from 'styled-components/native';
import { MdotDConverter, WeekConverter } from '../../lib/util/DateConverter';
import { WeatherDB } from '../../lib/util/WeatherDB';

const Container = styled.View`
  background: ${props => props.theme.palette.scheduleCard};
  border-radius: 12px;
  padding: 10px 30px; ;
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
  margin-right: 5px;
`;
const DateText = styled.Text`
  font-size: 15px;
  color: ${props => props.theme.palette.main};
`;
const TempText = styled.Text`
  color: ${props => props.theme.palette.main};
`;
const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
type WeatherData = {
  main: string;
  icon: string;
};

type ArrayData = {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: Array<WeatherData>;
};
type Props = {
  results: Array<ArrayData>;
};

const Forecast: React.FC<Props> = ({ results }: Props) => {
  console.log('333333333333333', results);
  return (
    <Container>
      {results &&
        results
          .filter(val => val.dt_txt.split(' ')[1] === '12:00:00')
          .map((result, index) => (
            <View key={result.dt}>
              <Item>
                <RowWrapper>
                  <WeekText>
                    {WeekConverter(result.dt_txt.split(' ')[0])}
                  </WeekText>
                  <DateText>
                    {MdotDConverter(result.dt_txt.split(' ')[0])}
                  </DateText>
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
                  <TempText>{result.main.temp}°C</TempText>
                </RowWrapper>
              </Item>
              {index !== 4 && (
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <View
                    style={{
                      width: '85%',
                      height: 2,
                      backgroundColor: '#DBDBDB',
                    }}
                  />
                </View>
              )}
            </View>
          ))}
    </Container>
  );
};

export default Forecast;
