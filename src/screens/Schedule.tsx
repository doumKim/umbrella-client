import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import Header from '../components/Common/Header';
import PaddingContainer from '../components/Common/PaddingContainer';
import ScrollContainer from '../components/Common/ScrollContainer';
import ScheduleContainer from '../containers/Schedule/ScheduleContainer';

const Schedule: React.FC = () => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('WriteSchedule');
  };
  return (
    <View>
      <ScrollContainer>
        <PaddingContainer>
          <ScheduleContainer />
        </PaddingContainer>
      </ScrollContainer>
      <Header title="내 일정 목록">
        <TouchableOpacity onPress={goToDetail}>
          <Image
            source={require('../../assets/icon/plus.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </Header>
    </View>
  );
};

export default Schedule;
