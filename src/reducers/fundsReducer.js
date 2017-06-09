/**
 * Created by zhongpingping on 2017/6/2.
 */


import { handleActions, createAction } from 'redux-actions';
import Immutable ,{List} from 'immutable';
import moment from 'moment';


/**
 * action types
 */
export const FUNDS_INPUT_CHANGE = 'FUNDS_INPUT_CHANGE';
export const FUNDS_SEARCH_MENU_CLICK = 'FUNDS_SEARCH_MENU_CLICK';
export const FUNDS_SEARCH_MENU_TOGGLE = 'FUNDS_SEARCH_MENU_TOGGLE';

export const FUNDS_STATUS_CHANGE = 'FUNDS_STATUS_CHANGE';
export const FUNDS_MIN_AMOUNT_CHANGE = 'FUNDS_MIN_AMOUNT_CHANGE';
export const FUNDS_MAX_AMOUNT_CHANGE = 'FUNDS_MAX_AMOUNT_CHANGE';


export const FUNDS_SHOW_LOADING = 'FUNDS_SHOW_LOADING';
export const FUNDS_HIDE_LOADING = 'FUNDS_HIDE_LOADING';

export const FUNDS_SEARCH_REQUEST = 'FUNDS_SEARCH_REQUEST';
export const FUNDS_SEARCH_SUCCESS = 'FUNDS_SEARCH_SUCCESS';
export const FUNDS_SEARCH_ERROR = 'FUNDS_SEARCH_ERROR';

export const DATE_PICKER_FOCUS_CHANGE = 'DATE_PICKER_FOCUS_CHANGE';
export const DATE_PICKER_CHANGE = 'DATE_PICKER_CHANGE';
/**
 * actions
 */
export const fundsInputChange = createAction(FUNDS_INPUT_CHANGE);
export const fundsSearchMenuClick = createAction(FUNDS_SEARCH_MENU_CLICK);
export const fundsSearchMenuToggle = createAction(FUNDS_SEARCH_MENU_TOGGLE);

export const fundsStatusChange = createAction(FUNDS_STATUS_CHANGE);
export const fundsMinAmountChange = createAction(FUNDS_MIN_AMOUNT_CHANGE);
export const fundsMaxAmountChange = createAction(FUNDS_MAX_AMOUNT_CHANGE);

// 时间选择器
export const datePickerFocusChange = createAction(DATE_PICKER_FOCUS_CHANGE);
export const datePickerChange = createAction(DATE_PICKER_CHANGE);


export const fundsShowLoading = createAction(FUNDS_SHOW_LOADING);
export const fundsHideLoading = createAction(FUNDS_HIDE_LOADING);

export const fundsSearchRequest = createAction(FUNDS_SEARCH_REQUEST);
export const fundsSearchSuccess = createAction(FUNDS_SEARCH_SUCCESS);
export const fundsSearchError = createAction(FUNDS_SEARCH_ERROR);


/**
 * init state
 * @type {any}
 */
export const fundsModel = Immutable.fromJS({

  menuList: [
    {
      name: '投资人姓名',
      type: 3
    },
    {
      name: '投资人手机号',
      type: 2
    },
    {
      name: '交易号',
      type: 1
    }
  ],
  selectMenuIndex: 0,
  isMenuOpen: false,
  inputValue: '',
  fund_status : 0,
  min_amount: '',
  max_amount: '',

  statusFormCheckData : {
    label: '资金动态',
    checkType: 'radio',
    styleType: 'inline',
    list: [
      {
        name: '全部',
        value: ''
      },
      {
        name: '赎回',
        value: 4
      },
      {
        name: '提前赎回',
        value: 5
      },
      {
        name: '提现',
        value: 2
      },
      {
        name: '充值',
        value: 1
      },
      {
        name: '投资',
        value: 3
      },
      {
        name: '退款',
        value: 7
      },
      {
        name: '奖励',
        value: 6
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
    head: ['流水号', '投资人', '手机号', '发起时间', '类型', '金额', '交易前余额','交易后余额','状态'],
    empty: {
      title: '无数据',
      message: '平台资金流水列表为空'
    },
  },

  original: {},

  pagination: {
    total: 0,
    page: 0,
  },

  isLoading: false,

});

const fundsReducer = handleActions({
  [FUNDS_INPUT_CHANGE] : (state,{payload})=>{
    return state.set('inputValue',payload);
  },
  [FUNDS_SEARCH_MENU_CLICK]: (state, {payload}) => {

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
  [FUNDS_SEARCH_MENU_TOGGLE]: (state) => {
    return state.set('isMenuOpen', !state.get('isMenuOpen'));
  },

  [FUNDS_STATUS_CHANGE]:(state,{payload})=>{
    return state.updateIn(['statusFormCheckData','selectIndexList'], (value)=>{

      let ss = [];
      ss.push(payload.index);
      return List(ss);
    });
  },

  [FUNDS_MIN_AMOUNT_CHANGE] : (state,{payload})=>{
    return state.set('min_amount',payload);
  },
  [FUNDS_MAX_AMOUNT_CHANGE] :(state,{payload}) =>{
    return state.set('max_amount',payload);
  },

  [FUNDS_SEARCH_SUCCESS]: (state, {payload}) => {
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
  [FUNDS_SHOW_LOADING]: (state) => {
    return state.set('isLoading', true);
  },
  [FUNDS_HIDE_LOADING]: (state) => {
    return state.set('isLoading', false);
  },
  [DATE_PICKER_FOCUS_CHANGE]: (state, {payload}) => {
    return state.updateIn([ 'datePicker', 'focusedInput' ], () => payload);
  },
  [DATE_PICKER_CHANGE]: (state, {payload}) => {
    return state.mergeDeep({datePicker:payload});
  }

},fundsModel);

export default fundsReducer;