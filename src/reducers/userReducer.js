/**
 * Created by wenbinzhang on 2017/5/22.
 */
import { handleActions, createAction } from 'redux-actions';
import Immutable from 'immutable';
import monent from 'moment';

/**
 * action types
 */
export const USER_INPUT_CHANGE = 'USER_INPUT_CHANGE';
export const USER_SEARCH_MENU_CLICK = 'USER_SEARCH_MENU_CLICK';
export const USER_SEARCH_MENU_TOGGLE = 'USER_SEARCH_MENU_TOGGLE';

export const USER_SHOW_LOADING = 'USER_SHOW_LOADING';
export const USER_HIDE_LOADING = 'USER_HIDE_LOADING';

export const USER_SEARCH_REQUEST = 'USER_SEARCH_REQUEST';
export const USER_SEARCH_SUCCESS = 'USER_SEARCH_SUCCESS';
export const USER_SEARCH_ERROR = 'USER_SEARCH_ERROR';

// 时间选择器
export const USER_DATE_FOCUS_CHANGE = 'USER_DATE_FOCUS_CHANGE';
export const USER_DATE_CHANGE = 'USER_DATE_CHANGE';

/**
 * actions
 */
export const userInputChange = createAction(USER_INPUT_CHANGE);
export const userSearchMenuClick = createAction(USER_SEARCH_MENU_CLICK);
export const userSearchMenuToggle = createAction(USER_SEARCH_MENU_TOGGLE);

export const userShowLoading = createAction(USER_SHOW_LOADING);
export const userHideLoading = createAction(USER_HIDE_LOADING);

export const userSearchRequest = createAction(USER_SEARCH_REQUEST);
export const userSearchSuccess = createAction(USER_SEARCH_SUCCESS);
export const userSearchError = createAction(USER_SEARCH_ERROR);

// 时间选择器
export const userDateFocusChange = createAction(USER_DATE_FOCUS_CHANGE);
export const userDateChange = createAction(USER_DATE_CHANGE);

/**
 * init State
 */
export const userModels = Immutable.fromJS({
  menuList: [
    {
      name: '投资人姓名',
      type: 1
    },
    {
      name: '投资人手机号',
      type: 2
    },
    {
      name: '推荐人姓名',
      type: 3
    },
  ],
  isMenuOpen: false,

  selectMenuIndex: 0,

  inputValue: '',

  tableBtnList: [
    {
      name: '刷新列表',
      iconClassName: 'fa fa-refresh'
    }
  ],

  listData: {
    head: ['投资人', '手机号', '身份证', '注册时间', '推荐人', '推荐类型', '账户状态', '操作'],
    empty: {
      title: '无数据',
      message: '搜索投资人表为空'
    },
  },

  original: {},

  pagination: {
    total: 0,
    page: 0,
  },

  isLoading: false,

  // 时间选择器
  datePicker: {
    focusedInput: null,
    startDate: monent(),
    endDate: monent(),
  },

});


/**
 * reducer
 */

const userReducer = handleActions({
  [USER_INPUT_CHANGE]: (state, {payload}) => {
    return state.set('inputValue', payload);
  },
  [USER_SEARCH_MENU_CLICK]: (state, {payload}) => {
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
  [USER_SEARCH_MENU_TOGGLE]: (state) => {
    return state.set('isMenuOpen', !state.get('isMenuOpen'));
  },
  [USER_SEARCH_SUCCESS]: (state, {payload}) => {
    let data = payload.data;
    return state.merge({
      original: Immutable.fromJS(payload),
      pagination: Immutable.fromJS({
        total: data.totalPage,
        page: (payload.param && payload.param.page)
      })
    });
  },
  [USER_SEARCH_ERROR]: (state, {payload}) => {
    return state.merge({
      original: Immutable.fromJS({
        param: payload
      })
    });
  },
  [USER_SHOW_LOADING]: (state) => {
    return state.set('isLoading', true);
  },
  [USER_HIDE_LOADING]: (state) => {
    return state.set('isLoading', false);
  },
  [USER_DATE_FOCUS_CHANGE]: (state, {payload}) => {
    let datePicker = state.get('datePicker');
    let newDatePicker = datePicker.set('focusedInput', payload);
    return state.set('datePicker', newDatePicker);
  },
  [USER_DATE_CHANGE]: (state, {payload}) => {
    let datePicker = state.get('datePicker');
    let newDatePicker = datePicker.merge(payload);
    return state.set('datePicker', newDatePicker);
  },
}, userModels);

export default userReducer;