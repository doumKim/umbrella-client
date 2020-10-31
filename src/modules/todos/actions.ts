import { InputTodoType } from './types';
import { deprecated } from 'typesafe-actions';
const { createStandardAction } = deprecated;

export const ADD_TODO = 'todos/ADD_TODO' as const;
export const REMOVE_TODO = 'todos/REMOVE_TODO';
export const CHANGE_TODO = 'todos/CHANGE_TODO';

export const ADD_SCHEDULE_INFO = 'todos/ADD_SCHEDULE_INFO' as const;

export const SUBMIT_TODOS = 'todos/SUBMIT_TODOS';
export const CLEAR_TODOS = 'todos/CLEAR_TODOS';

let nextId = 1;

export const addTodo = (todo: InputTodoType) => ({
  type: ADD_TODO,
  payload: {
    ...todo,
    id: nextId++,
  },
});

export const addScheduleInfo = (title: string, date: Date) => ({
  type: ADD_SCHEDULE_INFO,
  payload: {
    title,
    date,
  },
});

export const removeTodo = createStandardAction(REMOVE_TODO)<number>();
export const clearTodos = createStandardAction(CLEAR_TODOS)();
