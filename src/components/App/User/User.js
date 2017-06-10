/**
 * Created by zpp on 2017/06/10.
 */
import React from 'react';
import { TimeStrGetDate } from '../../../Lib/Helper';
import { Link } from 'react-router';

import TypeSearch from '../../lib/TypeSearch';
import TableTips from '../../lib/TableTips';
import BTable from '../../lib/BTable';
import Pagination from '../../lib/Pagination';
import Loading from '../../lib/Loading';
import Card from '../../lib/Card';
import { DateRangePicker } from 'react-dates';

const User = ({state, onSearch, onChange, onMenuClick, onMenuToggleClick, onRefresh, onPage, onFocusChange, onDatesChange}) => {

  let original = state.get('original').toJS() || {};
  let initData = state.get('listData').toJS() || {};
  let datePicker = state.get('datePicker').toJS() || {};
  let data = original.data || {};

  initData['rows'] = (data.list && data.list.map(item => {

      let recommender_name_str = '-';

      if (item.recommender_name) {
        recommender_name_str = item.recommender_name;
      }

      let detailPath = '/app/user_detail/' + item.investor_id;
      let status_str = '';

      switch (parseInt(item.status, 10)) {
        case 1:
        case 4:
          status_str = '已注册';
          break;
        case 3:
          status_str = '已开户';
          break;
        case 5:
          status_str = '已投资';
          break;
        default:
          status_str = '未知[' + item.status + ']';
      }

      return [
        item.name,
        item.mobile,
        item.id_no,
        item.register_time,
        recommender_name_str,
        item.recommend_type === 1 ? '线上渠道' : '员工推荐',
        status_str,
        <Link to={detailPath}>详情</Link>
      ]
    })) || [];

  if (initData.rows && initData.rows.length === 0 && original && original.param) {
    initData.empty.message = '投资人列表为空，参数：' + JSON.stringify(original.param);
  }

  let tableTips = '';
  if (data && data.total >= 0) {
    tableTips = '一计 ' + data.total + ' 条数据，共 ' + data.totalPage + ' 页';
  }

  return (
    <div className="row" style={{minHeight: '100%'}}>
      <div className="col-12" style={{position: 'relative'}}>

        <Loading show={state.get('isLoading')}/>

        <Card
          header={{
            text: <span className="font-green-sharp bold"><i className="fa fa-user"/> 投资人管理</span>
          }}
          className="animated fadeIn light"
        >

          <Card className="mb-3">
            <div className="row">
              <div className="col-sm-12 col-md-7">
                <TypeSearch
                  initData={state.toJS()}
                  onSearch={({searchValue: search_value, searchType: search_type}) => {

                    let param = {};
                    if (search_value) {
                      param = {
                        search_value,
                        search_type,
                      };
                    }

                    if (datePicker && datePicker.startDate) {
                      param.register_from = TimeStrGetDate(datePicker.startDate.toJSON());
                    }

                    if (datePicker && datePicker.endDate) {
                      param.register_to = TimeStrGetDate(datePicker.endDate.toJSON());
                    }
                    onSearch(param);
                  }}
                  onChange={onChange}
                  onMenuClick={onMenuClick}
                  onMenuToggleClick={onMenuToggleClick}
                />
              </div>
              <div className="col-sm-12 col-md-7">
                <div className="form-group row m-0" style={{paddingTop: '10px'}}>
                  <label className="col-sm-12 col-md-3 col-form-label bold">注册时间: </label>
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

export default User;