/**
 * Created by zhongpingping on 2017/6/2.
 */


import React from 'react';
import TypeSearch from '../lib/TypeSearch';
import TableTips from '../lib/TableTips';
import BTable from '../lib/BTable';
import Pagination from '../lib/Pagination';
import Loading from '../lib/Loading';
import Card from '../lib/Card';
import {Link} from 'react-router';
import {DateRangePicker} from 'react-dates';
import {FormatRate} from '../../Lib/Helper'


function getRationRange(min_rate, max_rate) {
  let r1 = FormatRate(min_rate), r2 = FormatRate(max_rate);
  if (!min_rate) {
    r1 = 'N';
  }

  if (!max_rate) {
    r2 = 'N';
  }
  return (r1 + '-' + r2);
}

function getTimeRange(start_time, end_time) {
  let r1 = start_time, r2 = end_time;
  if (!start_time) {
    r1 = 'N';
  }
  if (!end_time) {
    r2 = 'N';
  }
  return (r1 + '-' + r2);
}
const PendingPlans = ({state, onSearch, onChange, onMenuClick, onMenuToggleClick, onRefresh, onPage, onFocusChange, onDatesChange, onDelete}) => {

  let initData = state.get('listData').toJS() || {};
  let original = state.get('original').toJS() || {};
  let datePicker = state.get('datePicker').toJS() || {};

  let data = original.data || {};

  initData['rows'] = (data.list && data.list.map(item => {

      let edit_url = "/plans/edit/"+item['id'];
      return [
        item['id'],
        item['product_title'],
        getRationRange(item['min_year_interest_rate'], item['max_year_interest_rate']),
        item['freeze_days'],
        getTimeRange(item['raise_from_time'], item['raise_to_time']),
        item['total_amt'],
        (<div>
          <Link activeClassName="btn btn-link btn-xs" to={edit_url}>修改</Link>
          |
          <button className="btn btn-link btn-xs" onClick={ e => {
            e.preventDefault();
            onDelete(item['id'])
          }}>
            删除
          </button>
        </div>)
      ]
    })) || [];

  if (initData.rows && initData.rows.length === 0 && original && original.param) {
    initData.empty.message = '待上线理财计划列表为空，参数：' + JSON.stringify(original.param);
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
            text: <span className="font-green-sharp bold"><i className="fa fa-users"/> 待上线理财计划 </span>
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
                <div className="form-group row m-0" style={{paddingTop: '10px'}}>
                  <label className="col-sm-12 col-md-3 col-form-label bold">发起时间: </label>
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

export  default PendingPlans;