/**
 * Created by wenbinzhang on 2017/5/4.
 */
import { createAction } from 'redux-actions';
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, ADD_TODO_INPUT, DELETE_TODO } from '../constants/todoActionTypes';

export const addTodo = createAction(ADD_TODO);
export const toggleTodo = createAction(TOGGLE_TODO);
export const setVisibilityFilter = createAction(SET_VISIBILITY_FILTER);
export const addTodoInput = createAction(ADD_TODO_INPUT);
export const deleteTodo = createAction(DELETE_TODO);
