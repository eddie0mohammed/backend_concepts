
import React, { Component } from 'react'
import axios from 'axios';

import styles from './Register.module.css';


class Register extends Component {

    state = {
        username: '',
        email: '',
        password: ''
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
                "Content-Type": "application/json"
            }
        }
            const body = JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })

            const res = await axios.post('http://localhost:8080/auth/register', body, config);
            console.log(res.data);

            this.props.history.push('/login');

        }catch(err){
            console.log(err);

        }
    
        

    }

    checkSubmitBtn = () => {
        let check = false;
        if (this.state.username && this.state.email && this.state.password){
            check = true;
        }
        return check;
    }

    render() {
        return (
            <div className={styles.register}>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.heading}>Register</h1>

                    <input className={styles.input} type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInputChange}/>
                    <input className={styles.input} type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
                    <input className={styles.input} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>

                    <input type="submit" value="Submit" className={styles.submit} disabled={!this.checkSubmitBtn()}/>

                </form>                
            </div>
        )
    }
}

export default Register;