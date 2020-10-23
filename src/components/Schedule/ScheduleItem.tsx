import React from 'react';
import styled from 'styled-components/native';
import TodoItem from './TodoItem';

const Container = styled.View`
  margin-bottom: 15px;
`;
const TopSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const ItemTitle = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: ${props => props.theme.palette.main};
  margin-right: 10px;
`;
const ItemDate = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.palette.sub};
`;

const ScheduleItem: React.FC = () => {
  return (
    <Container>
      <TopSection>
        <ItemTitle>통영 여행</ItemTitle>
        <ItemDate>2020.10.09 금</ItemDate>
      </TopSection>
      <TodoItem />
      <TodoItem />
    </Container>
  );
};

export default ScheduleItem;
