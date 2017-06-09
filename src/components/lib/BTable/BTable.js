/**
 * Created by wenbinzhang on 2017/5/16.
 */

import React from 'react';

const BTable = ({
  head = [],
  rows = [],
  empty = {
    title: '无数据',
    message: '列表数据为空'
  }
}) => {

  let itemRows;
  if (rows.length) {
    itemRows = rows.map((row, index) => {
      let tds = row.map((td, i) => {
        return <td key={i}>{td || '-'}</td>
      });
      return (
        <tr key={index}>
          {tds}
        </tr>
      );
    });
  } else {
    itemRows = (
      <tr>
        <td colSpan={12}>
          <div className="note note-warning">
            <h4 className="block">{empty.title}</h4>
            <p>{empty.message}</p>
          </div>
        </td>
      </tr>
    )
  }

  return (

    <div className="row">
      <div className="col-12">
        <table className="table table-striped table-bordered table-hover text-center table-responsive" style={{
          background: '#fff'
        }}>
          <thead>
          <tr>
            {
              function () {
                return head.map(i => {
                  return <th key={i} className="text-center">{i}</th>
                })
              }()
            }
          </tr>
          </thead>
          <tbody>
          {itemRows}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default BTable;