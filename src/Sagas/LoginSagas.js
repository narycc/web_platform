/**
 * Created by wenbinzhang on 2017/5/10.
 */

import { put, call } from 'redux-saga/effects';
import { errorMessage, loginSuccess } from '../actions/loginActions';
import { hashHistory } from 'react-router';

export function * login (api, {payload}) {

  try{
    let {data} = yield call(function (param) {
      return api.post('/login/login', param);
    }, payload);
    if (data && data.success && data.code === 0) {
      yield put(loginSuccess());
      hashHistory.replace('/');
    } else {
      yield put(errorMessage(data.message));
    }
  }catch (e) {
    yield put(errorMessage('网络错误！'));
  } finally {

  }

}