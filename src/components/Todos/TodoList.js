/**
 * Created by zpp on 2017/06/10.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { VisibilityFilters } from '../../reducers/todoReducer';

const TodoList = ({selectFilter, deleteTodo, toggleTodo, todoList}) => {
  return (
    <ul className="list-group">
      {
        function () {
          if (todoList.size) {
            let showNum = 0;
            let showList = [];
            todoList.forEach(i => {
              let canShow = true;
              if ((selectFilter === VisibilityFilters.SHOW_COMPLETED && !i.complete) || (selectFilter === VisibilityFilters.SHOW_ACTIVE && i.complete)) {
                canShow = false;
              }
              if (canShow) {
                showNum++;
                showList.push(
                  <li
                    key={i.id}
                    onClick={(e) => {
                      toggleTodo(i.id);
                    }}
                    style={{textDecoration: i.complete ? 'line-through' : 'none'}}
                  >
                    {i.value}
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={() => {
                        deleteTodo(i.id);
                      }}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </li>
                )
              }
            });
            return showNum > 0 ? showList : (selectFilter + '列表为空');
          } else {
            return (selectFilter + '列表为空');
          }
        }()
      }
    </ul>
  );
};



TodoList.propTypes = {
  selectFilter: PropTypes.oneOf(Object.values(VisibilityFilters)),
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  todoList: PropTypes.object.isRequired,
};

export default TodoList;