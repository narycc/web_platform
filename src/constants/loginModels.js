/**
 * Created by wenbinzhang on 2017/5/10.
 */
import Immutable from 'immutable';

export const LoginState = Immutable.fromJS({
  mobile: '',
  password: '',
  errorTips: '',
});