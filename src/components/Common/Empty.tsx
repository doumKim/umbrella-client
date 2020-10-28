import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { height } = Dimensions.get('screen');

const Container = styled.View`
  background: ${props => props.theme.palette.mainBackground};
  height: ${height - 210}px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: ${props => props.theme.palette.main};
`;

const Empty: React.FC = () => {
  return (
    <Container>
      <Title>리스트가 비었습니다. 🗑</Title>
    </Container>
  );
};

export default Empty;
