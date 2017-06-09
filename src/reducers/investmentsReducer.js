/**
 * Created by zhongpingping on 2017/5/27.
 */

import { handleActions, createAction } from 'redux-actions';
import Immutable ,{List} from 'immutable';
import moment from 'moment';


/**
 * action types
 */
export const INVESTMENTS_INPUT_CHANGE = 'INVESTMENTS_INPUT_CHANGE';
export const INVESTMENTS_SEARCH_MENU_CLICK = 'INVESTMENTS_SEARCH_MENU_CLICK';
export const INVESTMENTS_SEARCH_MENU_TOGGLE = 'INVESTMENTS_SEARCH_MENU_TOGGLE';

export const INVESTMENTS_PRODUCT_TYPE_CHANGE = 'INVESTMENTS_PRODUCT_TYPE_CHANGE';
export const INVESTMENTS_TRADE_STATUS_CHANGE = 'INVESTMENTS_TRADE_STATUS_CHANGE';
export const INVESTMENTS_MIN_AMOUNT_CHANGE = 'INVESTMENTS_MIN_AMOUNT_CHANGE';
export const INVESTMENTS_MAX_AMOUNT_CHANGE = 'INVESTMENTS_MAX_AMOUNT_CHANGE';



export const INVESTMENTS_SHOW_LOADING = 'INVESTMENTS_SHOW_LOADING';
export const INVESTMENTS_HIDE_LOADING = 'INVESTMENTS_HIDE_LOADING';

export const INVESTMENTS_SEARCH_REQUEST = 'INVESTMENTS_SEARCH_REQUEST';
export const INVESTMENTS_SEARCH_SUCCESS = 'INVESTMENTS_SEARCH_SUCCESS';
export const INVESTMENTS_SEARCH_ERROR = 'INVESTMENTS_SEARCH_ERROR';

export const DATE_PICKER_FOCUS_CHANGE = 'DATE_PICKER_FOCUS_CHANGE';
export const DATE_PICKER_CHANGE = 'DATE_PICKER_CHANGE';
export const DATE_PICKER_TYPE_MENU_CLICK = 'DATE_PICKER_TYPE_MENU_CLICK';
export const DATE_PICKER_TYPE_MENU_TOGGLE = 'DATE_PICKER_TYPE_MENU_TOGGLE';
/**
 * actions
 */
export const investmentsInputChange = createAction(INVESTMENTS_INPUT_CHANGE);
export const investmentsSearchMenuClick = createAction(INVESTMENTS_SEARCH_MENU_CLICK);
export const investmentsSearchMenuToggle = createAction(INVESTMENTS_SEARCH_MENU_TOGGLE);

export const investmentsProductTypeChange = createAction(INVESTMENTS_PRODUCT_TYPE_CHANGE);
export const investmentsTradeStatusChange = createAction(INVESTMENTS_TRADE_STATUS_CHANGE);
export const investmentsMinAmountChange = createAction(INVESTMENTS_MIN_AMOUNT_CHANGE);
export const investmentsMaxAmountChange = createAction(INVESTMENTS_MAX_AMOUNT_CHANGE);




export const investmentsShowLoading = createAction(INVESTMENTS_SHOW_LOADING);
export const investmentsHideLoading = createAction(INVESTMENTS_HIDE_LOADING);

export const investmentsSearchRequest = createAction(INVESTMENTS_SEARCH_REQUEST);
export const investmentsSearchSuccess = createAction(INVESTMENTS_SEARCH_SUCCESS);
export const investmentsSearchError = createAction(INVESTMENTS_SEARCH_ERROR);

// 时间选择器

export const datePickerFocusChange = createAction(DATE_PICKER_FOCUS_CHANGE);
export const datePickerChange = createAction(DATE_PICKER_CHANGE);
export const datePickerTypeMenuClick = createAction(DATE_PICKER_TYPE_MENU_CLICK);
export const datePickerTypeMenuToggle = createAction(DATE_PICKER_TYPE_MENU_TOGGLE);



/**
 * init state
 * @type {any}
 */
export const investmentsModel = Immutable.fromJS({

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
  min_amount: '',
  max_amount: '',

  productFormCheckData : {
    label: '产品类型',
    checkType: 'radio',
    styleType: 'inline',
    list: [
      {
        name: '全部',
        value: 0
      },
      {
        name: '智慧宝1号',
        value: 1
      },
      {
        name: '智慧宝2号',
        value: 2
      },
      {
        name: '智慧宝3号',
        value: 3
      },
      {
        name: '智慧宝4号',
        value: 4
      }
    ],
    selectIndexList: [0],
  },

  statusFormCheckData : {
    label: '交易状态',
    checkType: 'radio',
    styleType: 'inline',
    list: [
      {
        name: '全部',
        value: ''
      },
      {
        name: '预约中',
        value: 0
      },
      {
        name: '预约失败',
        value: 2
      },
      {
        name: '待回款',
        value: 1
      },
      {
        name: '已回款',
        value: 10
      },
      {
        name: '赎回中',
        value: 5
      },
      {
        name: '已赎回',
        value: 8
      }
    ],
    selectIndexList: [0],
  },

  typeDatePickerData: {
    menuList: [ {
      name:'预约时间',
      value: 1
    },{
      name:'到期时间',
      value: 2
    }],
    selectMenuIndex: 0,
    isMenuOpen: false,
    // 时间选择器
    datePicker: {
      focusedInput: null,
      startDate: moment(),
      endDate: moment(),
    }
  },


  tableBtnList: [
    {
      name: '刷新列表',
      iconClassName: 'fa fa-refresh'
    }
  ],
  listData: {
    head: ['交易号', '投资人', '手机号', '产品类型', '封闭期', '年化率', '预约时间','到期日期','投资本金(元)','在投本金(元)','交易状态','投资详情'],
    empty: {
      title: '无数据',
      message: '投资交易列表为空'
    },
  },

  original: {},

  pagination: {
    total: 0,
    page: 0,
  },

  isLoading: false,



});

const investmentsReducer = handleActions({
  [INVESTMENTS_INPUT_CHANGE] : (state,{payload})=>{

    return state.set('inputValue',payload);

  },
  [INVESTMENTS_SEARCH_MENU_CLICK]: (state, {payload}) => {

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
  [INVESTMENTS_SEARCH_MENU_TOGGLE]: (state) => {

    return state.set('isMenuOpen', !state.get('isMenuOpen'));

  },
  [INVESTMENTS_PRODUCT_TYPE_CHANGE] : (state,{payload})=>{

    return state.updateIn(['productFormCheckData','selectIndexList'], (value)=>{

      let ss = [];
      ss.push(payload.index);
      return List(ss);
    });


  },
  [INVESTMENTS_TRADE_STATUS_CHANGE]:(state,{payload})=>{

    return state.updateIn(['statusFormCheckData','selectIndexList'], (value)=>{

      let ss = [];
      ss.push(payload.index);
      return List(ss);
    });

  },

  [INVESTMENTS_MIN_AMOUNT_CHANGE] : (state,{payload})=>{
    return state.set('min_amount',payload);
  },
  [INVESTMENTS_MAX_AMOUNT_CHANGE] :(state,{payload}) =>{
    return state.set('max_amount',payload);
  },

  [INVESTMENTS_SEARCH_SUCCESS]: (state, {payload}) => {
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
  [INVESTMENTS_SHOW_LOADING]: (state) => {
    return state.set('isLoading', true);
  },
  [INVESTMENTS_HIDE_LOADING]: (state) => {
    return state.set('isLoading', false);
  },
  [DATE_PICKER_FOCUS_CHANGE]: (state, {payload}) => {

    return state.updateIn([ 'typeDatePickerData', 'datePicker', 'focusedInput' ], () => payload);
  },
  [DATE_PICKER_CHANGE]: (state, {payload}) => {
    return state.mergeDeep({typeDatePickerData:{datePicker:payload}});
  },

  [DATE_PICKER_TYPE_MENU_CLICK]: (state, {payload}) => {

    let selectMenuIndex = state.getIn(['typeDatePickerData','selectMenuIndex']);
    state.getIn(['typeDatePickerData','menuList']).forEach((item, index) => {
      if (item.get('name') === payload.name) {
        selectMenuIndex = index;
      }
    });
    return state.mergeDeep({typeDatePickerData:{
      selectMenuIndex,
      isMenuOpen: false,
    }});

  },
  [DATE_PICKER_TYPE_MENU_TOGGLE]: (state) => {


    return state.updateIn(['typeDatePickerData','isMenuOpen'], value => !value );

  },

},investmentsModel);

export default investmentsReducer;