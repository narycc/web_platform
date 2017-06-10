/**
 * Created by zpp on 2017/06/10.
 */
import React from 'react';

const AddTodoInput = ({inputValue, addTodo, onInput}) => {
  return (
    <div className="input-group" style={{marginBottom: '15px'}}>
      <input
        className="form-control"
        type="text"
        placeholder="input your todo"
        value={inputValue}
        onKeyUp={e => {
          if (e.keyCode === 13 && e.target.value.trim()) {
            addTodo({
              value: inputValue,
              id: (+new Date()),
              complete: false
            });
            onInput('');
          }
        }}
        onInput={e => {
          onInput(e.target.value);
        }}
      />
      <button
        className="btn btn-success"
        onClick={() => {
          if (inputValue.trim()) {
            addTodo({
              value: inputValue,
              id: (+new Date()),
              complete: false
            })
          }
        }}
      ><i className="fa fa-plus"/>添加
      </button>
    </div>
  )
};

export default AddTodoInput;

