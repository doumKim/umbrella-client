import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import Header from '../components/Common/Header';
import ScrollContainer from '../components/Common/ScrollContainer';
import ScheduleContainer from '../containers/Schedule/ScheduleContainer';

const Container = styled.View`
  padding: 40px 15px 20px;
`;

const Schedule: React.FC = () => {
  return (
    <ScrollContainer>
      <Container>
        <Header title="내 일정 목록">
          <Image source={require('../../assets/icon/plus.png') } style={{ width: 50, height: 50 }}/>
        </Header>
        <ScheduleContainer/>
      </Container>
    </ScrollContainer>
  );
};

export default Schedule;
