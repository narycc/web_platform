/**
 * Created by zhongpingping on 2017/5/31.
 */
import React from 'react';
import BTable from '../lib/BTable';
import Loading from '../lib/Loading';
import Card from '../lib/Card';
import NavTab from '../lib/NavTab';
import {GetDaysDistance, FormatRate,FormatMoneyByM} from '../../Lib/Helper';

function getProductType(type){
  // product_type 产品类型(1=活期|2=定期|3=定期智月升)
  let str = '未知';
  switch (type){
    case 1:
      str = '活期';
      break;
    case 2:
      str = '定期';
      break;
    case 3:
      str = '定期智月升';
      break;
    default:
      str = '未知';
      break
  }
  return str;
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
};

const Detail = ({state, params, onStart, onNavChange}) => {

  let config = state.get('navConfig').toJS() || {};
  let currentIndex = config.selectedIndex || 0;

  let listData = state.get('listData').toJS() || {};
  let original = state.get('original').toJS() || {};
  let originData = original.data || {};

  let info = (originData.summary && originData.summary[0]) || {};
  let tabContent = '';


  if (currentIndex === 0) {
    /*tabContent = (function(){ return (<div>
     <BTable {...initData} />
     </div>)})();*/
    let initData = listData.financialClaims || {};
    let data = originData.financialClaims || [];
    initData['rows'] = (data && data.map(item => {

        return [
          item['borrower_name'],
          item['match_time'],
          FormatMoneyByM(item['match_amount'])
        ]
      })) || [];

    if (initData.rows && initData.rows.length === 0 && original && original.param) {
      initData.empty.message = '债权匹配列表为空，参数：' + JSON.stringify(original.param);
    }

    tabContent = <BTable {...initData} />;

  } else {
    let initHistoryData = listData.investmentHistory || {};
    let histories = originData.investmentHistory || [];

    initHistoryData['rows'] = (histories && histories.map(item => {

        return [
          item['time'],
          item['issue']
        ]
      })) || [];

    if (initHistoryData.rows && initHistoryData.rows.length === 0 && original && original.param) {
      initHistoryData.empty.message = '投资明细列表为空，参数：' + JSON.stringify(original.param);
    }

    tabContent = <BTable {...initHistoryData} />;
  }

  let _account_status = (info.account_status === 1 ) ? "锁定" : "正常";
  let _product_type = getProductType(info.product_type)
  return (
    <div className="row" style={{minHeight: '100%'}}>
      <div className="col-12" style={{position: 'relative'}}>
        <Loading show={state.get('isLoading')}/>
        <Card
          header={{
            text: <span className="font-green-sharp bold"><i className="fa fa-users"/> 平台投资详情 {params.order_no}</span>
          }}
          className="animated fadeIn light"
        >
          <Card cardClassName="mb-3">
            <div className="row">
              <div className="col-md-2">
                投资人信息
              </div>
              <div className="col col-md-10">
                <div className="row">
                  <dl className="col col-md-2">
                    <dt>姓名</dt>
                    <dd>{info.investor_name}</dd>
                  </dl>
                  <dl className="col col-md-2">
                    <dt>手机号</dt>
                    <dd>{info.mobile}</dd>
                  </dl>
                  <dl className="col col-md-2">
                    <dt>账户状态</dt>
                    <dd>{_account_status}</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">产品信息</div>
              <div className="col col-md-10">
                <div className="row">
                  <dl className="col col-md-2">
                    <dt>交易号</dt>
                    <dd>{info.order_no}</dd>
                  </dl>
                  <dl className="col col-md-2">
                    <dt>产品类型</dt>
                    <dd>{_product_type}</dd>
                  </dl>
                  <dl className="col col-md-2">
                    <dt>产品期数</dt>
                    <dd>{info.product_id}</dd>
                  </dl>
                  <dl className="col col-md-2">
                    <dt>封闭期</dt>
                    <dd>{GetDaysDistance(info.expired_time, info.subscribe_time)}</dd>
                  </dl>
                  <dl className="col col-md-2">
                    <dt>年化率</dt>
                    <dd>{FormatRate(info.annual_profit_rate)}</dd>
                  </dl>
                  <dl className="col col-md-2">
                    <dt>交易状态</dt>
                    <dd>{getStatusString(info.trade_status)}</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">投资与收益</div>
              <div className="col col-md-10">
                <div className="row">
                  <dl className="col col-md-2">
                    <dt>投资本金</dt>
                    <dd>{FormatMoneyByM(info.principal_amount)}</dd>
                  </dl>
                  <dl className="col col-md-2">
                    <dt>在投本金</dt>
                    <dd>{FormatMoneyByM(info.current_principal_amount)}</dd>
                  </dl>
                  <dl className="col col-md-2">
                    <dt>预计总收益</dt>
                    <dd>{FormatMoneyByM(info.profit_amount)}</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">投资时间</div>
              <div className="col col-md-10">
                <div className="row">
                  <dl className="col col-md-2">
                    <dt>预约时间</dt>
                    <dd>{info.subscribe_time}</dd>
                  </dl>
                  <dl className="col col-md-2">
                    <dt>起投时间</dt>
                    <dd>{info.invest_begin_time}</dd>
                  </dl>
                  <dl className="col col-md-2">
                    <dt>到期时间</dt>
                    <dd>{info.expired_time}</dd>
                  </dl>
                </div>
              </div>
            </div>

          </Card>

          <NavTab data={config} onNavClick={onNavChange}>

            <div className="tabxxx">
              {tabContent}
            </div>
          </NavTab>


        </Card>
      </div>
    </div>
  );
};

export default Detail;