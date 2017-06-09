/**
 * Created by wenbinzhang on 2017/5/26.
 */
import React from 'react';

import BTable from '../../lib/BTable';
import Pagination from '../../lib/Pagination';
import Card from '../../lib/Card';
import FormCheck from '../../lib/FormCheck';
import { DateRangePicker } from 'react-dates';
import {FormatMoneyByM} from '../../../Lib/Helper';

const UserCapitalFlow = ({state,onCapitalCheckClick,onDatesChange,onFocusChange,onCapitalFlowSearch,onLogRemark}) => {
  console.log(onLogRemark);
  let table = state.table || {};
  let original = state.original || {};
  let data = original.data || {};
  let datePicker = state.datePicker || {};
  if (state.original && state.original.param) {
    table['rows'] = (data.list && data.list.map(item =>{
      let fund_status_str = '',status_str = '';
      switch (parseInt(item.fund_status)){
        case 1:
          fund_status_str = '充值';
          break;
        case 2:
          fund_status_str = '提现';
          break;
        case 3: fund_status_str = '投资';
          break;
        case 4:
          fund_status_str = '到期赎回';
          break;
        case 5:
          fund_status_str = '提前赎回';
          break;
        case 6: fund_status_str = '奖励';
          break;
        case 7:
          fund_status_str = '退回';
          break;
        default:
          fund_status_str = '未知';
          break;
      }
      switch (parseInt(item.status)){
        case 0:
          status_str = '交易中';
          break;
        case 1:
          status_str = '交易成功';
          break;
        case 2:
          status_str = <button className="click-btn"  onClick={() =>{onLogRemark(item.remark)}}>交易失败</button>;
          break;
        default:
          status_str = '未知';
          break;
      }
      return [
        item.order_no,
        item.invest_create_time,
        fund_status_str,
        FormatMoneyByM(item.amount),
        FormatMoneyByM(item.amount_before_deal),
        FormatMoneyByM(item.amount_after_deal),
        status_str
      ]
    }))
  }else{
    Object.assign(table, {
      empty: {
        title: '无数据',
        message: '资金流水列表数据为空，param: ' + JSON.stringify(state.original.param)
      }
    });
  }
  return (
    <div className="row">
      <div className="col-12">
        <Card className="mb-3">
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <FormCheck
                state={state.formCheckData}
                onCheckClick={onCapitalCheckClick}
              />
            </div>
            <div className="col-sm-12 col-md-8 ">
              <div className="form-group row m-0" style={{paddingTop: '10px'}}>
                <label className="col-sm-12 col-md-2 col-form-label bold">发起时间: </label>
                <div className="col-sm-12 col-md-7">
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
                <div className="col-sm-12 col-md-2">
                  <button className="search-btn"
                    style={{marginTop:'5px'}}
                    onClick={() =>{
                      onCapitalFlowSearch();
                    }}>搜索</button>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <div className="row">
          <div className="col-12">
            <BTable
              {...state.table}
            />
            <Pagination
              {...state.pagination}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCapitalFlow;