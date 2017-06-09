/**
 * Created by wenbinzhang on 2017/5/15.
 */
import React from 'react';

const config = {
  initData: {
    menuList: [],
    selectMenuIndex: 0,
    isMenuOpen: false,
    placeholder: '',
    searchBtn: {
      name: '搜索',
      className: 'btn btn-success'
    },
    inputValue: ''
  }
};

const doNothing = () => {
};

const TypeSearch = ({initData, onSearch = doNothing, onChange = doNothing, onMenuClick = doNothing, onMenuToggleClick}) => {

  let data = Object.assign({}, config.initData, initData);
  let menuList = data.menuList;

  if (!menuList || menuList.length === 0) {
    return (<div>TypeSearch init data error: {JSON.stringify(data)}</div>);
  }

  let selectMenuIndex = data.selectMenuIndex;
  let selectMenu = menuList[selectMenuIndex];
  if (!selectMenu) {
    selectMenu = menuList[0];
  }

  let inputMenuClass = data.isMenuOpen ? 'input-group-btn show' : 'input-group-btn';

  let menuBtnClass = 'btn btn-secondary';
  if(menuList.length > 1){
    menuBtnClass += ' dropdown-toggle';
  }

  return (
    <div className="input-group">
      <div className={inputMenuClass}>
        <button
          type="button"
          className={menuBtnClass}
          onClick={onMenuToggleClick}
        >
          {selectMenu.name}
        </button>
        <div className="dropdown-menu">
          {
            function () {
              return menuList.map(item => {
                return (
                  <a
                    className="dropdown-item"
                    href="#"
                    key={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      onMenuClick(item);
                    }}
                  >
                    {item.name}
                  </a>
                )
              });
            }()
          }
        </div>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder={data.placeholder}
        value={data.inputValue}
        onKeyUp={e => {
          if (e.keyCode === 13) {
            onSearch({
              searchValue: data.inputValue.trim(),
              searchType: selectMenu.type
            });
          }
        }}
        onChange={e => {
          e.preventDefault();
          onChange(e.target.value);
        }}
      />
      <span className="input-group-btn">
        <button
          className={data.searchBtn.className}
          type="button"
          onClick={() => {
            onSearch({
              searchValue: data.inputValue.trim(),
              searchType: selectMenu.type
            });
          }}
        >
          {data.searchBtn.name}
        </button>
      </span>
    </div>
  )
};

export default TypeSearch;