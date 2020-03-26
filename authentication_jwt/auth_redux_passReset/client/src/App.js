import React from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';

import * as authActionCreators from './Redux/Actions/AuthActionCreators';


class App extends React.Component {

  async componentDidMount(){
    await this.props.getCurrentUser(this.props.token);
  }

  render(){

    return (
      <div className="App">
  
        <Header />
  
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path='/forgotPassword' exact component={ForgotPassword} />
          <Route path='/resetPassword/:token' exact component={ResetPassword} />
        </Switch>
  
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: (token) => dispatch(authActionCreators.getCurrentUser(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
