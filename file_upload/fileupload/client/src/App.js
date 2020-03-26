import React from 'react';
import axios from 'axios';


import './App.css';

class App extends React.Component {


  state = {
    username: '',
    email: '',
    password: '',
    selectedFile: null,
    error: ''
  }

  fileSelectedHandler = (e) => {
    this.setState({
      selectedFile: e.target.files[0]
    });
  }

  formSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    //send data from form
    const formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('image', this.state.selectedFile, this.state.selectedFile.name);

    try{
      
      const res = await axios.post('http://localhost:8080/user', formData, config);
      console.log(res.data);
  
      console.log('success');

    }catch(err){
      console.log(err);
      this.setState({
        error: 'Invalid file'
      })
    }

  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render(){

  
    return (
      <div className="App">

        
        <form onSubmit={this.formSubmit}>
          <h1>Create User</h1>

          <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} placeholder="Username"/>

          <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="Email"/>

          <input type="passowrd" name='password' value={this.state.password} onChange={this.handleInputChange} placeholder="Password"/>

          {this.state.error ?  <p style={{color: 'red'}}>{this.state.error}</p> : null }
          <input type="file" name='image' onChange={this.fileSelectedHandler}/>

          <input  type="submit" value='Submit'/>

        </form>
      </div>
    );
  }
}

export default App;
