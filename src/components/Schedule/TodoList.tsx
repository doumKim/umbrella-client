import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { removeTodo, TodosState } from '../../modules/todos';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { makeEllipsisText } from '../../modules/helper';
type TodoListProps = {
  todos: TodosState;
};

const ListWrapper = styled.ScrollView`
  margin-top: 20px;
  width: 95%;
  border-radius: 6px;
`;
const TodoListItem = styled.View`
  flex-direction: row;
  background: ${props => props.theme.palette.scheduleCard};
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 20px 20px;
  border-radius: 5px;
`;
const InfoWrapper = styled.View`
  width: 90%;
`;
const RightWrapper = styled.View`
  width: 10%;
  align-items: center;
  justify-content: center;
`;
const TodoNote = styled.Text`
  color: ${props => props.theme.palette.main};
  font-size: 20px;
  margin-bottom: 5px;
`;
const TodoTime = styled.Text`
  margin-left: 5px;
  color: ${props => props.theme.palette.subSub};
`;

const TodoLocation = styled.Text`
  margin-left: 5px;
  color: ${props => props.theme.palette.sub};
`;
const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TodoList: React.FC<TodoListProps> = ({ todos }: TodoListProps) => {
  const dispatch = useDispatch();
  return (
    <ListWrapper>
      {todos.map(todo => (
        <TodoListItem key={todo.id}>
          <InfoWrapper>
            <TodoNote>{todo.note}</TodoNote>
            <RowWrapper>
              <MaterialCommunityIcons name="watch" size={12} color="#40514e" />
              <TodoTime>
                {todo.hour < 10 ? `0${todo.hour}` : todo.hour}시{' '}
                {todo.minutes < 10 ? `0${todo.minutes}` : todo.minutes}분
              </TodoTime>
            </RowWrapper>
            <RowWrapper>
              <MaterialCommunityIcons
                name="map-marker"
                size={12}
                color="#40514e"
              />
              <TodoLocation>
                {makeEllipsisText(todo.placeName, 28)}
              </TodoLocation>
            </RowWrapper>
          </InfoWrapper>
          <RightWrapper>
            <TouchableOpacity onPress={() => dispatch(removeTodo(todo.id))}>
              <Image
                source={require('../../../assets/icon/delete.png')}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>
          </RightWrapper>
        </TodoListItem>
      ))}
    </ListWrapper>
  );
};

export default TodoList;
