/**
 * Created by zhongpingping on 2017/5/31.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InvestmentsDetail from '../../../components/Investments/Detail';
import {
  investmentsDetailNavChange,
  investmentsDetailSearchRequest
} from '../../../reducers/investmentsDetailReducer';

class CDetail extends Component {

  componentDidMount () {
    let original = this.props.state.get('original').toJS() || {};
    let data = original.data || {};
    if(!data || !data.length){
      this.props.onStart({order_no : this.props.params.order_no});
    }
  }

  render () {
    return <InvestmentsDetail {...this.props}/>;
  }

}

export default connect(
  (state) => ({
    state: state.get('investmentsDetail')
  }),

  (dispatch) => bindActionCreators({
    onStart: investmentsDetailSearchRequest,
    onNavChange: investmentsDetailNavChange
  }, dispatch)
)(CDetail);
