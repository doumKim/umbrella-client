import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
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
  color: ${props => props.theme.palette.title};
`;

const Loading: React.FC = () => {
  return (
    <Container>
      <Title>{<ActivityIndicator size={'large'} />}</Title>
    </Container>
  );
};

export default Loading;
