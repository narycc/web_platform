/**
 * Created by zhongpingping on 2017/5/27.
 */
import React from 'react';
import {put, call, select} from 'redux-saga/effects';
import {
  investmentsSearchSuccess,
  investmentsSearchError,
  investmentsShowLoading,
  investmentsHideLoading,
} from '../reducers/investmentsReducer';

import {
  investmentsDetailHideLoading,
  investmentsDetailShowLoading,
  investmentsDetailSearchError,
  investmentsDetailSearchSuccess
} from '../reducers/investmentsDetailReducer';


import {
  fundsSearchSuccess,
  fundsSearchError,
  fundsShowLoading,
  fundsHideLoading,
} from '../reducers/fundsReducer';

export function * investmentsSearch(api, {payload}) {
  /*
   *  `search_type`:'1, 投资人姓名 2，投资人手机号 3，交易号',
   `search_value`:'',
   `product_type`:'产品类型',
   `trade_status`:'交易状态 1,预约中 2,预约失败 3,匹配中 4,回款中 5,已回款',
   `date_type`:'1,预约时间 2,起投时间 3, 到期时间',
   `from`:'',
   `to`:'',
   `page`:'1',
   `pageSize`:'20'
   * */


  // 开启loading
  yield put(investmentsShowLoading());

  const global_state = yield select();
  const state = global_state.get('investments');

  let menuList = state.get('menuList').toJS();

  let productData = state.get('productFormCheckData').toJS();
  let product_type = productData.list[productData.selectIndexList[0]].value;

  let statusData = state.get('statusFormCheckData').toJS();
  let trade_status = statusData.list[statusData.selectIndexList[0]].value;

  let datesData = state.get('typeDatePickerData').toJS();
  let date_type = datesData.menuList[datesData.selectMenuIndex].value;
  let from = datesData.datePicker.startDate;
  let to = datesData.datePicker.endDate;

  let min_amount = state.get('min_amount');
  let max_amount = state.get('max_amount');

  let _page = 1;
  if(payload && payload.page){
    _page = payload.page;
  }
  let param = {
    page: _page,
    pageSize: 3,
    search_type: menuList[state.get('selectMenuIndex')].value,
    search_value: state.get('inputValue'),
    product_type: product_type,
    trade_status: trade_status,
    date_type: date_type,
    from: from,
    to: to,
    min_amount: min_amount,
    max_amount: max_amount
  };


  // try 用于捕获api请求的错误
  try {

    let {data: ret} = yield call(() => api.post('./investments/list', param));

    if (ret && ret.success && ret.code === 0) {
      yield put(investmentsSearchSuccess(ret));
    } else {
      yield put(investmentsSearchError(ret));
    }
  } catch (e) {
    yield put(investmentsSearchError(e));
  } finally {
    // 关闭loading
    yield put(investmentsHideLoading());
  }
};

export function * investmentsDetailSearch(api, {payload}) {

  let param = {
    page: 1,
    pageSize: 3,
  };

  // 开启loading
  yield put(investmentsDetailShowLoading());

  // try 用于捕获api请求的错误
  try {
    let {data: ret} = yield call(function (opt) {
      param = Object.assign(param, opt);
      return api.post('./investments/get', param)
    }, payload);

    if (ret && ret.success && ret.code === 0) {
      yield put(investmentsDetailSearchSuccess(ret));
    } else {
      yield put(investmentsDetailSearchError(ret));
    }
  } catch (e) {
    yield put(investmentsDetailSearchError(e));
  } finally {
    // 关闭loading
    yield put(investmentsDetailHideLoading());
  }
}

export function * fundsSearch(api) {
  /*
   *
   * {
   `search_type`:'1, 投资人姓名 2，投资人手机号 3，交易号',
   `search_value`:'',
   `fund_status`:'资金动态 1,赎回 2,提前赎回 3,提现 4,充值 5,投资 6,退回',
   `min_amount`:'交易金额下限',
   `max_amount`:'交易金额上限'
   `create_time_from`:'发起时间from',
   `create_time_to`:'发起时间to',
   `page`:'1',
   `pageSize`:'20'
   }
   *
   * */

  // 开启loading
  yield put(fundsShowLoading());

  const global_state = yield select();
  const state = global_state.get('funds');

  let menuList = state.get('menuList').toJS();

  let statusData = state.get('statusFormCheckData').toJS();
  let fund_status = statusData.list[statusData.selectIndexList[0]].value;
  let min_amount = state.get('min_amount');
  let max_amount = state.get('max_amount');

  let datePicker = state.get('datePicker').toJS();
  let from = datePicker.startDate;
  let to = datePicker.endDate;

  let param = {
    page: 1,
    pageSize: 3,
    search_type: menuList[state.get('selectMenuIndex')].value,
    search_value: state.get('inputValue'),
    fund_status: fund_status,
    min_amount: min_amount,
    max_amount: max_amount,
    create_time_from: from,
    create_time_to: to
  };


  // try 用于捕获api请求的错误
  try {

    let {data: ret} = yield call(() => api.post('./funds/list', param));

    if (ret && ret.success && ret.code === 0) {
      yield put(fundsSearchSuccess(ret));
    } else {
      yield put(fundsSearchError(ret));
    }
  } catch (e) {
    yield put(fundsSearchError(e));
  } finally {
    // 关闭loading
    yield put(fundsHideLoading());
  }
};
