/**
 * Created by zhongpingping on 2017/6/2.
 */

import { handleActions, createAction } from 'redux-actions';
import Immutable from 'immutable';
import moment from 'moment';


/**
 * action types
 */
export const ADD_PLANS_AMOUNT_CHANGE = 'ADD_PLANS_AMOUNT_CHANGE';
export const ADD_PLANS_PRODUCT_CHANGE = 'ADD_PLANS_PRODUCT_CHANGE';
export const ADD_PLANS_START_TIME_CHANGE = 'ADD_PLANS_START_TIME_CHANGE';
export const ADD_PLANS_END_TIME_CHANGE = 'ADD_PLANS_END_TIME_CHANGE';
export const PRODUCT_DETAIL_REQUEST = 'PRODUCT_DETAIL_REQUEST';
export const CREATE_PLAN_REQUEST = 'CREATE_PLAN_REQUEST';

export const ADD_PLANS_SHOW_LOADING = 'ADD_PLANS_SHOW_LOADING';
export const ADD_PLANS_HIDE_LOADING = 'ADD_PLANS_HIDE_LOADING';
/**
 * actions
 */
export const addPlansAmountChange = createAction(ADD_PLANS_AMOUNT_CHANGE);
export const addPlansProductChange = createAction(ADD_PLANS_PRODUCT_CHANGE);
export const addPlansStartTimeChange = createAction(ADD_PLANS_START_TIME_CHANGE);
export const addPlansEndTimeChange = createAction(ADD_PLANS_END_TIME_CHANGE);
export const describeProduct = createAction(PRODUCT_DETAIL_REQUEST);
export const createPlan = createAction(CREATE_PLAN_REQUEST);

export const addPlansShowLoading = createAction(ADD_PLANS_SHOW_LOADING);
export const addPlansHideLoading = createAction(ADD_PLANS_HIDE_LOADING);
/**
 * init state
 * @type {any}
 */
export const addPlansModel = Immutable.fromJS({

  isLoading: false,
  product_template : 1,
  amount : '',
  startTime : '',
  endTime : '',
  // 可能还有产品相关的字段

});

const addPlansReducer = handleActions({
  [ADD_PLANS_AMOUNT_CHANGE] : (state,{payload})=>{
    return state.set('amount',payload);
  },
  [ADD_PLANS_PRODUCT_CHANGE]: (state, {payload}) => {

    return state.set('product_template',payload);

  },
  [ADD_PLANS_START_TIME_CHANGE]: (state,{payload}) => {
    return state.set('startTime', payload);
  },

  [ADD_PLANS_END_TIME_CHANGE]: (state,{payload}) => {
    return state.set('endTime', payload);
  },
  [ADD_PLANS_SHOW_LOADING]: (state) => {
    return state.set('isLoading', true);
  },
  [ADD_PLANS_HIDE_LOADING]: (state) => {
    return state.set('isLoading', false);
  },

},addPlansModel);


export default addPlansReducer;