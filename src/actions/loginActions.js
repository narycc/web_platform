/**
 * Created by wenbinzhang on 2017/5/10.
 */
import {createAction} from 'redux-actions';
import {
  MOBILE_CHANGE,
  PWD_CHANGE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  ERROR_MESSAGE,
} from '../constants/loginActionTypes';

export const mobileChange = createAction(MOBILE_CHANGE);
export const pwdChange = createAction(PWD_CHANGE);
export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const errorMessage = createAction(ERROR_MESSAGE);


