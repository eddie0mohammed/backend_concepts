
import React from 'react';

import styles from './Upload.module.css';

import axios from 'axios';


class Upload extends React.Component{


    state = {
        selectedFile: null,
        errorMsg: ''
    }

    handleSelectedFile = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const formData = new FormData();
        formData.append('image', this.state.selectedFile, this.state.selectedFile.name);

        try{
            const res = await axios.post('http://localhost:8080/images', formData, config);
            
            // console.log(res.data);

            this.props.history.push('/');

        }catch(err){
            console.log(err);
            this.setState({
                errorMsg: err.response.data.error.message
            });
        }
    }

    render(){

        return (
            <div className={styles.upload}>


                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1>Upload Photo</h1>

                    <input className={styles.input} type="file" onChange={this.handleSelectedFile}/>

                    {this.state.errorMsg ? <p style={{color: 'red'}}>{this.state.errorMsg}</p> : null }
                    <input className={styles.input} type="submit" value="Submit" disabled={!this.state.selectedFile}/>

                </form>

            </div>
        )
    }
}

export default Upload;