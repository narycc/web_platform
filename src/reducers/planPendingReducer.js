/**
 * Created by zhongpingping on 2017/6/2.
 */

import { handleActions, createAction } from 'redux-actions';
import Immutable from 'immutable';
import moment from 'moment';


/**
 * action types
 */
export const PENDING_PLANS_INPUT_CHANGE = 'PENDING_PLANS_INPUT_CHANGE';
export const PENDING_PLANS_SEARCH_MENU_CLICK = 'PENDING_PLANS_SEARCH_MENU_CLICK';
export const PENDING_PLANS_SEARCH_MENU_TOGGLE = 'PENDING_PLANS_SEARCH_MENU_TOGGLE';



export const DATE_PICKER_FOCUS_CHANGE = 'DATE_PICKER_FOCUS_CHANGE';
export const DATE_PICKER_CHANGE = 'DATE_PICKER_CHANGE';

export const PENDING_PLANS_SHOW_LOADING = 'PENDING_PLANS_SHOW_LOADING';
export const PENDING_PLANS_HIDE_LOADING = 'PENDING_PLANS_HIDE_LOADING';

export const PENDING_PLANS_SEARCH_REQUEST = 'PENDING_PLANS_SEARCH_REQUEST';
export const PENDING_PLANS_SEARCH_SUCCESS = 'PENDING_PLANS_SEARCH_SUCCESS';
export const PENDING_PLANS_SEARCH_ERROR = 'PENDING_PLANS_SEARCH_ERROR';

export const PENDING_PLANS_DELETE_REQUEST = 'PENDING_PLANS_DELETE_REQUEST';

/**
 * actions
 */
export const pendingPlansInputChange = createAction(PENDING_PLANS_INPUT_CHANGE);
export const pendingPlansSearchMenuClick = createAction(PENDING_PLANS_SEARCH_MENU_CLICK);
export const pendingPlansSearchMenuToggle = createAction(PENDING_PLANS_SEARCH_MENU_TOGGLE);


// 时间选择器
export const datePickerFocusChange = createAction(DATE_PICKER_FOCUS_CHANGE);
export const datePickerChange = createAction(DATE_PICKER_CHANGE);

export const pendingPlansShowLoading = createAction(PENDING_PLANS_SHOW_LOADING);
export const pendingPlansHideLoading = createAction(PENDING_PLANS_HIDE_LOADING);

export const pendingPlansSearchRequest = createAction(PENDING_PLANS_SEARCH_REQUEST);
export const pendingPlansSearchSuccess = createAction(PENDING_PLANS_SEARCH_SUCCESS);
export const pendingPlansSearchError = createAction(PENDING_PLANS_SEARCH_ERROR);
export const pendingPlansDeleteRequest = createAction(PENDING_PLANS_DELETE_REQUEST);

/**
 * init state
 * @type {any}
 */
export const pendingPlansModel = Immutable.fromJS({

  menuList: [
    {
      name: '产品类型',
      type: 1
    },
    {
      name: '产品期数',
      type: 2
    }
  ],
  selectMenuIndex: 0,
  isMenuOpen: false,
  inputValue: '',

  // 时间选择器
  datePicker: {
    focusedInput: null,
    startDate: moment(),
    endDate: moment(),
  },

  tableBtnList: [
    {
      name: '刷新列表',
      iconClassName: 'fa fa-refresh'
    }
  ],
  listData: {
    head: ['产品期数', '产品类型', '年利率', '封闭期限', '募集时间', '可投总额', '操作'],
    empty: {
      title: '无数据',
      message: '待上线理财计划列表为空'
    },
  },

  original: {},

  pagination: {
    total: 0,
    page: 0,
  },

  isLoading: false,

});

const pendingPlansReducer = handleActions({
  [PENDING_PLANS_INPUT_CHANGE] : (state,{payload})=>{
    return state.set('inputValue',payload);
  },
  [PENDING_PLANS_SEARCH_MENU_CLICK]: (state, {payload}) => {

    let selectMenuIndex = state.get('selectMenuIndex');
    state.get('menuList').forEach((item, index) => {
      if (item.get('name') === payload.name) {
        selectMenuIndex = index;
      }
    });
    return state.merge({
      selectMenuIndex,
      isMenuOpen: false,
    });

  },

  [PENDING_PLANS_SEARCH_MENU_TOGGLE]: (state) => {
    return state.set('isMenuOpen', !state.get('isMenuOpen'));
  },

  [PENDING_PLANS_SEARCH_SUCCESS]: (state, {payload}) => {
    let data = payload.data || {};
    return state.merge({
      original: Immutable.fromJS(payload),
      pagination: Immutable.fromJS({
        total: data.totalPage,
        page: (payload.param && payload.param.page)
      }),
      isLoading: false
    });
  },
  [PENDING_PLANS_SHOW_LOADING]: (state) => {
    return state.set('isLoading', true);
  },
  [PENDING_PLANS_HIDE_LOADING]: (state) => {
    return state.set('isLoading', false);
  },
  [DATE_PICKER_FOCUS_CHANGE]: (state, {payload}) => {
    return state.updateIn([ 'datePicker', 'focusedInput' ], () => payload);
  },
  [DATE_PICKER_CHANGE]: (state, {payload}) => {
    return state.mergeDeep({datePicker:payload});
  }

},pendingPlansModel);


export default pendingPlansReducer;