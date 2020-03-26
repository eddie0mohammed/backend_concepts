import React from 'react';
import axios from 'axios';


import './App.css';

class App extends React.Component {


  state = {
    
    selectedFile: null,
    errorMsg: ''
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
    }

    const formData = new FormData();
    formData.append('image', this.state.selectedFile, this.state.selectedFile.name);

    try{
      const res = await axios.post('http://localhost:8080/photo', formData, config);

      console.log(res.data);
      
      this.setState({
        selectedFile: ''
      });
      
    }catch(err){
      console.log(err);
    
      this.setState({
        errorMsg: err.response.data.error.message
      });
      
     
    }
    

  }


  render(){

    // console.log(this.state.selectedFile);
  
    return (
      <div className="App">

        
        <form onSubmit={this.formSubmit}>
          <h1>Upload Photo</h1>


          {this.state.errorMsg ? <p style={{color: 'red'}}>{this.state.errorMsg}</p> : null }          

          <input type="file" name='image' onChange={this.fileSelectedHandler} />

          <input  type="submit" value='Submit' disabled={!this.state.selectedFile}/>

        </form>

        {/* <img src={`http://localhost:8080/images/1.png`} alt=""/> */}
      </div>
    );
  }
}

export default App;
