import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Image,
  View,
  GestureResponderEvent,
} from 'react-native';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import CardList from '../components/DetailSchedule/CardList';
import WeatherContainer from '../containers/Home/WeatherContainer';

const { height } = Dimensions.get('screen');

const Section = styled.View``;

const Wrapper = styled.View`
  background: ${props => props.theme.palette.mainBackground};
  width: 100%;
  flex: 1;
  padding-top: 40px;
`;

const Padding = styled.View`
  padding: 0 15px 170px;
`;
const HomeScrollView = styled.ScrollView`
  background: ${props => props.theme.palette.mainBackground};
  margin-top: 50px;
  min-height: ${height}px;
  z-index: -100;
`;

const Dot = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 25px;
  margin: 0 3px;
`;

type DotTypes = {
  index: number;
  isActive: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

const Home: React.FC = () => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('WriteSchedule');
  };
  return (
    <View style={{ flex: 1 }}>
      <Wrapper>
        <Swiper
          from={0}
          controlsProps={{
            prevPos: false,
            nextPos: false,
            dotsPos: 'top',
            DotComponent: ({ index, isActive }: DotTypes) => {
              if (isActive && index === 0) {
                return (
                  <Image
                    source={require('../../assets/tab/home.png')}
                    style={{ width: 22, height: 22 }}
                  />
                );
              }
              if (!isActive && index === 0) {
                return (
                  <Image
                    source={require('../../assets/icon/home-inactive.png')}
                    style={{ width: 22, height: 22 }}
                  />
                );
              }
              if (isActive && index !== 0) {
                return <Dot style={{ backgroundColor: '#367ce0' }} />;
              }
              return <Dot style={{ backgroundColor: '#94bceb' }} />;
            },
          }}
        >
          <Section>
            <WeatherContainer />
          </Section>
          {/* 향후 컨테이너에서 값받아온후 갯수 3개만 렌더링하기 */}
          <HomeScrollView>
            <Padding>
              <CardList type="home" />
            </Padding>
          </HomeScrollView>
          <HomeScrollView>
            <Padding>
              <CardList type="home" />
            </Padding>
          </HomeScrollView>
        </Swiper>
      </Wrapper>
      <View style={{ position: 'absolute', top: 37, right: 15 }}>
        <TouchableOpacity onPress={goToDetail}>
          <Image
            source={require('../../assets/icon/plus.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
