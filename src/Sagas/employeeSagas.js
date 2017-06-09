/**
 * Created by wenbinzhang on 2017/5/16.
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { put, call } from 'redux-saga/effects';
import {
  employeeSearchRequest,
  employeeSearchSuccess,
  employeeSearchError,
  employeeShowLoading,
  employeeHideLoading,
} from '../reducers/employeeReducer';

import bootbox from 'bootbox';
import $ from 'jquery';

export function * employeeSearch (api, {payload}) {

  let param = {
    page: 1,
    pageSize: 20,
  };

  // 开启loading
  yield put(employeeShowLoading());

  // try 用于捕获api请求的错误
  try {
    let {data:ret} = yield call(function (opt) {
      param = Object.assign(param, opt);
      return api.post('./user/list', param)
    }, payload);

    if (ret && ret.success && ret.code === 0) {
      yield put(employeeSearchSuccess(ret));
    } else {
      yield put(employeeSearchError(ret));
    }
  } catch (e) {
    yield put(employeeSearchError(e));
  } finally {
    // 关闭loading
    yield put(employeeHideLoading());
  }
}

export function * employeeAddUser (api) {

  let param;

  try {

    let form = (
      <form onSubmit={() => {
        return false;
      }}>
        <div className="form-group">
          <label htmlFor="js_id_employee_input_name">员工姓名</label>
          <input
            className="form-control"
            type="text"
            id="js_id_employee_input_name"
            placeholder="员工姓名"
          />
        </div>
        <div className="form-group">
          <label htmlFor="js_id_employee_input_mobile">员工手机号</label>
          <input
            className="form-control"
            type="text"
            id="js_id_employee_input_mobile"
            placeholder="员工手机号"
          />
        </div>
      </form>
    );

    param = yield call(function () {
      return new Promise((resolve, reject) => {
        bootbox.dialog({
          title: '添加员工',
          message: ReactDOMServer.renderToString(form),
          closeButton: false,
          buttons: {
            cancel: {
              label: '取消',
              className: 'btn-default',
              callback: function () {
                resolve(null);
              }
            },
            success: {
              label: '添加',
              className: 'btn-success',
              callback: function () {
                let name = $.trim($('#js_id_employee_input_name').val());

                if (!name) {
                  bootbox.alert('请输入员工姓名');
                  return false;
                }

                let mobile = $.trim($('#js_id_employee_input_mobile').val());
                if (!mobile) {
                  bootbox.alert('请输入员工手机号');
                  return false;
                }
                resolve({mobile, name});
              }
            }
          }
        });
      })
    });

    if (param && param.mobile && param.name) {

      yield put(employeeShowLoading());
      let {data: ret} = yield call(function (p) {
        return api.post('./user/create', p)
      }, param);

      if (ret && ret.success && ret.code === 0) {
        bootbox.alert('添加员工 ' + param.name + '[' + param.mobile + '] 成功');
        yield put(employeeSearchRequest({page: 1}));
      } else {
        bootbox.alert('添加员工 ' + param.name + '[' + param.mobile + '] 失败');
      }
    }
  } catch (e) {
    let tips;
    if (param && param.name) {
      tips = '添加员工 ' + param.name + '[' + param.mobile + '] 失败';
    } else {
      tips = '添加员工失败';
    }
    bootbox.alert(tips);
  } finally {
    yield put(employeeHideLoading());
  }

}

export function * employeeDeleteUser (api, {payload}) {

  let param;
  try {
    param = yield call(function (p) {
      return new Promise((resolve, reject) => {
        bootbox.dialog({
          title: '删除员工',
          message: '是否删除员工 ' + p.name + '[' + p.mobile + ']',
          closeButton: false,
          buttons: {
            cancel: {
              label: '取消',
              className: 'btn-default',
              callback: function () {
                resolve({delete: false});
              }
            },
            success: {
              label: '删除',
              className: 'btn-danger',
              callback: function () {
                resolve({delete: true});
              }
            }
          }
        });
      });
    }, payload);

    if (param && param.delete) {
      yield put(employeeShowLoading());
      let {data: ret} = yield call(function (p) {
        return api.post('/user/delete', p);
      }, payload);

      if (ret && ret.code === 0) {
        bootbox.alert('删除员工 ' + payload.name + '[' + payload.mobile + '] 成功');
        yield put(employeeSearchRequest());
      } else {
        bootbox.alert('删除员工 ' + payload.name + '[' + payload.mobile + '] 失败');
      }
    }
  } catch (e) {
    bootbox.alert('删除员工 ' + payload.name + '[' + payload.mobile + '] 失败');
  } finally {
    yield put(employeeHideLoading());
  }

}