/**
 * Created by wenbinzhang on 2017/5/24.
 */
import { put, call } from 'redux-saga/effects';


import {
  userShowLoading,
  userHideLoading,
  userSearchSuccess,
  userSearchError,
} from '../reducers/userReducer';

export function * appUserSearch (api, {payload}) {
  let param = {
    page: 1,
    pageSize: 20,
  };

  yield put(userShowLoading());

  try {

    let {data: ret} = yield call(function (opt) {
      param = Object.assign(param, opt);
      return api.post('./investors/list', param);
    }, payload);

    if (ret && ret.success && ret.code === 0) {
      yield put(userSearchSuccess(ret));
    } else {
      yield put(userSearchError(param));
    }

  } catch (e) {
    yield put(userSearchError(param));
  } finally {
    yield put(userHideLoading());
  }


}