/**
 * Created by wenbinzhang on 2017/5/11.
 */
import { call, put } from 'redux-saga/effects';
import { getUserInfoSuccess, logoutSuccess, noLogin } from '../actions/globalActions';
import { hashHistory } from 'react-router';

export function * startUp (api) {

  try {
    let {data} = yield call(function () {
      return api.post('/user/getUserInfo');
    });
    if (data && data.success && data.code === 0) {
      yield put(getUserInfoSuccess(data.data));
    } else {
      hashHistory.replace('/login');
    }
  } catch (e) {
    hashHistory.replace('/login');
  } finally {

  }

}

export function goLogin () {
  hashHistory.replace('/login');
}

export function * doLogout (api) {
  try {
    let {data} = yield call(function () {
      return api.post('/login/logout');
    });

    if (data && data.code === 0) {
      yield put(logoutSuccess());
      yield put(noLogin());
    }
  } catch (e) {

  } finally {

  }
}