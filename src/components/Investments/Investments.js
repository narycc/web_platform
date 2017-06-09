/**
 * Created by zhongpingping on 2017/5/27.
 * 子组件是一个纯函数, 一定要引入react
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
import TypeDatePicker from '../lib/TypeDatePicker';
import {FormatMoneyByM, FormatRate} from '../../Lib/Helper';


function getDays(firstDate, secondDate) {
  return parseInt(( (new Date(firstDate)).getTime() - (new Date(secondDate)).getTime() ) / (1000 * 24 * 3600), 10);
};

function getStatusString(status){
  let str = '未知';
//投资状态(0=预约中|1=预约成功|2=预约失败|3=投资成功|4=投资失败|5=申请赎回|6=申请赎回审核成功|7=申请赎回审核失败|8=已赎回|9=逾期|10=已回款)
  switch (status){
    case 0 :
      str = '预约中';
      break;
    case 1:
      str = '预约成功';
      break;
    case 2:
      str = '预约失败';
      break;
    case 3:
      str = '投资成功';
      break;
    case 4:
      str = '投资失败';
      break;
    case 5:
      str = '申请赎回';
      break;
    case 6:
      str = '申请赎回审核成功';
      break;
    case 7:
      str = '申请赎回审核失败';
      break;
    case 8:
      str = '已赎回';
      break;
    case 9:
      str = '逾期';
      break;
    case 10:
      str = '已回款';
      break;
    default:
      str = '未知';
      break;
  }
  return str;
}
const Investments = ({
                       state, onSearch, onChange, onMenuClick, onMenuToggleClick, onRefresh, onPage,
                       onProductChange, onStatusChange,onMinAmountChange,onMaxAmountChange, onFocusChange, onDatesChange, onDateTypeMenuClick, onDateTypeMenuToggle
                     }) => {

  let initData = state.get('listData').toJS() || {};
  let original = state.get('original').toJS() || {};

  let productFormCheckData = state.get('productFormCheckData').toJS();
  let statusFormCheckData = state.get('statusFormCheckData').toJS();
  let typeDatePickerData = state.get('typeDatePickerData').toJS();

  let min_amount = state.get('min_amount') || '';
  let max_amount = state.get('max_amount') || '';

  let data = original.data || {};


  initData['rows'] = (data.list && data.list.map(item => {

      let investor_detail_url = "/app/user_detail/" + item['investor_id'];
      let detail_url = "/investments/detail/" + item['order_no'];
      return [
        item['order_no'],
        <Link
          className="btn btn-link btn-sm"
          to={investor_detail_url}
        > {item['investor_name']} </Link>
        ,
        item['mobile'],
        item['product_title'],
        getDays(item['expired_time'], item['subscribe_time']),
        FormatRate(item['annual_profit_rate']),
        item['subscribe_time'],
        item['expired_time'],
        FormatMoneyByM( item['principal_amount'] ) ,
        FormatMoneyByM(item['current_principal_amount']),
        getStatusString(item['trade_status']),
        <Link
          className="btn btn-link btn-sm"
          to={detail_url}
        >查看</Link>
      ]
    })) || [];

  if (initData.rows && initData.rows.length === 0 && original && original.param) {
    initData.empty.message = '投资交易列表为空，参数：' + JSON.stringify(original.param);
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
            text: <span className="font-green-sharp bold"><i className="fa fa-users"/> 平台投资交易</span>
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
                  state={productFormCheckData}
                  onCheckClick={onProductChange}
                />
              </div>

              {/*<!-- 过滤条件 3 -->*/}
              <div className="col-sm-12 col-md-7">
                <FormCheck
                  state={statusFormCheckData}
                  onCheckClick={onStatusChange}
                />
              </div>

              {/*<!-- 过滤条件 4 -->*/}
              <div className="col-sm-12 col-md-7 form-group">
                <div className="form-group row m-0" style={{paddingTop:"10px"}}>
                  <label className="col-sm-12 col-md-2 col-form-label bold">交易金额:</label>
                  <div className="col-sm-12 col-md-10">

                    <div className="input-group">
                      <input
                        type="text"
                        className="col-md-4"
                        value={min_amount}
                        onChange={e => {
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

              {/*<!-- 过滤条件 5 -->*/}

              <div className="col-sm-12 col-md-7">
                <TypeDatePicker
                  initData={typeDatePickerData}
                  onFocusChange={onFocusChange}
                  onDatesChange={onDatesChange}
                  onMenuClick={onDateTypeMenuClick}
                  onMenuToggleClick={onDateTypeMenuToggle}
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

export  default Investments;