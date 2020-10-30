import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { removeTodo, TodosState } from '../../modules/todos';

type TodoListProps = {
  todos: TodosState;
};

const ListWrapper = styled.View`
  flex: 1;
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
`;

const InfoWrapper = styled.View``;

const TodoNote = styled.Text``;

const TodoTime = styled.Text``;

const TodoLocation = styled.Text``;

const TodoList: React.FC<TodoListProps> = ({ todos }: TodoListProps) => {
  const dispatch = useDispatch();

  return (
    <ListWrapper>
      {todos.map(todo => (
        <TodoListItem key={todo.id}>
          <InfoWrapper>
            <TodoNote>{todo.note}</TodoNote>
            <TodoTime>
              {todo.hour}시 {todo.minutes}분
            </TodoTime>
            <TodoLocation>{todo.placeName}</TodoLocation>
          </InfoWrapper>
          <TouchableOpacity
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => dispatch(removeTodo(todo.id))}
          >
            <Image
              source={require('../../../assets/icon/delete.png')}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
        </TodoListItem>
      ))}
    </ListWrapper>
  );
};

export default TodoList;
