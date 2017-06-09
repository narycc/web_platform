/**
 * Created by wenbinzhang on 2017/5/26.
 */
import {handleActions, createAction} from 'redux-actions';
import Immutable from 'immutable';
import monent from 'moment';

/**
 * action types
 */
export const USER_DETAIL_TAB_CLICK = 'USER_DETAIL_TAB_CLICK';
export const USER_DETAIL_UPDATE_INVESTOR_ID = 'USER_DETAIL_UPDATE_INVESTOR_ID';

export const USER_DETAIL_BASE_REQUEST = 'USER_DETAIL_BASE_REQUEST';
export const USER_DETAIL_BASE_SUCCESS = 'USER_DETAIL_BASE_SUCCESS';
export const USER_DETAIL_BASE_ERROR = 'USER_DETAIL_BASE_ERROR';

export const USER_DETAIL_SUMMARY_REQUEST = 'USER_DETAIL_SUMMARY_REQUEST';
export const USER_DETAIL_SUMMARY_SUCCESS = 'USER_DETAIL_SUMMARY_SUCCESS';
export const USER_DETAIL_SUMMARY_ERROR = 'USER_DETAIL_SUMMARY_ERROR';

export const USER_DETAIL_INVESTMENT_REQUEST = 'USER_DETAIL_INVESTMENT_REQUEST';
export const USER_DETAIL_INVESTMENT_SUCCESS = 'USER_DETAIL_INVESTMENT_SUCCESS';
export const USER_DETAIL_INVESTMENT_ERROR = 'USER_DETAIL_INVESTMENT_ERROR';
export const USER_DETAIL_INVESTMENT_CHECK_CLICK = 'USER_DETAIL_INVESTMENT_CHECK_CLICK';
export const USER_DETAIL_INVESTMENT_INPUT_CHANGE = 'USER_DETAIL_INVESTMENT_INPUT_CHANGE';

export const USER_DETAIL_CAPITAL_DATE_CHANGE = 'USER_DETAIL_CAPITAL_DATE_CHANGE';
export const USER_DETAIL_CAPITAL_DATE_FOCUS_CHANGE = 'USER_DETAIL_CAPITAL_DATE_FOCUS_CHANGE';
export const USER_DETAIL_CAPITAL_CHECK_CLICK = 'USER_DETAIL_CAPITAL_CHECK_CLICK';
export const USER_DETAIL_CAPITAL_REQUEST = 'USER_DETAIL_CAPITAL_REQUEST';
export const USER_DETAIL_CAPITAL_SUCCESS = 'USER_DETAIL_CAPITAL_SUCCESS';
export const USER_DETAIL_CAPITAL_ERROR = 'USER_DETAIL_CAPITAL_ERROR';

export const USER_DETAIL_LOG_REQUEST = 'USER_DETAIL_LOG_REQUEST';
export const USER_DETAIL_LOG_SUCCESS = 'USER_DETAIL_LOG_SUCCESS';
export const USER_DETAIL_LOG_ERROR = 'USER_DETAIL_LOG_ERROR';
export const USER_DETAIL_LOG_REMARK = 'USER_DETAIL_LOG_REMARK';

export const USER_DETAIL_SHOW_LOADING = 'USER_DETAIL_SHOW_LOADING';
export const USER_DETAIL_HIDE_LOADING = 'USER_DETAIL_HIDE_LOADING';

/**
 * actions
 */

export const userDetailTabClick = createAction(USER_DETAIL_TAB_CLICK);

export const userDetailUpdateInvestorId = createAction(USER_DETAIL_UPDATE_INVESTOR_ID);

export const userDetailBaseRequest = createAction(USER_DETAIL_BASE_REQUEST);
export const userDetailBaseSuccess = createAction(USER_DETAIL_BASE_SUCCESS);
export const userDetailBaseError = createAction(USER_DETAIL_BASE_ERROR);

export const userDetailSummaryRequest = createAction(USER_DETAIL_SUMMARY_REQUEST);
export const userDetailSummarySuccess = createAction(USER_DETAIL_SUMMARY_SUCCESS);
export const userDetailSummaryError = createAction(USER_DETAIL_SUMMARY_ERROR);

export const userDetailInvestmentRequest = createAction(USER_DETAIL_INVESTMENT_REQUEST);
export const userDetailInvestmentSuccess = createAction(USER_DETAIL_INVESTMENT_SUCCESS);
export const userDetailInvestmentError = createAction(USER_DETAIL_INVESTMENT_ERROR);
export const userDetailInvestmentCheckClick = createAction(USER_DETAIL_INVESTMENT_CHECK_CLICK);
export const userDetailInvestmentInputChange = createAction(USER_DETAIL_INVESTMENT_INPUT_CHANGE);

export const userDetailCapitalDateChange = createAction(USER_DETAIL_CAPITAL_DATE_CHANGE);
export const userDetailCapitalDateFocusChange = createAction(USER_DETAIL_CAPITAL_DATE_FOCUS_CHANGE);
export const userDetailCapitalCheckClick = createAction(USER_DETAIL_CAPITAL_CHECK_CLICK);
export const userDetailCapitalRequest = createAction(USER_DETAIL_CAPITAL_REQUEST);
export const userDetailCapitalSuccess = createAction(USER_DETAIL_CAPITAL_SUCCESS);
export const userDetailCapitalError = createAction(USER_DETAIL_CAPITAL_ERROR);

export const userDetailLogRequest = createAction(USER_DETAIL_LOG_REQUEST);
export const userDetailLogSuccess = createAction(USER_DETAIL_LOG_SUCCESS);
export const userDetailLogError = createAction(USER_DETAIL_LOG_ERROR);
export const userDetailLogRemark = createAction(USER_DETAIL_LOG_REMARK);

export const userDetailShowLoading = createAction(USER_DETAIL_SHOW_LOADING);
export const userDetailHideLoading = createAction(USER_DETAIL_HIDE_LOADING);

/**
 * init State
 */

export const userDetailState = Immutable.fromJS({

  tabInfo: {
    list: [
      {name: '用户信息'},
      {name: '投资记录'},
      {name: '资金流水'},
      {name: '操作日志'},
    ],
    selectedIndex: 0
  },

  investor_id: '',

  isLoading: false,

  base: {},

  summaryInfo: {
    original: {}
  },

  investment: {

    table: {
      head: ['交易号', '产品类型', '封闭期', '年化率', '预约时间', '到期日期', '投资本金', '在投本金', '当前收益', '交易状态', '投资详情']
    },
    original: {
      data: {
        list: []
      }
    },
    pagination: {
      total: 0,
      page: 0,
    },

    formCheckData: {
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
          value: 1
        },
        {
          name: '待回款',
          value: 2
        },
        {
          name: '投资失败',
          value: 6
        },
        {
          name: '已回款',
          value: 3
        },
        {
          name: '赎回中',
          value: 4
        },
        {
          name: '已赎回',
          value: 5
        },
      ],
      selectIndexList: [0],
    },

    menuData: {
      menuList: [
        {
          name: '交易号',
          type: 1
        },
      ],
      inputValue: '',
    },

  },

  capital: {
    table: {
      head: ['交易号', '发起时间', '资金动态', '金额', '交易前余额', '交易后余额', '状态']
    },
    original: {
      data: {
        list: []
      }
    },
    formCheckData: {
      label: '资金状态',
      checkType: 'radio',
      styleType: 'inline',
      list: [
        {
          name: '全部',
          value: ''
        },
        {
          name: '到期赎回',
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
          name: '奖励',
          value: 6
        },
        {
          name: '退回',
          value: 7
        },
      ],
      selectIndexList: [0],
    },
    pagination: {
      total: 0,
      page: 0,
    },
    // 时间选择器
    datePicker: {
      focusedInput: null,
      startDate: monent(),
      endDate: monent(),
    }
  },

  log: {
    table: {
      head: ['时间', '事件', '变更前', '变更后', '操作人'],
    },

    original: {
      data: {
        list: []
      }
    },

    pagination: {
      total: 10,
      page: 0,
    },
  },

});


/**
 * reducer
 */

const reducer = handleActions({
  [USER_DETAIL_UPDATE_INVESTOR_ID]: (state, {payload}) => {
    return state.set('investor_id', payload);
  },
  [USER_DETAIL_SUMMARY_SUCCESS]: (state, {payload}) => {
    return state.set('summaryInfo', Immutable.fromJS({
      original: payload
    }));
  },
  [USER_DETAIL_SUMMARY_ERROR]: (state) => {
    return state.set('summaryInfo', Immutable.fromJS({
      original: {}
    }));
  },
  [USER_DETAIL_BASE_SUCCESS]: (state, {payload}) => {
    return state.set('base', Immutable.fromJS(payload.data));
  },
  [USER_DETAIL_BASE_ERROR]: (state) => {
    return state.set('base', Immutable.fromJS({}));
  },
  [USER_DETAIL_TAB_CLICK]: (state, {payload}) => {
    let tabInfo = state.get('tabInfo');
    return state.set('tabInfo', tabInfo.set('selectedIndex', payload.index));
  },
  [USER_DETAIL_INVESTMENT_INPUT_CHANGE]: (state, {payload}) => {
    return state.updateIn(['investment', 'menuData', 'inputValue'], () => payload);
  },
  [USER_DETAIL_INVESTMENT_CHECK_CLICK]: (state, {payload}) => {

    let selectIndexList = state.getIn(['investment', 'formCheckData', 'selectIndexList']).toJS();
    if (payload.type === 'radio') {
      selectIndexList = [payload.index];
    } else {
      let pos = selectIndexList.indexOf(payload.index);
      if (pos > -1) {
        selectIndexList = selectIndexList.filter((it, i) => i !== pos);
      } else {
        selectIndexList.push(payload.index);
      }
    }
    return state.updateIn(['investment', 'formCheckData', 'selectIndexList'], () => Immutable.fromJS(selectIndexList));
  },
  [USER_DETAIL_INVESTMENT_ERROR]: (state, {payload}) => {
    return state.updateIn(['investment', 'original', 'param'], ()=> payload);
  },
  [USER_DETAIL_INVESTMENT_SUCCESS]: (state, {payload}) => {
    console.log(payload);
    let investment = state.get('investment');
    investment = investment.set('original', payload);
    investment = investment.set('pagination', {
      total: payload.totalPage,
      page: (payload.param && payload.param.page)
    });
    return state.set('investment', investment);
  },
  [USER_DETAIL_CAPITAL_SUCCESS]: (state, {payload}) => {
    let capital = state.get('capital');
    capital = capital.set('original', payload);
    capital = capital.set('pagination', {
      total: payload.totalPage,
      page: (payload.param && payload.param.page)
    });
    return state.set('capital', capital);
  },
  [USER_DETAIL_CAPITAL_ERROR]: (state, {payload}) => {
    return state.updateIn(['capital', 'original', 'param'], ()=> payload);
  },
  [USER_DETAIL_CAPITAL_CHECK_CLICK]: (state, {payload}) => {
    let selectIndexList = state.getIn(['capital', 'formCheckData', 'selectIndexList']).toJS();
    if (payload.type === 'radio') {
      selectIndexList = [payload.index];
    } else {
      let pos = selectIndexList.indexOf(payload.index);
      if (pos > -1) {
        selectIndexList = selectIndexList.filter((it, i) => i !== pos);
      } else {
        selectIndexList.push(payload.index);
      }
    }
    return state.updateIn(['capital', 'formCheckData', 'selectIndexList'], () => Immutable.fromJS(selectIndexList));
  },
  [USER_DETAIL_CAPITAL_DATE_FOCUS_CHANGE]: (state, {payload}) => {

    let datePicker = state.getIn(['capital', 'datePicker']);
    let newDatePicker = datePicker.set('focusedInput', payload);
    return state.setIn(['capital', 'datePicker'], newDatePicker);
  },
  [USER_DETAIL_CAPITAL_DATE_CHANGE]: (state, {payload}) => {

    let datePicker = state.getIn(['capital', 'datePicker']);
    let newDatePicker = datePicker.merge(payload);
    return state.setIn(['capital', 'datePicker'], newDatePicker);
  },
  [USER_DETAIL_LOG_SUCCESS]: (state, {payload}) => {
    let log = state.get('log');
    log = log.set('original', payload);
    log = log.set('pagination', {
      total: payload.data.totalPage,
      page: (payload.param && payload.param.page)
    });
    return state.set('log', log);
  },
  [USER_DETAIL_LOG_ERROR]: (state, {payload}) => {
    return state.updateIn(['log', 'original', 'param'], ()=> payload);
  }
}, userDetailState);

export default reducer;