/**
 * Created by wenbinzhang on 2017/5/25.
 */
import React from 'react';

import Loading from '../../lib/Loading';
import Card from '../../lib/Card';
import NavTab from '../../lib/NavTab';
import UserInfo from './UserInfo';
import UserInvestmentInfo from './UserInvestmentInfo';
import UserCapitalFlow from './UserCapitalFlow';
import UserLog from './UserLog';
import UserBase from './UserBase';

const UserDetail = ({state, onNavClick, onInvestmentCheckClick, onInvestmentInputChange, getInvestment,getCapital,onCapitalCheckClick,onCapitalDateChange,onCapitalDateFocusChange,onLogRemark}) => {

  let tabInfo = state.get('tabInfo').toJS();

  let tabContent;

  if (tabInfo.selectedIndex === 0) {
    tabContent = <UserInfo state={state.get('summaryInfo').toJS()}/>;
  } else if (tabInfo.selectedIndex === 1) {
    tabContent = <UserInvestmentInfo
      state={state.get('investment').toJS()}
      onInvestmentCheckClick={onInvestmentCheckClick}
      onInvestmentInputChange={onInvestmentInputChange}
      onInvestmentSearch={getInvestment}
    />;
  } else if (tabInfo.selectedIndex === 2) {
    tabContent = <UserCapitalFlow
      state={state.get('capital').toJS()}
      onCapitalFlowSearch={getCapital}
      onCapitalCheckClick={onCapitalCheckClick}
      onDatesChange={onCapitalDateChange}
      onFocusChange={onCapitalDateFocusChange}
      onLogRemark={onLogRemark}
      />;
  } else if (tabInfo.selectedIndex === 3) {
    tabContent = <UserLog
      state={state.get('log').toJS()}
      />;
  }

  return (
    <div className="row" style={{minHeight: '100%'}}>
      <div className="col-12" style={{position: 'relative'}}>
        <Loading show={false}/>
        <Card
          header={{
            text: <span className="font-green-sharp bold">用户信息--投资人详情</span>
          }}
          className="animated fadeIn light"
        >
          <UserBase state={state.get('base').toJS()}/>

          <NavTab
            data={tabInfo}
            onNavClick={onNavClick}
          >
            {tabContent}
          </NavTab>
        </Card>
      </div>
    </div>
  );
};

export default UserDetail;