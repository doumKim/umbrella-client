import { createReducer } from 'typesafe-actions';
import { ADD_TODO, REMOVE_TODO } from './actions';
import { TodosAction, TodosState } from './types';

const initialState: TodosState = [];

const todos = createReducer<TodosState, TodosAction>(initialState, {
  [ADD_TODO]: (state, action) =>
    state.concat({
      ...action.payload,
    }),
  [REMOVE_TODO]: (state, action) =>
    state.filter(todo => {
      return todo.id === action.payload ? false : true;
    }),
});

export default todos;
