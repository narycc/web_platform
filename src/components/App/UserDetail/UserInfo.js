/**
 * Created by wenbinzhang on 2017/5/25.
 */

import React from 'react';

import BTable from '../../lib/BTable';
import {FormatMoneyByM} from '../../../Lib/Helper';

const tableHead = {
  accounts: ['推荐人', '推荐类型', '归属架构'],
  property: ['总资产', '投资笔数', '累计投资金额', '累计收益', '在投资金', '冻结资金'],
};

const UserInfo = ({state}) => {

  let data = (state.original && state.original.data) || {};
  let accounts = [];
  let property = [];

  data.accounts && data.accounts.forEach(item => {
    accounts.push([
      item.recommender_name,
      item.recommend_type === 1 ? '线上渠道' : '员工推荐',
      item.belong_to,
    ]);
  });

  data.property && data.property.forEach(item => {
    property.push([
      FormatMoneyByM(item.property_total),
      item.invest_nums,
      FormatMoneyByM(item.invest_ammout_total),
      FormatMoneyByM(item.invest_profit_total),
      FormatMoneyByM(item.invest_current_total),
      FormatMoneyByM(item.invest_frozen_total)
    ]);
  });

  return (
    <div className="row">
      <div className="col-12">
        <h5>账号信息</h5>
        <BTable
          head={tableHead.accounts}
          rows={accounts}
        />
        <h5>资产信息</h5>
        <BTable
          head={tableHead.property}
          rows={property}
        />
      </div>
    </div>
  )
};

export default UserInfo;