/**
 * Created by wenbinzhang on 2017/5/25.
 */
import React from 'react';
import {Link} from 'react-router';
import BTable from '../../lib/BTable';
import Pagination from '../../lib/Pagination';
import Card from '../../lib/Card';
import TypeSearch from '../../lib/TypeSearch';
import FormCheck from '../../lib/FormCheck';
import {FormatMoneyByM} from '../../../Lib/Helper';

const UserInvestmentInfo = ({state, onInvestmentCheckClick, onInvestmentInputChange, onInvestmentSearch}) => {
  let table = state.table || {};
  let original = state.original || {};
  let data = original.data || {};

  if (state.original && state.original.param) {
    table['rows'] = (data.list && data.list.map(item => {
        let product_type_str = '', trade_status_str = '';
        let freeze_day = '-';
        let detailPath = '/investments/detail/' + item.deal_no;
        if (item.redeem_date && item.subscribe_time) {
          freeze_day = (Date.parse(item.subscribe_time) - Date.parse(item.redeem_date)) / (1000 * 3600 * 24);
        }
        let annual_profit_rate_str = item.annual_profit_rate ? (item.annual_profit_rate * 100 + '%') : '-';

        switch (parseInt(item.product_type)) {
          case 1:
            product_type_str = '活期';
            break;
          case 2:
            product_type_str = '定期';
            break;
          case 3:
            product_type_str = '定期智月升';
            break;
          default:
            product_type_str = '未知';
            break;
        }

        switch (parseInt(item.trade_status)) {
          case 0:
            trade_status_str = '预约中';
            break;
          case 1:
            trade_status_str = '预约中';//预约成功
            break;
          case 2:
            trade_status_str = '预约失败';
            break;
          case 3:
            trade_status_str = '待回款';//投资成功
            break;
          case 4:
            trade_status_str = '投资失败';
            break;
          case 5:
            trade_status_str = '赎回中';//申请赎回
            break;
          case 6:
            trade_status_str = '赎回中';//申请赎回
            break;
          case 7:
            trade_status_str = '待回款';//申请赎回审核失败
            break;
          case 8:
            trade_status_str = '已赎回';
            break;
          case 9:
            trade_status_str = '逾期';
            break;
          case 10:
            trade_status_str = '已回款';
            break;
        }

        return [
          item.deal_no,
          product_type_str,
          freeze_day,
          annual_profit_rate_str,
          item.subscribe_time,
          item.expired_time,
          FormatMoneyByM(item.principal_amount),
          FormatMoneyByM(item.current_principal_amount),
          FormatMoneyByM(item.current_profit_amount),
          trade_status_str,
          <Link to={detailPath}>详情</Link>
        ]
      })) || [];
  } else {
    Object.assign(table, {
      empty: {
        title: '无数据',
        message: '用户投资列表数据为空，param: ' + JSON.stringify(state.original.param)
      }
    });
  }

  return (
    <div className="row">
      <div className="col-12">
        <Card className="mb-3">
          <div className="row">
            <div className="col-sm-12 col-md-7">
              <TypeSearch
                initData={state.menuData}
                onChange={onInvestmentInputChange}
                onSearch={()=> {
                  onInvestmentSearch();
                }}
              />
            </div>
            <div className="col-sm-12 col-md-7">
              <FormCheck
                state={state.formCheckData}
                onCheckClick={onInvestmentCheckClick}
              />
            </div>
          </div>
        </Card>
        <BTable
          {...state.table}
        />
        <Pagination
          {...state.pagination}
          onPage={onInvestmentSearch}
        />
      </div>
    </div>
  );
};

export default UserInvestmentInfo;