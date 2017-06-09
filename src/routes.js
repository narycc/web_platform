import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Containers
import Full from './containers/Full/'
import Simple from './containers/Simple/'

import Login from './views/Login'
import AppUser from './views/App/User'
import Employee from './views/Company/Employee'
import InvestmentsList from './views/Investments/List';
import InvestmentsDetail from './views/Investments/Detail';
import UserDetail from './views/App/UserDetail';
import Funds from './views/Investments/Funds';
import PendingPlans from './views/Plans/Pending';
import OnlinePlans from './views/Plans/Online';
import AddPlan from './views/Plans/Add';
import EditPlan from './views/Plans/Edit';

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Root" component={Full}>
      <IndexRoute component={AppUser}/>
      <Route path="app/" name="App">
        <IndexRoute component={AppUser}/>
        <Route path='user' name="AppUser" component={AppUser}/>
        <Route path='user_detail/:investor_id' name="UserDetail" component={UserDetail}/>
      </Route>
      <Route path="company/" name="Company">
        <IndexRoute component={Employee}/>
        <Route path='employee' name="Employee" component={Employee}/>
      </Route>

      <Route path="investments/" name="InvestmentsList">
        <IndexRoute component={InvestmentsList}/>
        <Route path='list' name="List" component={InvestmentsList}/>
        <Route path="detail/:order_no" component={InvestmentsDetail} />
      </Route>

      <Route path="funds/" name="Funds">
        <IndexRoute component={Funds}/>
        <Route path='list' name="FundsList" component={Funds}/>
      </Route>

      <Route path="plans/" name="Plans">
        <IndexRoute component={OnlinePlans}/>
        <Route path='add' name="AddPlan" component={AddPlan}/>
        <Route path='edit/:product_id' name="EditPlan" component={EditPlan}/>
        <Route path='list' name="OnlinePlansList" component={OnlinePlans}/>
        <Route path='list/pending' name="PendingPlansList" component={PendingPlans}/>
      </Route>

    </Route>

    <Route path="login" name="Login" component={Simple}>
      <IndexRoute component={Login}/>
    </Route>
  </Router>
);
