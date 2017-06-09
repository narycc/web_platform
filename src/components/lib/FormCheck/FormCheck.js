/**
 * Created by wenbinzhang on 2017/5/31.
 */
import React from 'react';

const config = {
  checkType: 'radio',
  styleType: '',
  list: [],
  selectIndexList: [],
  label: '选择类型'
};

const doNothing = () => {
};

const FormCheck = ({state, onCheckClick = doNothing}) => {

  state = Object.assign({}, config, state);

  let length = state.list.length;
  let selectIndexList = state.selectIndexList.filter((item, index) => {
    return (index >= 0 && index < length);
  });

  let type = 'radio';
  if (state.checkType === 'checkbox') {
    type = 'checkbox';
  } else {
    selectIndexList = selectIndexList.slice(0, 1);
  }

  let checkList = (state.list.map((item, index) => {

      item.name = item.name || item.value;
      let inputName = 'input_name_' + (Date.now());
      let checkClass = 'form-check';
      if (state.styleType === 'inline') {
        checkClass += ' form-check-inline';
      }
      let checked = false;
      if (selectIndexList.indexOf(index) > -1) {
        checkClass += ' has-success';
        checked = true;
      }

      return (
        <div
          key={inputName + item.value}
          className={checkClass}
        >
          <label className="form-check-label">
            <input
              name={inputName}
              className="form-check-input"
              style={{marginRight: '5px'}}
              type={type}
              value={item.value}
              checked={checked}
              onChange={(e) => {
                e.preventDefault();
                onCheckClick({
                  index,
                  item,
                  type,
                });
              }}
            />
            {item.name}
          </label>
        </div>
      )
    })) || [];


  return (
    <div className="form-group row m-0" style={{paddingTop: '10px'}}>
      <label className="col-sm-12 col-md-2 col-form-label bold">{state.label}: </label>
      <div className="col-sm-12 col-md-10 custom-label">
        {checkList}
      </div>
    </div>
  )

};

export default FormCheck;

