import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { height } = Dimensions.get('screen');

const Container = styled.View`
  border: 1px solid black;
  height: ${height / 2}px;
  border-radius: 12px;
  margin-bottom: 15px;
`;

const MainWeather: React.FC = () => {
  return <Container></Container>;
};

export default MainWeather;
