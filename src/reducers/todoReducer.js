/**
 * Created by wenbinzhang on 2017/5/4.
 */
import { handleActions } from 'redux-actions';
import { TodoState } from '../constants/todoModels';
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  ADD_TODO_INPUT,
  DELETE_TODO
} from '../constants/todoActionTypes';

const todoReducer = handleActions({
  [ADD_TODO]: (state, {payload}) => {
    let todos = state.get('todos').push(payload);
    return state.set('todos', todos);
  },
  [TOGGLE_TODO]: (state, {payload}) => {
    let todos = state.get('todos').map(todo => {
      if (todo.id === payload) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    return state.set('todos', todos);
  },
  [ADD_TODO_INPUT]: (state, {payload}) => {
    return state.set('inputValue', payload);
  },
  [SET_VISIBILITY_FILTER]: (state, {payload}) => {
    return state.set('visibilityFilter', payload.filter);
  },
  [DELETE_TODO]: (state, {payload}) => {
    let todos = state.get('todos').filter(todo => {
      return todo.id !== payload;
    });
    return state.set('todos', todos);
  }
}, TodoState);

export default todoReducer;