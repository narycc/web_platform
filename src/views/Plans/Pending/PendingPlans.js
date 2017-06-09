/**
 * Created by zhongpingping on 2017/6/2.
 */


import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PendingPlans from '../../../components/Plans/Pending';
import {
  pendingPlansInputChange,
  pendingPlansSearchMenuClick,
  pendingPlansSearchRequest,
  pendingPlansSearchMenuToggle,
  datePickerFocusChange,
  datePickerChange,
  pendingPlansStatusChange,
  pendingPlansDeleteRequest
} from '../../../reducers/planPendingReducer';

class CPendingPlans extends Component {

  componentDidMount () {
    let original = this.props.state.get('original').toJS() || {};
    let data = original.data || {};
    if(!data || !data.list || !data.list.length){
      this.props.onRefresh();
    }
  }

  render () {
    return <PendingPlans {...this.props}/>;
  }

}

export default connect(
  (state) => ({
    state: state.get('pendingPlans')
  }),

  (dispatch) => bindActionCreators({
    onSearch: pendingPlansSearchRequest,
    onRefresh: pendingPlansSearchRequest,
    onPage: pendingPlansSearchRequest,
    onChange: pendingPlansInputChange,
    onMenuClick: pendingPlansSearchMenuClick,
    onMenuToggleClick: pendingPlansSearchMenuToggle,
    onFocusChange: datePickerFocusChange,
    onDatesChange: datePickerChange,
    onStatusChange : pendingPlansStatusChange,
    onDelete: pendingPlansDeleteRequest
  }, dispatch)
)(CPendingPlans);
