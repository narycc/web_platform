/**
 * Created by wenbinzhang on 2017/5/15.
 */

import React from 'react';
import TypeSearch from '../lib/TypeSearch';
import TableTips from '../lib/TableTips';
import BTable from '../lib/BTable';
import Pagination from '../lib/Pagination';
import Loading from '../lib/Loading';
import Card from '../lib/Card';

const Employee = ({state, onSearch, onChange, onMenuClick, onMenuToggleClick, onRefresh, onPage, onAddUser, onDeleteUser}) => {

  let initData = state.get('listData').toJS() || {};
  let original = state.get('original').toJS() || {};
  let data = original.data || {};

  initData['rows'] = (data.list && data.list.map(item => {
      return [
        item['id'],
        item['name'],
        item['mobile'],
        parseInt(item['role'], 10) === 1 ? '管理员' : '普通员工',
        item['create_time'],
        item['update_time'],
        <button
          className="click-btn"
          onClick={e => {
            e.preventDefault();
            onDeleteUser(item);
          }}
        >删除</button>
      ]
    })) || [];

  if (initData.rows && initData.rows.length === 0 && original && original.param) {
    initData.empty.message = '员工列表为空，参数：' + JSON.stringify(original.param);
  }

  let tableTips = '';
  if (data && data.total >= 0) {
    tableTips = '一计 ' + data.total + ' 条数据，共 ' + data.totalPage + ' 页';
  }

  return (
    <div className="row" style={{minHeight: '100%'}}>
      <div className="col-12" style={{position: 'relative'}}>
        <Loading show={state.get('isLoading')} />
        <Card
          header={{
            text: <span className="font-green-sharp bold"><i className="fa fa-users"/> 员工管理</span>
          }}
          className="animated fadeIn light"
        >
          <Card cardClassName="mb-3">
            <div className="row">
              <div className="col-xm-12 col-sm-12 col-md-7">
                <TypeSearch
                  initData={state.toJS()}
                  onSearch={onSearch}
                  onChange={onChange}
                  onMenuClick={onMenuClick}
                  onMenuToggleClick={onMenuToggleClick}
                />
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
                onAddUser(e);
              }}
            >
              <i className="fa fa-plus"/>添加员工
            </a>

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

export default Employee;