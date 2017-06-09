/**
 * Created by zhongpingping on 2017/6/2.
 * 待上线的理财计划跟已上线的理财计划字段展示不完全一致，请求参数也不完全一致。
 *
 * 还差修改，删除，查看的页面，同时还有对应的交互界面。还是先把展示给弄出来吧
 *
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {put, call, select} from 'redux-saga/effects';
import Immutable from 'immutable';

import {
  onlinePlansSearchSuccess,
  onlinePlansSearchError,
  onlinePlansShowLoading,
  onlinePlansHideLoading,
} from '../reducers/planOnlineReducer';

import {
  pendingPlansSearchSuccess,
  pendingPlansSearchError,
  pendingPlansShowLoading,
  pendingPlansHideLoading,
  pendingPlansSearchRequest
} from '../reducers/planPendingReducer';

import {
  addPlansHideLoading,
  addPlansShowLoading,
  addPlanError
} from '../reducers/planAddReducer';

import {
  editPlansHideLoading,
  editPlansShowLoading,
  editProductInfoSuccess,
  editProductInfoError
} from '../reducers/planEditReducer';

import bootbox from 'bootbox';

export function * pendingPlansSearch(api,{payload}) {
  /*
   `search_type`:'1, 产品类型 product_type 2，产品期数 id',
   `search_value`:'',
   `from`:'募集开始时间 start_time',
   `to`:'募集结束时间 end_time',
   `page`:'1',
   `pageSize`:'20'
   * */

  // 开启loading
  yield put(pendingPlansShowLoading());

  const global_state = yield select();
  const state = global_state.get('pendingPlans');

  let menuList = state.get('menuList').toJS();


  let datePicker = state.get('datePicker').toJS();
  let from = datePicker.startDate;
  let to = datePicker.endDate;

  let _page = 1;
  if(payload && payload.page){
    _page = payload.page;
  }

  let param = {
    type:'pending',
    page: _page,
    pageSize: 3,
    search_type: menuList[state.get('selectMenuIndex')].type,
    search_value: state.get('inputValue'),
    from: from,
    to: to
  };


  // try 用于捕获api请求的错误
  try {

    let {data: ret} = yield call(() => api.post('./plans/list', param));

    if (ret && ret.success && ret.code === 0) {
      yield put(pendingPlansSearchSuccess(ret));
    } else {
      yield put(pendingPlansSearchError(ret));
    }
  } catch (e) {
    yield put(pendingPlansSearchError(e));
  } finally {
    // 关闭loading
    yield put(pendingPlansHideLoading());
  }
};

export function * onlinePlansSearch(api,{payload}) {
  /*
   `search_type`:'1, 产品类型 product_type 2，产品期数 id',
   `search_value`:'',
   `status`:'计划状态  1,募集中 2,已结束 ',
   `from`:'募集开始时间 start_time',
   `to`:'募集结束时间 end_time',
   `page`:'1',
   `pageSize`:'20'
   * */

  // 开启loading
  yield put(onlinePlansShowLoading());

  const global_state = yield select();
  const state = global_state.get('onlinePlans');

  let menuList = state.get('menuList').toJS();

  let statusData = state.get('statusFormCheckData').toJS();
  let status = statusData.list[statusData.selectIndexList[0]].value;

  let datePicker = state.get('datePicker').toJS();
  let from = datePicker.startDate;
  let to = datePicker.endDate;

  let _page = 1;
  if(payload && payload.page){
    _page = payload.page;
  }

  let param = {
    type:'online',
    page: _page,
    pageSize: 3,
    search_type: menuList[state.get('selectMenuIndex')].type,
    search_value: state.get('inputValue'),
    status: status,
    from: from,
    to: to
  };


  // try 用于捕获api请求的错误
  try {

    let {data: ret} = yield call(() => api.post('./plans/list', param));

    if (ret && ret.success && ret.code === 0) {
      yield put(onlinePlansSearchSuccess(ret));
    } else {
      yield put(onlinePlansSearchError(ret));
    }
  } catch (e) {
    yield put(onlinePlansSearchError(e));
  } finally {
    // 关闭loading
    yield put(onlinePlansHideLoading());
  }
};

function BootBoxInner(props){
  return (
    <div>
      {
        props.list && props.list.map( (item,index) =>{
          return (
            <dl key={index}>
              <dt>{item.key}</dt>
              <dd>{item.value}</dd>
            </dl>
          )
        })
      }
    </div>
  );
}
export function * describeProduct(api) {

  let param = {
    product_template : 3
  };

  let form = (<div></div>);
  try {


    let {data: ret} = yield call(function (p) {
      return api.post('./product/detail', p)
    }, param);

    if(ret.code === 0 && ret.data && ret.data.list && ret.data.list.length > 0){
      let list = ret.data.list;

      form = (
        <div>
          <BootBoxInner list={list}/>
        </div>

      );


    }


    yield call(function () {
      return new Promise((resolve, reject) => {
        bootbox.dialog({
          title: '产品详情',
          message: ReactDOMServer.renderToString(form),
          closeButton: false,
          buttons: {
            cancel: {
              label: '确定',
              className: 'btn-default',
              callback: function () {
                resolve(null);
              }
            },

          }
        });
      })
    });


  } catch (e) {
    let tips = '报错';

    bootbox.alert(tips);
  } finally {
    console.log('finally');
  }
}

/* 创建新的理财计划，创建成功之后跳转到列表页 */
export function * createPlan(api){

  // 开启loading
  yield put(addPlansShowLoading());

  const global_state = yield select();
  const state = global_state.get('addPlan');

  let productTemplate = state.get('product_template');
  let startTime = state.get('startTime');
  let totalAmt = state.get('amount');
  let endTime = state.get('endTime');


  let param = {
    "productTemplate": productTemplate,
    "startTime": startTime,
    "totalAmt": totalAmt,
    "endTime": endTime
  };


  // try 用于捕获api请求的错误
  try {

    let {data: ret} = yield call(() => api.post('./plans/create', param));

    yield put(addPlansHideLoading());

    if (ret && ret.success && ret.code === 0) {

      /// 跳转，到列表页，或者弹出信息；
      let form = (<div><p>创建产品成功</p></div>);
      yield call(function () {
        return new Promise((resolve, reject) => {
          bootbox.dialog({
            title: '产品详情',
            message: ReactDOMServer.renderToString(form),
            closeButton: false,
            buttons: {
              cancel: {
                label: '确定',
                className: 'btn-default',
                callback: function () {
                  window.location.hash = '/plans/list/pending';
                }
              },

            }
          });
        })
      });

    } else {

      // 报错，停留在本页面
      bootbox.alert('创建失败：' + ret.message);
    }
  } catch (e) {

    // 报错，停留在本页面
    bootbox.alert('创建失败：' + JSON.stringify(e));

  }

}

export function * updatePlan(api) {
  // 开启loading
  yield put(editPlansShowLoading());

  const global_state = yield select();
  const state = global_state.get('editPlan');

  let product_id = state.get('product_id');
  let productTemplate = state.get('product_template');
  let startTime = state.get('startTime');
  let totalAmt = state.get('amount');
  let endTime = state.get('endTime');


  let param = {
    "product_id": product_id,
    "productTemplate": productTemplate,
    "startTime": startTime,
    "totalAmt": totalAmt,
    "endTime": endTime
  };


  // try 用于捕获api请求的错误
  try {

    let {data: ret} = yield call(() => api.post('./plans/update', param));

    yield put(editPlansHideLoading());

    if (ret && ret.success && ret.code === 0) {

      /// 跳转，到列表页，或者弹出信息；
      let form = (<div><p>更新产品成功</p></div>);
      yield call(function () {
        return new Promise((resolve, reject) => {
          bootbox.dialog({
            title: '产品详情',
            message: ReactDOMServer.renderToString(form),
            closeButton: false,
            buttons: {
              cancel: {
                label: '确定',
                className: 'btn-default',
                callback: function () {
                  window.location.hash = '/plans/list/pending';
                }
              },

            }
          });
        })
      });

    } else {

      // 报错，停留在本页面
      bootbox.alert('更新失败：' + ret.message,function(){
        console.log('bootbox 回调' );
      });
    }
  } catch (e) {

    // 报错，停留在本页面
    bootbox.alert('更新失败：' + JSON.stringify(e));

  }
}

export function * editProductInfo(api,{payload}) {

  // 要等待接口返回产品信息
  yield put(editPlansShowLoading());
  try {

    let {data: ret} = yield call(() => api.post('./plans/product', payload));

    if (ret && ret.success && ret.code === 0) {
      yield put(editProductInfoSuccess(ret.data));
    } else {
      yield put(editProductInfoError(ret));
    }
  } catch (e) {
    yield put(editProductInfoError(e));
  } finally {
    // 关闭loading
    yield put(editPlansHideLoading());
  }
}

export function * deletePlan(api,{payload}){
  // 开启loading


  const global_state = yield select();
  const state = global_state.get('pendingPlans');
  const list = state.getIn(['original','data','list']).toJS() || [];

  if(list.length > 0){
    let thisItem = {};
    list.forEach((item,index)=>{
      if(item.id === payload){
        thisItem = item;
      }
    });

    if(thisItem && thisItem.id === payload ){
      let param = {
        product_id : payload
      };

      let form = (
        <div>
          <p>产品期数: {thisItem.id}</p>
          <p>产品类型：{thisItem.product_title}</p>
          <p>募集时间：{thisItem.raise_from_time} - {thisItem.raise_to_time}</p>
          <p>理财计划编辑者：{thisItem.name}</p>
        </div>
      );

      let bootBoxPromise = yield call(function(){
        return new Promise( (resolve,reject) =>{
          bootbox.dialog({
            title: '确定删除理财计划吗？',
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
                label: '删除',
                className: 'btn-success',
                callback: function () {
                  // try 用于捕获api请求的错误
                  resolve({ready:true});
                }
              }
            }
          });

        })
      });


      if(bootBoxPromise && bootBoxPromise.ready){
        try {

          yield put(pendingPlansShowLoading());

          let {data: ret} = yield call(() => api.post('./plans/delete', param));

          if (ret && ret.success && ret.code === 0) {

            yield put(pendingPlansSearchRequest(state.get('original').get('param')));

          } else {
            yield put(pendingPlansSearchError(ret));
          }
        } catch (e) {
          yield put(pendingPlansSearchError(e));
        } finally {
          // 关闭loading
          yield put(pendingPlansHideLoading());
        }
      }
    }

  }





}