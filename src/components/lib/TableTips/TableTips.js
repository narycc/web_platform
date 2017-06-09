/**
 * Created by wenbinzhang on 2017/5/15.
 */
import React from 'react';

const TableTips = ({tips, children}) => {

  return (
    <div className="row" style={{
      fontSize: '1rem'
    }}>
      <div className="col-12">
        <span>{tips}</span>
        {children}
      </div>
    </div>
  )
};

export default TableTips;