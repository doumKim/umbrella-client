import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { height } = Dimensions.get('screen');

const Container = styled.View`
  background: ${props => props.theme.palette.mainBackground};
  height: ${height - 160}px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: ${props => props.theme.palette.main};
`;

const ErrorComponent: React.FC = () => {
  return (
    <Container>
      <Title>⚠️ 서버 에러 발생! ⚠️</Title>
    </Container>
  );
};

export default ErrorComponent;
