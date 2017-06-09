/**
 * Created by zhongpingping on 2017/6/9.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EditPlan from '../../../components/Plans/Edit';
import {
  editPlansAmountChange,
  editPlansProductChange,
  editPlansStartTimeChange,
  editPlansEndTimeChange,
  describeProduct,
  updatePlan,
  getProductInfo
} from '../../../reducers/planEditReducer';

class CAddPlans extends Component {

  componentDidMount() {
  //获取product对应的信息，写入到state 中去；
    this.props.onStart({product_id : this.props.params.product_id});
  }

  render() {
    return <EditPlan {...this.props}/>;
  }

}

export default connect(
  (state) => ({
    state: state.get('editPlan')
  }),

  (dispatch) => bindActionCreators({
    onProductChange: editPlansProductChange,
    onAmountChange: editPlansAmountChange,
    onStartTimeChange: editPlansStartTimeChange,
    onEndTimeChange: editPlansEndTimeChange,
    onDescribeProduct: describeProduct,
    onSave : updatePlan,
    onStart : getProductInfo
  }, dispatch)
)(CAddPlans);
