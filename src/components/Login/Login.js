/**
 * Created by wenbinzhang on 2017/5/10.
 */
import React from 'react';

const Login = ({loginData, onMobileChange, onPwdChange, doLogin, onErrorMessage}) => {
  let mobile = loginData.get('mobile');
  let password = loginData.get('password');
  let errorTips = loginData.get('errorTips');

  /*{/!*onInput={e => {
   e.preventDefault();
   onMobileChange(e.target.value);
   }}*!/}

  {/!*onInput={e => {
   e.preventDefault();
   onPwdChange(e.target.value);
   }}*!/}*/

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card-group mb-0">
            <div className="card p-4">
              <div className="card-block">
                <h1>登录</h1>
                {errorTips?<div className="alert alert-danger">{errorTips}</div>:''}
                <div className="input-group mb-3">
                    <span className="input-group-addon">
                      <i className="icon-user"/>
                    </span>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="手机号"
                    value={mobile}
                    onChange={e => {
                      e.preventDefault();
                      onMobileChange(e.target.value);
                    }}
                  />
                </div>
                <div className="input-group mb-4">
                    <span className="input-group-addon">
                      <i className="icon-lock"/>
                    </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="密码"
                    value={password}
                    onChange={e => {
                      e.preventDefault();
                      onPwdChange(e.target.value);
                    }}
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-primary px-4"
                      onClick={e => {
                        if (password && password.trim() && mobile && mobile.trim()) {
                          doLogin(mobile.trim(), password.trim());
                        } else {
                          onErrorMessage('请输入账号和密码！');
                        }
                      }}
                    >登录
                    </button>
                  </div>
                  <div className="col-6 text-right">
                    <button type="button" className="btn btn-link px-0">忘记密码?</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;