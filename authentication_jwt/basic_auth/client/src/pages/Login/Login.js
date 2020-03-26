
import React, { Component } from 'react'
import axios from 'axios';

import styles from './Login.module.css';


class Login extends Component {

    state = {
        email: '',
        password: '',
        errorMsg: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(this.state);

        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const body = {
                email: this.state.email,
                password: this.state.password
            }

            const res = await axios.post('http://localhost:8080/auth/login', body, config);
            console.log(res.data);

            localStorage.setItem('token', res.data.token);

            this.props.history.push('/');

        }catch(err){
            console.log(err);
            this.setState({
                errorMsg: err.response.data.error
            });
        }
    }

    checkSubmitBtn = () => {
        let check = false;
        if (this.state.email && this.state.password){
            check = true;
        }
        return check;
    }


    render() {
        return (
            <div className={styles.register}>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.heading}>Login</h1>

                    <input className={styles.input} type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
                    <input className={styles.input} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>

                    {this.state.errorMsg ? <p style={{color: 'red'}}>{this.state.errorMsg}</p> : null }
                    <input type="submit" value="Submit" className={styles.submit} disabled={!this.checkSubmitBtn()}/>

                </form>                
            </div>
        )
    }
}

export default Login;