import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  background: ${props => props.theme.palette.scheduleCard};
  height: 60px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 10px;
  
`;

const Time = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.palette.main};
`;
const Location = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.palette.subSub};
`;

const FakeImage = styled.View`
  width: 40px;
  height: 40px;
  background: blue;
  border-radius: 20px;
`;
const Content = styled.View`
`;
const TodoItem: React.FC = () => {
  return (
    <Container>
      <Content>
        <Time>08:00</Time>
        <Location>아침 먹기</Location>
      </Content>
      <FakeImage/>
    </Container>
  );
};

export default TodoItem;