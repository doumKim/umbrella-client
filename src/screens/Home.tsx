import React from 'react';
import { Dimensions, Image } from 'react-native';
import styled from 'styled-components/native';
import Header from '../components/Common/Header';
import ScrollContainer from '../components/Common/ScrollContainer';

const { height } = Dimensions.get('screen');

const Container = styled.View`
  padding: 40px 15px 20px;
`;

const Section = styled.View``;

const Main = styled.View`
  background: blue;
  height: ${height / 2}px;
  border-radius: 12px;
  margin-bottom: 15px;
`;

const Dust = styled.View`
  background: blue;
  height: ${height / 6}px;
  border-radius: 12px;
  margin-bottom: 15px;
`;
const Forecast = styled.View`
  background: blue;
  height: 300px;
  border-radius: 12px;
`;

const Home: React.FC = () => {
  return (
    <ScrollContainer>
      <Container>
        <Header title="">
          <Image source={require('../../assets/icon/plus.png') } style={{ width: 50, height: 50 }}/>
        </Header>
        <Section>
          <Main></Main>
          <Dust></Dust>
          <Forecast></Forecast>
        </Section>
      </Container>
    </ScrollContainer>
  );
};

export default Home;
