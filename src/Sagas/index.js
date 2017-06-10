/**
 * Created by zpp on 2017/06/10.
 */

import {takeLatest, put} from 'redux-saga/effects';
import {create} from '../Services/Api';

import {noLogin, START_UP, NO_LOGIN, DO_LOGOUT} from '../actions/globalActions';
import {LOGIN_REQUEST} from '../constants/loginActionTypes';
import {
  EMPLOYEE_SEARCH_REQUEST,
  EMPLOYEE_ADD_REQUEST,
  EMPLOYEE_DELETE_REQUEST,
} from '../reducers/employeeReducer';

import {INVESTMENTS_SEARCH_REQUEST} from '../reducers/investmentsReducer';
import {INVESTMENTS_DETAIL_SEARCH_REQUEST} from '../reducers/investmentsDetailReducer';
import {FUNDS_SEARCH_REQUEST} from '../reducers/fundsReducer';
import {PRODUCT_DETAIL_REQUEST} from '../reducers/planAddReducer';
import {ONLINE_PLANS_SEARCH_REQUEST} from '../reducers/planOnlineReducer';
import {PENDING_PLANS_SEARCH_REQUEST,PENDING_PLANS_DELETE_REQUEST} from '../reducers/planPendingReducer';
import {CREATE_PLAN_REQUEST} from '../reducers/planAddReducer';
import {UPDATE_PLAN_REQUEST,EDIT_PLAN_INFO_REQUEST} from '../reducers/planEditReducer';

import {USER_SEARCH_REQUEST} from '../reducers/userReducer';
import {
  USER_DETAIL_BASE_REQUEST,
  USER_DETAIL_SUMMARY_REQUEST,
  USER_DETAIL_INVESTMENT_REQUEST,
  USER_DETAIL_CAPITAL_REQUEST,
  USER_DETAIL_LOG_REQUEST,
  USER_DETAIL_LOG_REMARK
} from '../reducers/userDetailReducer';


import {startUp, goLogin, doLogout} from './globalSagas';
import {login} from './LoginSagas';
import {employeeSearch, employeeAddUser, employeeDeleteUser} from './employeeSagas';
import {investmentsSearch, investmentsDetailSearch,fundsSearch} from './investmentsSagas';
import {describeProduct,onlinePlansSearch,pendingPlansSearch,createPlan,updatePlan,editProductInfo,deletePlan} from './plansSagas';

import {appUserSearch} from './userSagas';
import {
  getUserBaseInfo,
  getUserSummaryInfo,
  getUserInvestment,
  getUserCapital,
  getUserLog,
  showLogErrorRemark
} from './userDetailSagas';

const api = create();

api.addResponseTransform(rsp => {
  if (rsp && rsp.ok && rsp.data && rsp.data.code === 0) {
    rsp.data['success'] = true;
  } else {
    if (typeof rsp.data === 'object') {
      rsp.data = rsp.data || {};
    } else {
      rsp.data = {
        message: rsp.data
      };
    }
    rsp.data['success'] = false;
    rsp.data['code'] = rsp.ok ? (rsp.data && rsp.data.code) : rsp.status;
    rsp.data['message'] = rsp.ok ? rsp.data.message : rsp.problem;
  }

  // 将请求参数带到 rsp.data.data 里面 用于页面的统一错误提示
  rsp.data['param'] = JSON.parse(rsp.config.data);

  if (rsp && rsp.ok && rsp.data && rsp.data.code === -1) {
    put(noLogin);
  }

});

export default function * root() {
  yield [
    takeLatest(START_UP, startUp, api),
    takeLatest(NO_LOGIN, goLogin),
    takeLatest(DO_LOGOUT, doLogout, api),
    takeLatest(LOGIN_REQUEST, login, api),
    takeLatest(EMPLOYEE_SEARCH_REQUEST, employeeSearch, api),
    takeLatest(EMPLOYEE_ADD_REQUEST, employeeAddUser, api),
    takeLatest(EMPLOYEE_DELETE_REQUEST, employeeDeleteUser, api),
    takeLatest(USER_SEARCH_REQUEST, appUserSearch, api),
    takeLatest(USER_DETAIL_BASE_REQUEST, getUserBaseInfo, api),
    takeLatest(USER_DETAIL_SUMMARY_REQUEST, getUserSummaryInfo, api),
    takeLatest(USER_DETAIL_INVESTMENT_REQUEST, getUserInvestment, api),
    takeLatest(USER_DETAIL_CAPITAL_REQUEST, getUserCapital, api),
    takeLatest(USER_DETAIL_LOG_REQUEST, getUserLog, api),
    takeLatest(USER_DETAIL_LOG_REMARK,showLogErrorRemark,api),
    takeLatest(INVESTMENTS_DETAIL_SEARCH_REQUEST, investmentsDetailSearch, api),
    takeLatest(INVESTMENTS_SEARCH_REQUEST, investmentsSearch, api),
    takeLatest(FUNDS_SEARCH_REQUEST,fundsSearch,api),
    takeLatest(PRODUCT_DETAIL_REQUEST,describeProduct,api),
    takeLatest(ONLINE_PLANS_SEARCH_REQUEST,onlinePlansSearch,api),
    takeLatest(PENDING_PLANS_SEARCH_REQUEST,pendingPlansSearch,api),
    takeLatest(PENDING_PLANS_DELETE_REQUEST,deletePlan,api),
    takeLatest(CREATE_PLAN_REQUEST,createPlan,api),
    takeLatest(UPDATE_PLAN_REQUEST,updatePlan,api),
    takeLatest(EDIT_PLAN_INFO_REQUEST,editProductInfo,api),

  ]
}