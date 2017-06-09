/**
 * Created by zhongpingping on 2017/6/2.
 */


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OnlinePlans from '../../../components/Plans/Online';
import {
  onlinePlansInputChange,
  onlinePlansSearchMenuClick,
  onlinePlansSearchRequest,
  onlinePlansSearchMenuToggle,
  datePickerFocusChange,
  datePickerChange,
  onlinePlansStatusChange
} from '../../../reducers/planOnlineReducer';

class CPlans extends Component {

  componentDidMount () {
    let original = this.props.state.get('original').toJS() || {};
    let data = original.data || {};
    if(!data || !data.list || !data.list.length){
      this.props.onRefresh();
    }
  }

  render () {
    return <OnlinePlans {...this.props}/>;
  }

}

export default connect(
  (state) => ({
    state: state.get('onlinePlans')
  }),

  (dispatch) => bindActionCreators({
    onSearch: onlinePlansSearchRequest,
    onRefresh: onlinePlansSearchRequest,
    onPage: onlinePlansSearchRequest,
    onChange: onlinePlansInputChange,
    onMenuClick: onlinePlansSearchMenuClick,
    onMenuToggleClick: onlinePlansSearchMenuToggle,
    onFocusChange: datePickerFocusChange,
    onDatesChange: datePickerChange,
    onStatusChange: onlinePlansStatusChange
  }, dispatch)
)(CPlans);
