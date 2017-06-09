/**
 * Created by wenbinzhang on 2017/5/26.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
  userDetailUpdateInvestorId,
  userDetailTabClick,
  userDetailBaseRequest,
  userDetailSummaryRequest,
  userDetailInvestmentRequest,
  userDetailCapitalRequest,
  userDetailCapitalCheckClick,
  userDetailLogRequest,
  userDetailInvestmentCheckClick,
  userDetailInvestmentInputChange,
  userDetailCapitalDateChange,
  userDetailCapitalDateFocusChange,
  userDetailLogRemark
} from '../../../reducers/userDetailReducer';
import UserDetail from '../../../components/App/UserDetail';

class CUserDetail extends Component {

  componentDidMount() {

    let state = this.props.state.toJS() || {};
    this.props.updateInvestorId(this.props.params.investor_id);
    this.props.getBase();
    this.getTabData(state.tabInfo.selectedIndex);
  }

  getTabData(selectedIndex) {
    switch (parseInt(selectedIndex, 10)) {
      case 0:
        this.props.getSummary();
        break;
      case 1:
        this.props.getInvestment();
        break;
      case 2:
        this.props.getCapital();
        break;
      case 3:
        this.props.getLog();
        break;
      default:

    }
  }

  componentDidUpdate(prevProps) {
    let state = this.props.state.toJS() || {};
    let prevState = prevProps.state.toJS() || {};

    if (state.tabInfo.selectedIndex !== prevState.tabInfo.selectedIndex) {
      this.getTabData(state.tabInfo.selectedIndex);
    }
  }

  render() {
    return <UserDetail {...this.props}/>
  }

}

export default connect(
  (state) => ({
    state: state.get('userDetail')
  }),

  (dispatch) => bindActionCreators({
    updateInvestorId: userDetailUpdateInvestorId,
    onNavClick: userDetailTabClick,
    getBase: userDetailBaseRequest,
    getSummary: userDetailSummaryRequest,
    getInvestment: userDetailInvestmentRequest,
    getCapital: userDetailCapitalRequest,
    getLog: userDetailLogRequest,
    onInvestmentCheckClick: userDetailInvestmentCheckClick,
    onInvestmentInputChange: userDetailInvestmentInputChange,
    onCapitalCheckClick: userDetailCapitalCheckClick,
    onCapitalDateChange: userDetailCapitalDateChange,
    onCapitalDateFocusChange: userDetailCapitalDateFocusChange,
    onLogRemark: userDetailLogRemark
  }, dispatch)
)(CUserDetail);

