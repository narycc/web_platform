/**
 * Created by wenbinzhang on 2017/5/17.
 */

import React from 'react';

const Loading = ({show = false, message = '加载中...'}) => {
  let loadingDom = (
    <div className="text-center d-flex justify-content-center align-items-center" style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      width: '100%',
      zIndex: 5000,
    }}>
          <span style={{
            display: 'inline-block',
            padding: '10px 20px',
            height: '3rem',
            background: '#fff',
            borderRadius: '7px',
            backgroundClip: 'padding-box',
          }}>{message}</span>
    </div>
  );

  if (show) {
    return loadingDom;
  } else {
    return null;
  }
};

export default Loading;
