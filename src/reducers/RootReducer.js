/**
 * Created by wenbinzhang on 2017/5/4.
 */
import { combineReducers } from 'redux-immutable';
import todoReducer from './todoReducer';
import loginReducer from './loginReducer';
import globalReducer from './globalReducer';
import employeeReducer from './employeeReducer';
import userReducer from './userReducer';
import userDetailReducer from './userDetailReducer';
import investmentsReducer from './investmentsReducer';
import investmentsDetailReducer from './investmentsDetailReducer';
import fundsReducer from './fundsReducer';
import onlinePlansReducer from './planOnlineReducer';
import pendingPlansReducer from './planPendingReducer';
import addPlanReducer from './planAddReducer';
import editPlanReducer from './planEditReducer';

const rootReducer = combineReducers({
  todos: todoReducer,
  loginData: loginReducer,
  userInfo: globalReducer,
  employee: employeeReducer,
  appUserData: userReducer,
  userDetail: userDetailReducer,
  investments : investmentsReducer,
  investmentsDetail : investmentsDetailReducer,
  funds : fundsReducer,
  onlinePlans: onlinePlansReducer,
  pendingPlans : pendingPlansReducer,
  addPlan : addPlanReducer,
  editPlan: editPlanReducer
});

export default rootReducer;