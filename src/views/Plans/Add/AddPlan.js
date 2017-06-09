/**
 * Created by zhongpingping on 2017/6/2.
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddPlan from '../../../components/Plans/Add';
import {
  addPlansAmountChange,
  addPlansProductChange,
  addPlansStartTimeChange,
  addPlansEndTimeChange,
  describeProduct,
  createPlan
} from '../../../reducers/planAddReducer';

class CAddPlans extends Component {

  componentDidMount() {

  }

  render() {
    return <AddPlan {...this.props}/>;
  }

}

export default connect(
  (state) => ({
    state: state.get('addPlan')
  }),

  (dispatch) => bindActionCreators({
    onProductChange: addPlansProductChange,
    onAmountChange: addPlansAmountChange,
    onStartTimeChange: addPlansStartTimeChange,
    onEndTimeChange: addPlansEndTimeChange,
    onDescribeProduct: describeProduct,
    onSave : createPlan
  }, dispatch)
)(CAddPlans);
