/**
 * Created by wenbinzhang on 2017/5/25.
 */
import React from 'react';

const config = {
  list: [],
  selectedIndex: 0
};
const doNothing = () => {};

const NavTab = ({data = config, children, onNavClick = doNothing}) => {

  let selectedIndex = parseInt(data.selectedIndex, 10) || 0;
  if (data.list && data.list.length) {
    if (selectedIndex >= (data.list.length - 1)) {
      selectedIndex = (data.list.length - 1)
    } else if (selectedIndex < 0) {
      selectedIndex = 0;
    }
  } else {
    selectedIndex = 0;
  }

  let navList = data.list && data.list.map((item, index) => {
      return (
        <a
          href="#"
          key={item.name}
          onClick={e => {
            e.preventDefault();
            if (index !== selectedIndex) {
              onNavClick({
                item,
                index
              });
            }
          }}
          className={index === selectedIndex ? "nav-item nav-link active" : "nav-item nav-link"}
        >
          {item.name}
        </a>
      )
    });

  return (
    <div>
      <nav className="nav nav-tabs">
        {navList}
      </nav>
      <div className="tab-content">
        <div className="tab-pane fade show active">
          {children}
        </div>
      </div>
    </div>
  )
};

export default NavTab;