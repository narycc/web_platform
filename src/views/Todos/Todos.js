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
  deleteTodo,
  datePickerFocusChange,
  datePickerChange,
  todosSearchRequest,
  todoSearchTypeChange,
  todosSearchMenuClick,
  todosSearchMenuToggle
} from '../../reducers/todoReducer';


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
    deleteTodo: deleteTodo,
    onFocusChange:datePickerFocusChange,
    onDatesChange:datePickerChange,
    onSearch: todosSearchRequest,
    onTypeSearchChange:todoSearchTypeChange,
    onMenuClick:todosSearchMenuClick,
    onMenuToggleClick:todosSearchMenuToggle
  },dispatch)
)(CTodos);