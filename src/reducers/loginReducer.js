/**
 * Created by wenbinzhang on 2017/5/10.
 */
import { handleActions } from 'redux-actions';
import { LoginState } from '../constants/loginModels';
import { MOBILE_CHANGE, PWD_CHANGE, LOGIN_SUCCESS, ERROR_MESSAGE } from '../constants/loginActionTypes';
import Immutable from 'immutable';

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