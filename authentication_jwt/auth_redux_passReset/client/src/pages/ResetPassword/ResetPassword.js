
import React, { Component } from 'react'

import {connect} from 'react-redux';


import styles from './ResetPassword.module.css';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';

class ResetPassword extends Component {

    state = {
        password: '',
        confirmPassword: ''
         
    }

    componentDidMount(){
        this.props.resetForgotPassword();
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    checkSubmitBtn = () => {
        let check = false;
        if(this.state.password && this.state.confirmPassword){
            check = true
        };
        return check
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();

        if (this.state.password === this.state.confirmPassword){
            const token = this.props.match.params.token;
            await this.props.resetPassword(this.state.password, token);

            if (this.props.passwordReset){
                this.props.history.push('/login');
            }

        }else{
            this.props.showError();
            setTimeout(() => {
                this.props.clearErrors();
            }, 3000);
        }
    }

    render() {
        return (
            <div className={styles.register}>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.heading}>Reset Password</h1>

                    <input className={styles.input} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
                    <input className={styles.input} type="password" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleInputChange}/>
                
                    {this.props.error ? <p style={{color: 'red'}}>{this.props.error}</p> : null }
                    
                    <input type="submit" value="Submit" className={styles.submit} disabled={!this.checkSubmitBtn()}/>
                </form>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error.error,
        passwordReset: state.auth.passwordReset

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetForgotPassword: () => dispatch(authActionCreators.resetForgotPassword()),
        showError: () => dispatch(authActionCreators.showError()),
        clearErrors: () => dispatch(authActionCreators.clearErrors()),
        resetPassword: (password, token) => dispatch(authActionCreators.resetPassword(password, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);