import React from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">

      <Header />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </Switch>

    </div>
  );
}

export default App;
