/**
 * Created by zhongpingping on 2017/6/2.
 */


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Funds from '../../../components/Investments/Funds';
import {
  fundsInputChange,
  fundsSearchMenuClick,
  fundsSearchRequest,
  fundsSearchMenuToggle,
  fundsStatusChange,
  fundsMinAmountChange,
  fundsMaxAmountChange,
  datePickerFocusChange,
  datePickerChange
} from '../../../reducers/fundsReducer';

class CFunds extends Component {

  componentDidMount () {
    let original = this.props.state.get('original').toJS() || {};
    let data = original.data || {};
    if(!data || !data.list || !data.list.length){
      this.props.onRefresh();
    }
  }

  render () {
    return <Funds {...this.props}/>;
  }

}

export default connect(
  (state) => ({
    state: state.get('funds')
  }),

  (dispatch) => bindActionCreators({
    onSearch: fundsSearchRequest,
    onRefresh: fundsSearchRequest,
    onPage: fundsSearchRequest,
    onChange: fundsInputChange,
    onFundStatusChange: fundsStatusChange,
    onMinAmountChange : fundsMinAmountChange,
    onMaxAmountChange : fundsMaxAmountChange,
    onMenuClick: fundsSearchMenuClick,
    onMenuToggleClick: fundsSearchMenuToggle,
    onFocusChange: datePickerFocusChange,
    onDatesChange: datePickerChange
  }, dispatch)
)(CFunds);
