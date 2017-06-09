/**
 * Created by wenbinzhang on 2017/5/26.
 */
import React from 'react';

import BTable from '../../lib/BTable';
import Pagination from '../../lib/Pagination';


const UserLog = ({state}) => {
  let table = state.table || {};
  let original = state.original || {};
  let data = original.data || {};
  console.log(state.original);
  if (state.original) {
    table['rows'] = (data.list && data.list.map(item => {
      return [
        item.time || '-',
        item.issues || '-',
        item.state_before_change || '-',
        item.state_after_change || '-',
        item.operator_name || '-'
      ]
    }))
  }else{
    Object.assign(table, {
      empty: {
        title: '无数据',
        message: '操作日志列表数据为空'
      }
    });
  }
  return (
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
  );
};

export default UserLog;