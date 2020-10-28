import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import 'moment/locale/ko';
moment.locale('ko');

const Container = styled.View`
  width: 100%;
  border-radius: 12px;
  align-items: center;
  margin-top: 30px;
`;

const StyledText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const ClockViewer: React.FC = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const ticking = setTimeout(() => {
      setTime(moment().format('LTS'));
      setDate(moment().format('MMM Do dddd'));
    }, 1000);
    return () => {
      clearTimeout(ticking);
    };
  }, [time, date]);
  return (
    <Container>
      <StyledText style={{ fontSize: 23 }}>{date}</StyledText>
      <StyledText>{time}</StyledText>
    </Container>
  );
};

export default ClockViewer;
