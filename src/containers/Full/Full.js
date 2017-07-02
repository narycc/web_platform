import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startUp, doLogout } from '../../reducers/globalReducer';

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Footer from '../../components/Footer/';

class Full extends Component {

  componentDidMount () {
    if(!this.props.userInfo || !this.props.userInfo.name){
      //this.props.startup();
    }
  }

  render () {
    return (
      <div className="app">
        <Header {...this.props}/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main" style={{width: '100%'}}>
            <div className="container-fluid p-0" style={{minHeight: '100%', height: '100%'}}>
              {this.props.children}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    userInfo: state.get('userInfo')
  }),
  (dispatch) => ({
    startup: () => {
      dispatch(startUp());
    },
    doLogout: () => {
      dispatch(doLogout());
    }
  })
)(Full);
