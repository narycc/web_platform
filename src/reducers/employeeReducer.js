/**
 * Created by wenbinzhang on 2017/5/15.
 */

import { handleActions, createAction } from 'redux-actions';
import Immutable from 'immutable';

/**
 * action types
 */
export const EMPLOYEE_INPUT_CHANGE = 'EMPLOYEE_INPUT_CHANGE';
export const EMPLOYEE_SEARCH_MENU_CLICK = 'EMPLOYEE_SEARCH_MENU_CLICK';
export const EMPLOYEE_SEARCH_MENU_TOGGLE = 'EMPLOYEE_SEARCH_MENU_TOGGLE';

export const EMPLOYEE_SHOW_LOADING = 'EMPLOYEE_SHOW_LOADING';
export const EMPLOYEE_HIDE_LOADING = 'EMPLOYEE_HIDE_LOADING';

export const EMPLOYEE_SEARCH_REQUEST = 'EMPLOYEE_SEARCH_REQUEST';
export const EMPLOYEE_SEARCH_SUCCESS = 'EMPLOYEE_SEARCH_SUCCESS';
export const EMPLOYEE_SEARCH_ERROR = 'EMPLOYEE_SEARCH_ERROR';

export const EMPLOYEE_ADD_REQUEST = 'EMPLOYEE_ADD_REQUEST';

export const EMPLOYEE_DELETE_REQUEST = 'EMPLOYEE_DELETE_REQUEST';

/**
 * actions
 */
export const employeeInputChange = createAction(EMPLOYEE_INPUT_CHANGE);
export const employeeSearchMenuClick = createAction(EMPLOYEE_SEARCH_MENU_CLICK);
export const employeeSearchMenuToggle = createAction(EMPLOYEE_SEARCH_MENU_TOGGLE);

export const employeeShowLoading = createAction(EMPLOYEE_SHOW_LOADING);
export const employeeHideLoading = createAction(EMPLOYEE_HIDE_LOADING);

export const employeeSearchRequest = createAction(EMPLOYEE_SEARCH_REQUEST);
export const employeeSearchSuccess = createAction(EMPLOYEE_SEARCH_SUCCESS);
export const employeeSearchError = createAction(EMPLOYEE_SEARCH_ERROR);


export const employeeAddRequest = createAction(EMPLOYEE_ADD_REQUEST);

export const employeeDeleteRequest = createAction(EMPLOYEE_DELETE_REQUEST);

/**
 * init State
 */
export const employeeModels = Immutable.fromJS({
  menuList: [
    {
      name: '手机号',
      type: 2
    },
    {
      name: '姓名',
      type: 1
    }
  ],
  selectMenuIndex: 0,
  isMenuOpen: false,
  inputValue: '',

  tableBtnList: [
    {
      name: '刷新列表',
      iconClassName: 'fa fa-refresh'
    }
  ],

  listData: {
    head: ['id', '姓名', '手机号', '角色', '创建时间', '更新时间', '操作'],
    empty: {
      title: '无数据',
      message: '员工列表为空'
    },
  },

  original: {},

  pagination: {
    total: 0,
    page: 0,
  },

  isLoading: false,

});

const employeeReducer = handleActions({
  [EMPLOYEE_INPUT_CHANGE]: (state, {payload}) => {
    return state.set('inputValue', payload);
  },
  [EMPLOYEE_SEARCH_MENU_CLICK]: (state, {payload}) => {
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
  [EMPLOYEE_SEARCH_MENU_TOGGLE]: (state) => {
    return state.set('isMenuOpen', !state.get('isMenuOpen'));
  },
  [EMPLOYEE_SEARCH_SUCCESS]: (state, {payload}) => {
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
  [EMPLOYEE_SHOW_LOADING]: (state) => {
    return state.set('isLoading', true);
  },
  [EMPLOYEE_HIDE_LOADING]: (state) => {
    return state.set('isLoading', false);
  },
}, employeeModels);

export default employeeReducer;