/**
 * Created by wenbinzhang on 2017/5/27.
 */
import {put, call, select} from 'redux-saga/effects';
import {TimeStrGetDate} from '../Lib/Helper';
import bootbox from 'bootbox';

import {
  userDetailShowLoading,
  userDetailHideLoading,

  userDetailBaseSuccess,
  userDetailBaseError,

  userDetailSummarySuccess,
  userDetailSummaryError,

  userDetailInvestmentSuccess,
  userDetailInvestmentError,

  userDetailCapitalSuccess,
  userDetailCapitalError,

  userDetailLogSuccess,
  userDetailLogError

} from '../reducers/userDetailReducer';

export function * getUserBaseInfo(api) {

  yield put(userDetailShowLoading());
  const state = yield select();
  let param = {
    investor_id: state.getIn(['userDetail', 'investor_id']),
  };

  try {

    let {data: ret} = yield call(() => api.post('./investors/get', param));

    if (ret && ret.success && ret.code === 0) {
      yield put(userDetailBaseSuccess(ret));
    } else {
      yield put(userDetailBaseError(param));
    }

  } catch (e) {
    yield put(userDetailBaseError(e));
  } finally {
    yield put(userDetailHideLoading());
  }

}

export function * getUserSummaryInfo(api) {

  const state = yield select();
  let param = {
    investor_id: state.getIn(['userDetail', 'investor_id']),
  };

  try {

    let {data: ret} = yield call(() => api.post('./investors/get/account_property', param));

    if (ret && ret.success && ret.code === 0) {
      yield put(userDetailSummarySuccess(ret));
    } else {
      yield put(userDetailSummaryError(param));
    }

  } catch (e) {
    yield put(userDetailSummaryError(e));
  } finally {
  }
}

export function * getUserInvestment(api, {payload}) {

  const state = yield select();
  let investment = state.getIn(['userDetail', 'investment']).toJS();
  let formCheckData = investment.formCheckData;
  let selectCheck = formCheckData.list[(formCheckData.selectIndexList[0] || 0)];

  let param = {
    investor_id: state.getIn(['userDetail', 'investor_id']),
    trade_type: selectCheck.value,
    deal_no: investment.menuData.inputValue,
    page: 1,
    pageSize: 10
  };

  param = Object.assign({}, param, payload);

  try {

    let {data: ret} = yield call(() => api.post('./investors/get/invest_records', param));

    if (ret && ret.success && ret.code === 0) {
      yield put(userDetailInvestmentSuccess(ret));
    } else {
      yield put(userDetailInvestmentError(param));
    }

  } catch (e) {
    yield put(userDetailInvestmentError(e));
  } finally {
  }

}

export function * getUserCapital(api, {payload}) {

  const state = yield select();
  let capital = state.getIn(['userDetail', 'capital']).toJS();
  let datePicker = capital.datePicker;
  let formCheckData = capital.formCheckData;
  let selectCheck = formCheckData.list[(formCheckData.selectIndexList[0] || 0)];

  let param = {
    investor_id: state.getIn(['userDetail', 'investor_id']),
    fund_status: selectCheck.value,
    page: capital.pagination.page,
    pageSize: capital.pagination.total
  };
  if (datePicker.startDate) {
    Object.assign(param, {invest_create_from: TimeStrGetDate(datePicker.startDate.toJSON())});
  }
  if (datePicker.endDate) {
    Object.assign(param, {invest_create_to: TimeStrGetDate(datePicker.endDate.toJSON())});
  }
  param = Object.assign({}, param, payload);

  try {

    let {data: ret} = yield call(() => api.post('./investors/get/fund_records', param));

    if (ret && ret.success && ret.code === 0) {
      yield put(userDetailCapitalSuccess(ret));
    } else {
      yield put(userDetailCapitalError(param));
    }

  } catch (e) {
    yield put(userDetailCapitalError(e));
  } finally {
  }
}

export function * getUserLog(api, {payload}) {

  const state = yield select();
  let param = {
    investor_id: state.getIn(['userDetail', 'investor_id']),
  };

  param = Object.assign({}, param, payload);

  try {

    let {data: ret} = yield call(() => api.post('./investors/get/change_log', param));

    if (ret && ret.success && ret.code === 0) {
      yield put(userDetailLogSuccess(ret));
    } else {
      yield put(userDetailLogError(param));
    }

  } catch (e) {
    yield put(userDetailLogError(e));
  } finally {
  }
}

export function showLogErrorRemark(api, {payload}) {
  bootbox.alert({
    message: '失败原因：' + payload
  })
}