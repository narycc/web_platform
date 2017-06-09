/**
 * Created by wenbinzhang on 2017/5/11.
 */
import { handleActions } from 'redux-actions';
import { globalState } from '../constants/globalModels';
import { GET_USER_INFO_SUCCESS, LOGOUT_SUCCESS } from '../actions/globalActions';

const globalReducer = handleActions({
  [GET_USER_INFO_SUCCESS]: (state, {payload}) => {
    return state.merge(payload);
  },
  [LOGOUT_SUCCESS]: () => {
    return globalState;
  }
}, globalState);

export default globalReducer;
