import React from 'react';
import styled from 'styled-components/native';
import WriteScheduleContainer from '../containers/WriteSchedule/WriteScheduleContainer';

const Container = styled.View`
  flex: 1;
  padding: 60px 15px 0;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.palette.mainBackground};
`;

const WriteSchedule: React.FC = () => {
  return (
    <Container>
      <WriteScheduleContainer />
    </Container>
  );
};

export default WriteSchedule;
