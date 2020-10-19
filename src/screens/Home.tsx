import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Header from '../components/Common/Header';
import PaddingContainer from '../components/Common/PaddingContainer';
import ScrollContainer from '../components/Common/ScrollContainer';

const { height } = Dimensions.get('screen');

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
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('WriteSchedule');
  };
  return (
    <View>
      <ScrollContainer>
        <PaddingContainer>
          <Section>
            <Main></Main>
            <Dust></Dust>
            <Forecast></Forecast>
          </Section>
        </PaddingContainer>
      </ScrollContainer>
      <Header title=" ">
        <TouchableOpacity onPress={goToDetail}>
          <Image source={require('../../assets/icon/plus.png') } style={{ width: 50, height: 50 }}/>
        </TouchableOpacity>
      </Header>
    </View>
  );
};

export default Home;
