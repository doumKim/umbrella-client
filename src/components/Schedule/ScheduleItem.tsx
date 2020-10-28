import React from 'react';
import styled from 'styled-components/native';
import { ScheduleType } from '../../api/schedule';
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

type Props = {
  type: string;
  schedule: ScheduleType;
};

const ScheduleItem: React.FC<Props> = ({ type, schedule }: Props) => {
  const { title, date, todos } = schedule;
  return (
    <Container>
      <TopSection>
        <ItemTitle>{title}</ItemTitle>
        <ItemDate>{date}</ItemDate>
      </TopSection>
      {todos.length > 0 &&
        todos.map(todo => {
          return (
            <TodoItem
              type={type}
              todo={todo}
              key={todo.id}
              schedule={schedule}
            />
          );
        })}
    </Container>
  );
};

export default ScheduleItem;
