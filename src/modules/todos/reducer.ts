import { createReducer } from 'typesafe-actions';
import {
  ADD_SCHEDULE_INFO,
  ADD_TODO,
  CLEAR_TODOS,
  REMOVE_TODO,
} from './actions';
import { ScheduleInputState, TodosAction } from './types';

const initialState: ScheduleInputState = {
  title: '',
  date: new Date(),
  todos: [],
};

const todos = createReducer<ScheduleInputState, TodosAction>(initialState, {
  [ADD_TODO]: (state, action) => ({
    ...state,
    todos: state.todos.concat({
      ...action.payload,
    }),
  }),
  [REMOVE_TODO]: (state, action) => ({
    ...state,
    todos: state.todos.filter(todo => {
      return todo.id === action.payload ? false : true;
    }),
  }),
  [ADD_SCHEDULE_INFO]: (state, action) => ({
    ...state,
    title: action.payload.title,
    date: action.payload.date,
  }),
  [CLEAR_TODOS]: state => ({
    ...state,
    title: '',
    date: new Date(),
    todos: [],
  }),
});

export default todos;
