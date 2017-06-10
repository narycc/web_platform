/**
 * Created by zpp on 2017/06/10.
 */
import { handleActions,createAction } from 'redux-actions';
import Immutable from 'immutable';

export const MOBILE_CHANGE = 'MOBILE_CHANGE';
export const PWD_CHANGE = 'PWD_CHANGE';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const mobileChange = createAction(MOBILE_CHANGE);
export const pwdChange = createAction(PWD_CHANGE);
export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const errorMessage = createAction(ERROR_MESSAGE);


export const LoginState = Immutable.fromJS({
  mobile: '',
  password: '',
  errorTips: '',
});

const loginReducer = handleActions({
  [MOBILE_CHANGE]: (state, {payload}) => {
    return state.set('mobile', payload);
  },
  [PWD_CHANGE]: (state, {payload}) => {
    return state.set('password', payload);
  },
  [ERROR_MESSAGE]: (state, {payload}) => {
    return state.set('errorTips', payload);
  },
  [LOGIN_SUCCESS]: () => Immutable.fromJS({mobile: '', password: '', errorTips: ''})
}, LoginState);

export default loginReducer;