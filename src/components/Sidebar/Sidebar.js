import React, { Component } from 'react';
import { Link } from 'react-router';

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {

    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="divider" />
            <li className="nav-item">
              <Link to={'/app/user'} className="nav-link" activeClassName="active">
                <i className="fa fa-user" /> 投资人管理
              </Link>
            </li>

            <li className="nav-title">
              投资管理
            </li>
            <li className="nav-item">
              <Link to={'/app/deal'} className="nav-link" activeClassName="active">
                <i className="fa fa-search" /> 平台交易明细
              </Link>
            </li>

            <li className="divider" />
            <li className="nav-title"> 平台交易信息 </li>
            <li className="nav-item">
              <Link to={'/investments/list'} className="nav-link" activeClassName="active">
                <i className="fa fa-list" /> 平台投资交易
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/funds/list'} className="nav-link" activeClassName="active">
                <i className="fa fa-list" /> 平台资金流水
              </Link>
            </li>

            <li className="divider" />
            <li className="nav-title"> 理财计划管理 </li>
            <li className="nav-item">
              <Link to={'/plans/add'} className="nav-link" activeClassName="active">
                <i className="fa fa-list" /> 发布理财计划
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/plans/list/pending'} className="nav-link" activeClassName="active">
                <i className="fa fa-list" /> 待上线计划
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/plans/list'} className="nav-link" activeClassName="active">
                <i className="fa fa-list" /> 已上线计划
              </Link>
            </li>
            <li className="divider" />
            <li className="divider" />

            <li className="nav-title">
              公司相关
            </li>
            <li className="nav-item">
              <Link to={'/company/employee'} className="nav-link" activeClassName="active">
                <i className="fa fa-users" /> 员工管理
              </Link>
            </li>

          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
