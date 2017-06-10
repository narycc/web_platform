/**
 * Created by zpp on 2017/06/10.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  youActionTypes
} from '../../reducers/reducer_tpl';

import Tpl from '../../components/Tpl';

class CTpl extends Component {

  render () {
    return <Tpl />
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => bindActionCreators({
    onClick: youActionTypes
  })
)(CTpl);