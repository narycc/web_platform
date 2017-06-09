/**
 * Created by wenbinzhang on 2017/5/26.
 */
import React from 'react';

import Card from '../../lib/Card';

const UserBase = ({state}) => {

  return (
    <Card className="mb-3">
      <div className="row">
        <div className="col-md-2 col-sm-12 tag-box">
          <span className="tag">{state.name || '-'}</span>
        </div>
        <div className="col-md-10 col-sm-12">
          <div className="row">
            <div className="col-md-2 col-sm-6">
              <h5 className="detail-info-title">用户ID</h5>
              <p className="detail-info-desc">{state.investor_id || '-'}</p>
            </div>
            <div className="col-md-2 col-sm-6">
              <h5 className="detail-info-title">手机号码</h5>
              <p className="detail-info-desc">{state.mobile || '-'}</p>
            </div>
            <div className="col-md-2 col-sm-6">
              <h5 className="detail-info-title">身份证</h5>
              <p className="detail-info-desc">{state.id_no || '-'}</p>
            </div>
            <div className="col-md-2 col-sm-6">
              <h5 className="detail-info-title">银行卡</h5>
              <p className="detail-info-desc">{state.bank_card_no || '-'}</p>
            </div>
            <div className="col-md-2 col-sm-6">
              <h5 className="detail-info-title">年龄</h5>
              <p className="detail-info-desc">{state.age || '-'}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-sm-6">
              <h5 className="detail-info-title">性别</h5>
              <p className="detail-info-desc">{state.gender || '-'}</p>
            </div>
            <div className="col-md-2 col-sm-6">
              <h5 className="detail-info-title">账户状态</h5>
              <p className="detail-info-desc">{state.account_status === 2 ? '冻结' : '正常'}</p>
            </div>
            <div className="col-md-2 col-sm-6">
              <h5 className="detail-info-title">最后登录时间</h5>
              <p className="detail-info-desc">{state.last_login_time || '-'}</p>
            </div>
            <div className="col-md-2 col-sm-6">
              <h5 className="detail-info-title">最后投资时间</h5>
              <p className="detail-info-desc">{state.last_invest_time || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
};

export default UserBase;