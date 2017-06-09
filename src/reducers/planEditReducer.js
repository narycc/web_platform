/**
 * Created by zhongpingping on 2017/6/2.
 */

import { handleActions, createAction } from 'redux-actions';
import Immutable from 'immutable';


/**
 * action types
 */
export const EDIT_PLANS_AMOUNT_CHANGE = 'EDIT_PLANS_AMOUNT_CHANGE';
export const EDIT_PLANS_PRODUCT_CHANGE = 'EDIT_PLANS_PRODUCT_CHANGE';
export const EDIT_PLANS_START_TIME_CHANGE = 'EDIT_PLANS_START_TIME_CHANGE';
export const EDIT_PLANS_END_TIME_CHANGE = 'EDIT_PLANS_END_TIME_CHANGE';
export const PRODUCT_DETAIL_REQUEST = 'PRODUCT_DETAIL_REQUEST';
export const UPDATE_PLAN_REQUEST = 'UPDATE_PLAN_REQUEST';
export const EDIT_PLAN_INFO_REQUEST = 'EDIT_PLAN_INFO_REQUEST';
export const EDIT_PLAN_INFO_REQUEST_SUCCESS = 'EDIT_PLAN_INFO_REQUEST_SUCCESS';
export const EDIT_PLAN_INFO_REQUEST_ERROR = 'EDIT_PLAN_INFO_REQUEST_ERROR';

export const EDIT_PLANS_SHOW_LOADING = 'EDIT_PLANS_SHOW_LOADING';
export const EDIT_PLANS_HIDE_LOADING = 'EDIT_PLANS_HIDE_LOADING';
/**
 * actions
 */
export const editPlansAmountChange = createAction(EDIT_PLANS_AMOUNT_CHANGE);
export const editPlansProductChange = createAction(EDIT_PLANS_PRODUCT_CHANGE);
export const editPlansStartTimeChange = createAction(EDIT_PLANS_START_TIME_CHANGE);
export const editPlansEndTimeChange = createAction(EDIT_PLANS_END_TIME_CHANGE);
export const describeProduct = createAction(PRODUCT_DETAIL_REQUEST);
export const updatePlan = createAction(UPDATE_PLAN_REQUEST);
export const getProductInfo = createAction(EDIT_PLAN_INFO_REQUEST);
export const editProductInfoSuccess = createAction(EDIT_PLAN_INFO_REQUEST_SUCCESS);
export const editProductInfoError = createAction(EDIT_PLAN_INFO_REQUEST_ERROR);

export const editPlansShowLoading = createAction(EDIT_PLANS_SHOW_LOADING);
export const editPlansHideLoading = createAction(EDIT_PLANS_HIDE_LOADING);
/**
 * init state
 * @type {any}
 */
export const editPlansModel = Immutable.fromJS({

  product_id: '',
  isLoading: false,
  product_template : 4,
  amount : '5000',
  startTime : '',
  endTime : '',
  // 可能还有产品相关的字段

});

const editPlansReducer = handleActions({
  [EDIT_PLANS_AMOUNT_CHANGE] : (state,{payload})=>{
    return state.set('amount',payload);
  },
  [EDIT_PLANS_PRODUCT_CHANGE]: (state, {payload}) => {

    return state.set('product_template',payload);

  },
  [EDIT_PLANS_START_TIME_CHANGE]: (state,{payload}) => {
    return state.set('startTime', payload);
  },

  [EDIT_PLANS_END_TIME_CHANGE]: (state,{payload}) => {
    return state.set('endTime', payload);
  },
  [EDIT_PLANS_SHOW_LOADING]: (state) => {
    return state.set('isLoading', true);
  },
  [EDIT_PLANS_HIDE_LOADING]: (state) => {
    return state.set('isLoading', false);
  },
  [EDIT_PLAN_INFO_REQUEST_SUCCESS] : (state,{payload}) =>{

    return state.merge({
      product_template : payload['type_label'],
      amount : payload['total_amt'],
      startTime: payload['start_time'],
      endTime :payload['end_time']
    });
  }

},editPlansModel);


export default editPlansReducer;