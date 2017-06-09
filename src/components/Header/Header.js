import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';

class Header extends Component {

  constructor (props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle (e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle (e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  mobileSidebarToggle (e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle (e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render () {

    let userInfo = this.props.userInfo;
    let name = '-';
    if (userInfo && typeof userInfo.get === 'function') {
      name = userInfo.get('name');
    }

    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" onClick={this.mobileSidebarToggle}
                type="button">&#9776;</button>
        <a className="navbar-brand" href="#"/>
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <a style={{display: 'none'}} className="nav-link navbar-toggler sidebar-toggler"
               onClick={this.sidebarToggle} href="#">&#9776;</a>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item d-md-down-none">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <a onClick={this.toggle} className="nav-link dropdown-toggle nav-link" data-toggle="dropdown" href="#"
                 role="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                <img src={'img/avatars/6.jpg'} alt="bingo" className="img-avatar"/>
                <span className="d-md-down-none">{name}</span>
              </a>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem header className="text-center"><strong>账号</strong></DropdownItem>
                <DropdownItem onClick={this.props.doLogout}><i className="fa fa-lock"/> 退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <li className="nav-item d-md-down-none"/>
        </ul>
      </header>
    )
  }
}

export default Header;
