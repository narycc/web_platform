/**
 * Created by wenbinzhang on 2017/5/8.
 */

import { connect } from 'react-redux';
import { addTodo, setVisibilityFilter, addTodoInput, toggleTodo, deleteTodo } from '../../actions/todoActions';
import Todo from '../../components/Todo/Todo';

export default connect(
  (state) => ({
    todos: state.get('todoData')
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
)(Todo);