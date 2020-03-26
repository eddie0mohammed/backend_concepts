
import React, { Component } from 'react'

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import styles from './Login.module.css';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';

class Login extends Component {

    state = {
        email: '',
        password: ''    
    }

    componentDidMount(){
        
        if (this.props.isAuthenticated){
            this.props.history.push('/');
        }

        this.props.resetRegisteredStatus();
        this.props.resetResetPasswordStatus();
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(this.state);

        await this.props.login(this.state.email, this.state.password);

        if (this.props.isAuthenticated){
            this.props.history.push('/');
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

                    {this.props.error ? <p style={{color: 'red'}}>{this.props.error}</p> : null }
                    <input type="submit" value="Submit" className={styles.submit} disabled={!this.checkSubmitBtn()}/>


                    <Link to='/forgotPassword' className={styles.link}>Forgot your password?</Link>
                </form>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error.error,
        isAuthenticated: state.auth.isAuthenticated

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetRegisteredStatus: () => dispatch(authActionCreators.resetRegisteredStatus()),
        login: (email, password) => dispatch(authActionCreators.login(email, password)),
        resetResetPasswordStatus: () => dispatch(authActionCreators.resetResetPasswordStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);