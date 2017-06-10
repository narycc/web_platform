/**
 * Created by zpp on 2017/06/10.
 */
import React from 'react';
import AddTodoInput from './AddTodoInput';
import TodoFilter from './TodoFilter';
import TodoList from './TodoList';
import {Link} from 'react-router';
import TypeSearch from '../lib/TypeSearch';
import TableTips from '../lib/TableTips';
import BTable from '../lib/BTable';
import Pagination from '../lib/Pagination';
import Loading from '../lib/Loading';
import Card from '../lib/Card';
import FormCheck from '../lib/FormCheck';
import { DateRangePicker } from 'react-dates';
import {FormatMoneyByM} from '../../Lib/Helper';


const Todo = ({state, onFilterChange, addTodo, onInput, toggleTodo, deleteTodo}) => {

  let todos = state.get('todos');

  let todoList = todos.get('todos');
  let selectFilter = todos.get('visibilityFilter');
  let inputValue = todos.get('inputValue');

  let tableTips = '我是tabletips ,你可以在这这里展示一些关于表的说明';
  return (
    <div className="row" style={{minHeight: '100%'}}>
      <div className="col-12" style={{position: 'relative'}}>
        <Loading show={state.get('isLoading')}/>
        <Card
          header={{
            text: <span className="font-green-sharp bold"><i className="fa fa-users"/> 平台资金流水 </span>
          }}
          className="animated fadeIn light"
        >
          <Card cardClassName="mb-3">


            <div className="row">
              {/*<!-- 过滤条件 1 -->*/}
              <div className="col-sm-12 col-md-7">
                <TypeSearch
                  initData={state.toJS()}
                  onSearch={onSearch}
                  onChange={onChange}
                  onMenuClick={onMenuClick}
                  onMenuToggleClick={onMenuToggleClick}
                />
              </div>

              {/*<!-- 过滤条件 2 -->*/}
              <div className="col-sm-12 col-md-7">
                <FormCheck
                  state={statusFormCheckData}
                  onCheckClick={onFundStatusChange}
                />
              </div>


              {/*<!-- 过滤条件 3 -->*/}
              <div className="col-sm-12 col-md-7">
                <div className="form-group row m-0" style={{paddingTop:"10px"}}>
                  <label className="col-sm-12 col-md-2 col-form-label bold">交易金额:</label>
                  <div className="col-sm-12 col-md-10">
                    <div className="input-group">

                      <input
                        type="text"
                        className="col-md-4"
                        value={min_amount}
                        onChange={ e => {
                          onMinAmountChange(e.target.value)
                        }}
                      />
                      <span style={{padding: "7px 20px"}}> -- </span>
                      <input
                        type="text"
                        className="col-md-4"
                        value={max_amount}
                        onChange={ e => {
                          onMaxAmountChange(e.target.value)
                        }}
                      />

                    </div>

                  </div>
                </div>
              </div>

              {/*<!-- 过滤条件 4 -->*/}

              <div className="col-sm-12 col-md-7">
                <div className="form-group row m-0" style={{paddingTop: '10px'}}>
                  <label className="col-sm-12 col-md-2 col-form-label bold">发起时间: </label>
                  <div className="col-sm-12 col-md-9">
                    <DateRangePicker
                      numberOfMonths={1}
                      minimumNights={0}
                      showClearDates={true}
                      isOutsideRange={day => {
                        return ((+day.toDate()) > (+new Date()));
                      }}
                      readOnly={true}
                      reopenPickerOnClearDates={true}
                      startDatePlaceholderText="开始时间"
                      endDatePlaceholderText="截止时间"
                      displayFormat="YYYY-MM-DD"
                      startDate={datePicker.startDate}
                      endDate={datePicker.endDate}
                      focusedInput={datePicker.focusedInput}
                      onFocusChange={onFocusChange}
                      onDatesChange={onDatesChange}
                    />
                  </div>
                </div>
              </div>


            </div>


          </Card>

          <Card cardClassName="mb-3">
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
          </Card>

          <TableTips tips={tableTips}>

            <a
              href="#"
              className="btn btn-link btn-xs"
              style={{
                float: 'right',
              }}
              onClick={e => {
                e.preventDefault();
                if (original && original.param) {
                  onRefresh(original.param);
                }
              }}
            >
              <i className="fa fa-refresh"/>刷新列表
            </a>

          </TableTips>

          <BTable {...initData}/>

          <Pagination {...state.get('pagination').toJS()} onPage={onPage}/>

        </Card>
      </div>
    </div>
  );

};

export default Todo;