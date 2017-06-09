/**
 * Created by zhongpingping on 2017/6/8.
 */

import React from 'react';

import Loading from '../lib/Loading';
import Card from '../lib/Card';
import Datetime from 'react-datetime';


const EditPlans = ({state, params,onDescribeProduct,onProductChange,onAmountChange,onStartTimeChange,onEndTimeChange,onSave,onStart}) => {



  return (
    <div className="row" style={{minHeight: '100%'}}>
      <div className="col-12" style={{position: 'relative'}}>
        <Loading show={state.get('isLoading')}/>
        <Card
          header={{
            text: <span className="font-green-sharp bold"><i className="fa fa-users"/> 更新理财计划 </span>
          }}
          className="animated fadeIn light"
        >
          <Card cardClassName="mb-3">


            <div className="row">
              <div className="col-sm-12 col-md-7">
                <div className="form-group row" style={{paddingTop: '10px'}}>
                  <label className="col-sm-12 col-md-3 col-form-label bold">产品类型: </label>
                  <div className="col-sm-12 col-md-6">
                    <select name="productType" className="form-control" value={state.get('product_template')} onChange={ e=> {
                      onProductChange(e.target.value);
                    }}>
                      <option value="1">智惠投（新手标）</option>
                      <option value="2">智惠投（集合计划1号）</option>
                      <option value="3">智惠投（集合计划2号）</option>
                      <option value="4">智惠投（集合计划3号）</option>
                      <option value="5">智惠投（集合计划4号）</option>
                      <option value="6">智月升</option>
                    </select>

                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-link btn-xs" onClick={onDescribeProduct}> 查看详情 </button>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-7">
                <div className="form-group row" style={{paddingTop: '10px'}}>
                  <label className="col-sm-12 col-md-3 col-form-label bold">配置参数: </label>
                  <div className="col-sm-12 col-md-9">

                    <div className="row form-group">
                      <label className="col-md-4"> 可预约额度（元）</label>
                      <div className="col-md-6">
                        <input type="text" value={state.get('amount')} onChange={ (e) =>{
                          onAmountChange(e.target.value);
                        }} className="form-control"/>
                      </div>
                    </div>

                    <div className="row">
                      <label className="col-md-3 bold"> 募集时间：</label>
                    </div>

                    <div className="row form-group">
                      <label className="col-md-4">计划发布时间：</label>
                      <Datetime
                        value={state.get('startTime')}
                        defaultValue={state.get('startTime')}
                        selectedDate={state.get('startTime')}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="H:m:s"
                        onChange={onStartTimeChange}
                        className="col-md-6"/>
                    </div>

                    <div className="row form-group">

                      <label className="col-md-4">截止投资时间：</label>
                      <Datetime
                        value={state.get('endTime')}
                        defaultValue={state.get('endTime')}
                        selectedDate={state.get('endTime')}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="H:m:s"
                        onChange={onEndTimeChange}
                        className="col-md-6"/>
                    </div>

                  </div>
                </div>
              </div>



            </div>


          </Card>


          <div className="text-center">
            <button className="btn btn-primary btn-md" onClick={onSave}>更新</button>
          </div>



        </Card>
      </div>
    </div>
  );
};


export default EditPlans;