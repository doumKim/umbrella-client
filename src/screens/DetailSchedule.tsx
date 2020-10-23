import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import Header from '../components/Common/Header';
import PaddingContainer from '../components/Common/PaddingContainer';
import ScrollContainer from '../components/Common/ScrollContainer';
import DetailScheduleContainer from '../containers/DetailSchedule/DetailScheduleContainer';

const DetailSchedule: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ScrollContainer>
        <PaddingContainer>
          <DetailScheduleContainer />
        </PaddingContainer>
      </ScrollContainer>
      <Header>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require('../../assets/icon/back.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
        <Image
          source={require('../../assets/icon/rowdot.png')}
          style={{ width: 50, height: 50 }}
        />
      </Header>
    </View>
  );
};

export default DetailSchedule;
