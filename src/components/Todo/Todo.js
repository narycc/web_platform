/**
 * Created by wenbinzhang on 2017/5/9.
 */
import React from 'react';
import AddTodoInput from './AddTodoInput';
import TodoFilter from './TodoFilter';
import TodoList from './TodoList';

const Todo = ({todos, onFilterChange, addTodo, onInput, toggleTodo, deleteTodo}) => {

  let todoList = todos.get('todos');
  let selectFilter = todos.get('visibilityFilter');
  let inputValue = todos.get('inputValue');

  return (
    <div className="animated fadeIn">
      <div className="row align-items-center justify-content-center" style={{height: '150px'}}>
        <div className="w-50">
          <AddTodoInput
            inputValue={inputValue}
            addTodo={addTodo}
            onInput={onInput}
          />
          <TodoFilter
            selectFilter={selectFilter}
            onFilterChange={onFilterChange}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="w-50">
          <TodoList
            todoList={todoList}
            selectFilter={selectFilter}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
          />
        </div>
      </div>
    </div>
  )

};

export default Todo;