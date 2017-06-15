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
    state: state.get('todoState')
  }),
  (dispatch) => bindActionCreators({
    onFilterChange: setVisibilityFilter,
    addTodo: addTodo,
    onInput: addTodoInput,
    toggleTodo: toggleTodo,
    deleteTodo: deleteTodo
  },dispatch)
)(CTodos);