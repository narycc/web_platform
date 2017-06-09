/**
 * Created by wenbinzhang on 2017/5/10.
 */

import { createAction } from 'redux-actions';

export const START_UP = 'START_UP';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const NO_LOGIN = 'NO_LOGIN';
export const DO_LOGOUT = 'DO_LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const startUp = createAction(START_UP);
export const noLogin = createAction(NO_LOGIN);
export const doLogout = createAction(DO_LOGOUT);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const getUserInfoSuccess = createAction(GET_USER_INFO_SUCCESS);