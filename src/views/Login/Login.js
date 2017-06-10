import { connect } from 'react-redux';
import { mobileChange, pwdChange, loginRequest, errorMessage } from '../../reducers/loginReducer';
import Login from '../../components/Login';

export default connect(
  (state) => ({
    loginData: state.get('loginData')
  }),
  (dispatch) => ({
    onMobileChange: (mobile) => {
      dispatch(mobileChange(mobile));
    },
    onPwdChange: (password) => {
      dispatch(pwdChange(password));
    },
    doLogin: (mobile, password) => {
      dispatch(loginRequest({mobile, password}));
    },
    onErrorMessage: (message) => {
      dispatch(errorMessage(message));
    }
  })
)(Login);



