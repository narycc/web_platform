/**
 * Created by zhongpingping on 2017/6/2.
 */

import React from 'react';
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

function getFundStatusString(status){
  let str = '未知';
  // 交易类型(1=充值|2=提现|3=投资|4=到期赎回|5=提前赎回|6=奖励|7=退款)
  switch (status){
    case 1:
      str = '充值';
      break;
    case 2:
      str = '提现';
      break;
    case 3:
      str = '投资';
      break;
    case 4:
      str = '到期赎回';
      break;
    case 5:
      str = '提前赎回';
      break;
    case 6:
      str = '奖励';
      break;
    case 7:
      str = '退款';
      break;
    default:
      str = '未知';
      break;
  }
  return str;
}

function getStatusString(status){
  let str = '未知';
  // (0=交易中，1=交易成功，2=交易失败)
  switch (status){
    case 0:
      str = '交易中';
      break;
    case 1:
      str = '交易成功';
      break;
    case 2:
      str = '交易失败';
      break;
    default:
      str = '未知';
      break;
  }
  return str;
}

const Funds = ({
                 state, onSearch, onChange, onMenuClick, onMenuToggleClick, onRefresh, onPage,
                 onFundStatusChange, onMinAmountChange,onMaxAmountChange,onFocusChange, onDatesChange
               }) => {

  let initData = state.get('listData').toJS() || {};
  let original = state.get('original').toJS() || {};

  let statusFormCheckData = state.get('statusFormCheckData').toJS();

  let datePicker = state.get('datePicker').toJS();

  let min_amount = state.get('min_amount') || '';
  let max_amount = state.get('max_amount') || '';

  let data = original.data || {};


  initData['rows'] = (data.list && data.list.map(item => {

      let investor_detail_url = "/app/user_detail/" + item['investor_id'];
      return [
        item['order_no'],
        <Link
          className="btn btn-link btn-sm"
          to={investor_detail_url}
        > {item['investor_name']} </Link>
        ,
        item['mobile'],
        item['invest_create_time'],
        getFundStatusString(item['fund_status']),
        FormatMoneyByM(item['amount']),
        FormatMoneyByM(item['amount_before_deal']),
        FormatMoneyByM(item['amount_after_deal']),
        getStatusString(item['status'])
      ]
    })) || [];

  if (initData.rows && initData.rows.length === 0 && original && original.param) {
    initData.empty.message = '平台资金流水列表为空，参数：' + JSON.stringify(original.param);
  }

  let tableTips = '';
  if (data && data.total >= 0) {
    tableTips = '总计 ' + data.total + ' 条数据，共 ' + data.totalPage + ' 页';
  }

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

export  default Funds;