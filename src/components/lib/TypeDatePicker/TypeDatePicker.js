/**
 * Created by zhongpingping on 2017/6/1.
 */

import React from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';

const config = {
  initData: {
    menuList: [],
    selectMenuIndex: 0,
    isMenuOpen: false,
    placeholder: '',

    inputValue: '',
    // 时间选择器
    datePicker: {
      focusedInput: null,
      startDate: moment(),
      endDate: moment(),
    }
  }
};

const doNothing = () => {
};

const TypeDatePicker = ({initData, onFocusChange = doNothing, onDatesChange = doNothing, onMenuClick = doNothing, onMenuToggleClick}) => {

  let data = Object.assign({}, config.initData, initData);
  let menuList = data.menuList;

  if (!menuList || menuList.length === 0) {
    return (<div>TypeDatePicker init data error: {JSON.stringify(data)}</div>);
  }

  let selectMenuIndex = data.selectMenuIndex;
  let selectMenu = menuList[selectMenuIndex];
  if (!selectMenu) {
    selectMenu = menuList[0];
  }

  let inputMenuClass = data.isMenuOpen ? 'col-md-2 input-group-btn show' : ' col-md-2 input-group-btn';

  let menuBtnClass = 'btn btn-secondary';
  if(menuList.length > 1){
    menuBtnClass += ' dropdown-toggle';
  }

  return (
    <div className="input-group">
      <div className={inputMenuClass}>
        <button
          type="button"
          className={menuBtnClass}
          onClick={onMenuToggleClick}
        >
          {selectMenu.name}
        </button>
        <div className="dropdown-menu">
          {
            function () {
              return menuList.map(item => {
                return (
                  <a
                    className="dropdown-item"
                    href="#"
                    key={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      onMenuClick(item);
                    }}
                  >
                    {item.name}
                  </a>
                )
              });
            }()
          }
        </div>
      </div>

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
          startDate={data.datePicker.startDate}
          endDate={data.datePicker.endDate}
          focusedInput={data.datePicker.focusedInput}
          onFocusChange={onFocusChange}
          onDatesChange={onDatesChange}
        />
      </div>


    </div>
  )
};

export default TypeDatePicker;