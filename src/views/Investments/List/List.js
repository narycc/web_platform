/**
 * Created by zpp on 2017/5/27.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Investments from '../../../components/Investments';
import {
  investmentsInputChange,
  investmentsSearchMenuClick,
  investmentsSearchRequest,
  investmentsSearchMenuToggle,
  investmentsProductTypeChange,
  investmentsTradeStatusChange,
  investmentsMinAmountChange,
  investmentsMaxAmountChange,
  datePickerFocusChange,
  datePickerChange,
  datePickerTypeMenuClick,
  datePickerTypeMenuToggle
} from '../../../reducers/investmentsReducer';

class CList extends Component {

  componentDidMount () {
    let original = this.props.state.get('original').toJS() || {};
    let data = original.data || {};
    if(!data || !data.list || !data.list.length){
      this.props.onRefresh();
    }
  }

  render () {
    return <Investments {...this.props}/>;
  }

}

export default connect(
  (state) => ({
    state: state.get('investments')
  }),

  (dispatch) => bindActionCreators({
    onSearch: investmentsSearchRequest,
    onChange: investmentsInputChange,
    onProductChange : investmentsProductTypeChange,
    onStatusChange : investmentsTradeStatusChange,
    onMenuClick: investmentsSearchMenuClick,
    onMenuToggleClick: investmentsSearchMenuToggle,
    onRefresh: investmentsSearchRequest,
    onPage: investmentsSearchRequest,
    onFocusChange: datePickerFocusChange,
    onDatesChange: datePickerChange,
    onDateTypeMenuClick : datePickerTypeMenuClick,
    onDateTypeMenuToggle : datePickerTypeMenuToggle,
    onMinAmountChange: investmentsMinAmountChange,
    onMaxAmountChange: investmentsMaxAmountChange
  }, dispatch)
)(CList);
