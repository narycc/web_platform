/**
 * Created by wenbinzhang on 2017/4/28.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TimeStrGetDate } from '../../../Lib/Helper';

import User from '../../../components/App/User';

import {
  userInputChange,
  userSearchRequest,
  userSearchMenuClick,
  userSearchMenuToggle,
  userDateFocusChange,
  userDateChange,
} from '../../../reducers/userReducer';

class CUser extends Component {

  componentDidMount () {
    let original = this.props.state.get('original').toJS() || {};
    let datePicker = this.props.state.get('datePicker').toJS() || {};
    let data = original.data;
    if(!data || !data.list || !data.list.length){
      let param = {};
      if (datePicker && datePicker.startDate) {
        param.register_from = TimeStrGetDate(datePicker.startDate.toJSON());
      }
      if (datePicker && datePicker.endDate) {
        param.register_to = TimeStrGetDate(datePicker.endDate.toJSON());
      }
      this.props.onSearch(param);
    }
  }

  render () {
    return <User {...this.props}/>
  }

}

export default connect(
  (state) => ({
    state: state.get('appUserData')
  }),

  (dispatch) => bindActionCreators({
    onSearch: userSearchRequest,
    onChange: userInputChange,
    onMenuClick: userSearchMenuClick,
    onMenuToggleClick: userSearchMenuToggle,
    onRefresh: userSearchRequest,
    onPage: userSearchRequest,
    onFocusChange: userDateFocusChange,
    onDatesChange: userDateChange,
  }, dispatch)

)(CUser);