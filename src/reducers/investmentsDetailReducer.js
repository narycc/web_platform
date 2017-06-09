/**
 * Created by zhongpingping on 2017/5/31.
 */

import { handleActions, createAction } from 'redux-actions';
import Immutable from 'immutable';


/**
 * action types
 */
export const INVESTMENTS_DETAIL_NAV_CHANGE = 'INVESTMENTS_DETAIL_NAV_CHANGE';

export const INVESTMENTS_DETAIL_SHOW_LOADING = 'INVESTMENTS_DETAIL_SHOW_LOADING';
export const INVESTMENTS_DETAIL_HIDE_LOADING = 'INVESTMENTS_DETAIL_HIDE_LOADING';

export const INVESTMENTS_DETAIL_SEARCH_REQUEST = 'INVESTMENTS_DETAIL_SEARCH_REQUEST';
export const INVESTMENTS_DETAIL_SEARCH_SUCCESS = 'INVESTMENTS_DETAIL_SEARCH_SUCCESS';
export const INVESTMENTS_DETAIL_SEARCH_ERROR = 'INVESTMENTS_DETAIL_SEARCH_ERROR';


/**
 * actions
 */

export const investmentsDetailNavChange = createAction(INVESTMENTS_DETAIL_NAV_CHANGE);


export const investmentsDetailShowLoading = createAction(INVESTMENTS_DETAIL_SHOW_LOADING);
export const investmentsDetailHideLoading = createAction(INVESTMENTS_DETAIL_HIDE_LOADING);

export const investmentsDetailSearchRequest = createAction(INVESTMENTS_DETAIL_SEARCH_REQUEST);
export const investmentsDetailSearchSuccess = createAction(INVESTMENTS_DETAIL_SEARCH_SUCCESS);
export const investmentsDetailSearchError = createAction(INVESTMENTS_DETAIL_SEARCH_ERROR);




/**
 * init state
 * @type {any}
 */
export const investmentsDetailModel = Immutable.fromJS({

  navConfig : {
    list:[{name:'投资明细',index:0},{name:'债权匹配',index:1}],
    selectedIndex:0
  },

  listData: {

    investmentHistory:{
      head:['时间','事件'],
      empty: {
        title: '无数据',
        message: '投资明细列表为空'
      },
    },
    financialClaims : {
      head: ['借款人', '匹配时间', '匹配借款'],
      empty: {
        title: '无数据',
        message: '债权匹配列表为空'
      },
    }

  },

  original: {},

  pagination: {
    total: 0,
    page: 0,
  },

  isLoading: false,

});

const investmentsDetailReducer = handleActions({

  [INVESTMENTS_DETAIL_NAV_CHANGE] :(state,{payload}) =>{

    return state.mergeDeep({navConfig:{selectedIndex:payload.index}});
  },

  [INVESTMENTS_DETAIL_SEARCH_SUCCESS]: (state, {payload}) => {
    let data = payload.data || {};

    return state.merge({
      original: Immutable.fromJS(payload),
      isLoading: false
    });
  },
  [INVESTMENTS_DETAIL_SHOW_LOADING]: (state) => {
    return state.set('isLoading', true);
  },
  [INVESTMENTS_DETAIL_HIDE_LOADING]: (state) => {
    return state.set('isLoading', false);
  }

},investmentsDetailModel);

export default investmentsDetailReducer;