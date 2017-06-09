/**
 * Created by zhongpingping on 2017/6/2.
 */

import { handleActions, createAction } from 'redux-actions';
import Immutable , {List} from 'immutable';
import moment from 'moment';


/**
 * action types
 */
export const ONLINE_PLANS_INPUT_CHANGE = 'ONLINE_PLANS_INPUT_CHANGE';
export const ONLINE_PLANS_SEARCH_MENU_CLICK = 'ONLINE_PLANS_SEARCH_MENU_CLICK';
export const ONLINE_PLANS_SEARCH_MENU_TOGGLE = 'ONLINE_PLANS_SEARCH_MENU_TOGGLE';

export const ONLINE_PLANS_SHOW_LOADING = 'ONLINE_PLANS_SHOW_LOADING';
export const ONLINE_PLANS_HIDE_LOADING = 'ONLINE_PLANS_HIDE_LOADING';

export const ONLINE_PLANS_STATUS_CHANGE = 'PENDING_PLANS_STATUS_CHANGE';

export const ONLINE_PLANS_SEARCH_REQUEST = 'ONLINE_PLANS_SEARCH_REQUEST';
export const ONLINE_PLANS_SEARCH_SUCCESS = 'ONLINE_PLANS_SEARCH_SUCCESS';
export const ONLINE_PLANS_SEARCH_ERROR = 'ONLINE_PLANS_SEARCH_ERROR';

export const DATE_PICKER_FOCUS_CHANGE = 'DATE_PICKER_FOCUS_CHANGE';
export const DATE_PICKER_CHANGE = 'DATE_PICKER_CHANGE';
/**
 * actions
 */
export const onlinePlansInputChange = createAction(ONLINE_PLANS_INPUT_CHANGE);
export const onlinePlansSearchMenuClick = createAction(ONLINE_PLANS_SEARCH_MENU_CLICK);
export const onlinePlansSearchMenuToggle = createAction(ONLINE_PLANS_SEARCH_MENU_TOGGLE);
export const onlinePlansStatusChange = createAction(ONLINE_PLANS_STATUS_CHANGE);
// 时间选择器
export const datePickerFocusChange = createAction(DATE_PICKER_FOCUS_CHANGE);
export const datePickerChange = createAction(DATE_PICKER_CHANGE);

export const onlinePlansShowLoading = createAction(ONLINE_PLANS_SHOW_LOADING);
export const onlinePlansHideLoading = createAction(ONLINE_PLANS_HIDE_LOADING);

export const onlinePlansSearchRequest = createAction(ONLINE_PLANS_SEARCH_REQUEST);
export const onlinePlansSearchSuccess = createAction(ONLINE_PLANS_SEARCH_SUCCESS);
export const onlinePlansSearchError = createAction(ONLINE_PLANS_SEARCH_ERROR);


/**
 * init state
 * @type {any}
 */
export const onlinePlansModel = Immutable.fromJS({

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

  statusFormCheckData : {
    label: '计划状态',
    checkType: 'radio',
    styleType: 'inline',
    list: [
      {
        name: '全部',
        value: 0
      },
      {
        name: '募集中',
        value: 2
      },
      {
        name: '已结束',
        value: 3
      }
    ],
    selectIndexList: [0],
  },

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

    head: ['产品期数', '产品类型', '年利率', '封闭期限','募集时间', '可投总额','计划状态','募集程度','剩余可投金额', '操作'],
    empty: {
      title: '无数据',
      message: '已上线理财计划列表为空'
    },
  },

  original: {},

  pagination: {
    total: 0,
    page: 0,
  },

  isLoading: false,

});

const onlinePlansReducer = handleActions({
  [ONLINE_PLANS_INPUT_CHANGE] : (state,{payload})=>{
    return state.set('inputValue',payload);
  },
  [ONLINE_PLANS_SEARCH_MENU_CLICK]: (state, {payload}) => {

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
  [ONLINE_PLANS_STATUS_CHANGE]: (state,{payload}) => {

    return state.updateIn(['statusFormCheckData','selectIndexList'], (value)=>{

      let ss = [];
      ss.push(payload.index);
      return List(ss);
    });

  },
  [ONLINE_PLANS_SEARCH_MENU_TOGGLE]: (state) => {
    return state.set('isMenuOpen', !state.get('isMenuOpen'));
  },

  [ONLINE_PLANS_SEARCH_SUCCESS]: (state, {payload}) => {
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
  [ONLINE_PLANS_SHOW_LOADING]: (state) => {
    return state.set('isLoading', true);
  },
  [ONLINE_PLANS_HIDE_LOADING]: (state) => {
    return state.set('isLoading', false);
  },
  [DATE_PICKER_FOCUS_CHANGE]: (state, {payload}) => {
    return state.updateIn([ 'datePicker', 'focusedInput' ], () => payload);
  },
  [DATE_PICKER_CHANGE]: (state, {payload}) => {
    return state.mergeDeep({datePicker:payload});
  }

},onlinePlansModel);


export default onlinePlansReducer;