/**
 * Created by zpp on 2017/06/10.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Todos from '../../components/Todos/Todos';


import { 
  addTodo, 
  setVisibilityFilter, 
  addTodoInput, 
  toggleTodo, 
  deleteTodo } from '../../reducers/todoReducer';


class CTodos extends Component {

  componentDidMount () {
    // you can add logic here
  }

  render () {
    return <Todos {...this.props}/>;
  }

}

export default connect(
  (state) => ({
    todos: state.get('todos')
  }),
  (dispatch) => ({
    onFilterChange: (filter) => {
      dispatch(setVisibilityFilter({filter: filter}))
    },
    addTodo: (todo) => {
      dispatch(addTodo(todo));
    },
    onInput: (text) => {
      dispatch(addTodoInput(text));
    },
    toggleTodo: (id) => {
      dispatch(toggleTodo(id));
    },
    deleteTodo: (id) => {
      dispatch(deleteTodo(id));
    }
  })
)(CTodos);