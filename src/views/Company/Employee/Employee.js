/**
 * Created by zpp on 2017/06/28.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Employee from '../../../components/Employee';
import {
  employeeInputChange,
  employeeSearchMenuClick,
  employeeSearchRequest,
  employeeSearchMenuToggle,
  employeeAddRequest,
  employeeDeleteRequest,
} from '../../../reducers/employeeReducer';

class CEmployee extends Component {

  componentDidMount () {
    let original = this.props.state.get('original').toJS() || {};
    let data = original.data || {};
    if(!data || !data.list || !data.list.length){
      this.props.onRefresh();
    }
  }

  render () {
    return <Employee {...this.props}/>;
  }

}

export default connect(
  (state) => ({
    state: state.get('employee')
  }),

  (dispatch) => bindActionCreators({
    onStart: employeeSearchRequest,
    onSearch: employeeSearchRequest,
    onChange: employeeInputChange,
    onMenuClick: employeeSearchMenuClick,
    onMenuToggleClick: employeeSearchMenuToggle,
    onRefresh: employeeSearchRequest,
    onPage: employeeSearchRequest,
    onAddUser: employeeAddRequest,
    onDeleteUser: employeeDeleteRequest,
  }, dispatch)
)(CEmployee);