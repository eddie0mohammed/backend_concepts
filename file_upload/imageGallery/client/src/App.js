import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import Upload from './pages/uploadImage/Upload';
import Gallery from './pages/gallery/Gallery';

import {Switch, Route} from 'react-router-dom';

class App extends React.Component {

  render(){
    return (
      <div className="App">

        <Header />


        <Switch>
          <Route path='/' exact component={Gallery} />
          <Route path='/upload' exact component={Upload} />
        </Switch>
      
        
        

      </div>
    );
  }
  
}

export default App;
