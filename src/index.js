import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import store from './store';

// 第三方库
import $ from 'jquery';
import './Lib/Modal';
import bootbox from 'bootbox';
import 'react-dates/lib/css/_datepicker.css';
window.$ = $;
window.bootbox = bootbox;

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={hashHistory}/>
  </Provider>,
  document.getElementById('root')
);
