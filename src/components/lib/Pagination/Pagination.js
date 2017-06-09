/**
 * Created by wenbinzhang on 2017/5/16.
 */

import React from 'react';

const fireOnPge = (page, onPage) => {
  if (typeof onPage === 'function') {
    onPage({page});
  }
};

const Pagination = ({
  total,
  page,
  next = <i className="fa fa-angle-right"/>,
  prev = <i className="fa fa-angle-left"/>,
  paginationClass = 'pagination justify-content-end',
  maxVisible = 10,
  onPage
}) => {

  total = parseInt(total, 10) || 0;
  page = parseInt(page, 10) || 1;
  page = page > 0 ? page : 1;

  if (page > total) {
    page = total;
  }
  if (total > 0) {

    maxVisible = maxVisible > 1 ? maxVisible : 1;

    let pageItems = [];
    let group = (Math.ceil(page / maxVisible) || 0);
    let start = (group - 1) * maxVisible + 1;
    let end = group * maxVisible + 1;

    let prevKey = start - 1;
    let nextKey = end;

    // 前一个
    let prevEnd = start - 1;
    prevEnd = prevEnd > 0 ? prevEnd : 1;
    if (prevKey === 0) {
      pageItems.push(
        <li key={'prev_' + prevEnd} className="page-item disabled">
          <span className="page-link">{prev}</span>
        </li>
      );
    } else {

      pageItems.push(
        <li key={'prev_' + prevEnd} className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={e => {
              e.preventDefault();
              fireOnPge(prevEnd, onPage);
            }}
          >
            {prev}
          </a>
        </li>
      );
    }

    // 中间数字
    for (let i = start; i < end; i++) {
      if (i !== page) {
        if (i <= total) {
          pageItems.push(
            <li key={i} className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={e => {
                  e.preventDefault();
                  fireOnPge(i, onPage);
                }}
              >
                {i}
              </a>
            </li>
          )
        }
      } else {

        pageItems.push(
          <li key={i} className="page-item active">
            <span className="page-link">
              {i}
            </span>
          </li>
        )
      }
    }

    // 后一个
    let nextStart = end;
    nextStart = nextStart > total ? total : nextStart;
    if (nextKey >= total) {
      pageItems.push(
        <li key={'next_' + nextStart} className="page-item disabled">
          <span className="page-link">{next}</span>
        </li>
      );
    } else {
      pageItems.push(
        <li key={'next_' + nextStart} className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={e => {
              e.preventDefault();
              fireOnPge(nextStart, onPage);
            }}
          >
            {next}
          </a>
        </li>
      );
    }

    return (
      <div className="row">
        <div className="col-12">
          <nav>
            <ul className={paginationClass}>
              {pageItems}
            </ul>
          </nav>
        </div>
      </div>
    )
  } else {
    return (
      <div className="row" style={{display: 'none'}}>
        <div className="col-12">
          <nav />
        </div>
      </div>
    );
  }

};

export default Pagination;