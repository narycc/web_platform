/**
 * Created by wenbinzhang on 2017/5/4.
 */
import { handleActions,createAction } from 'redux-actions';
import Immutable from 'immutable';



export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const ADD_TODO_INPUT = 'ADD_TODO_INPUT';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const DELETE_TODO = 'DELETE_TODO';
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export const addTodo = createAction(ADD_TODO);
export const toggleTodo = createAction(TOGGLE_TODO);
export const setVisibilityFilter = createAction(SET_VISIBILITY_FILTER);
export const addTodoInput = createAction(ADD_TODO_INPUT);
export const deleteTodo = createAction(DELETE_TODO);

export const TodoState = Immutable.fromJS({
  todos: [],
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  inputValue: ''
});

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