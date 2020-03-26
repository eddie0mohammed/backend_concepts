
import React, { Component } from 'react'

import {connect} from 'react-redux';


import styles from './ForgotPassword.module.css';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';

class ForgotPassword extends Component {

    state = {
        email: '',
         
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    checkSubmitBtn = () => {
        let check = false;
        if(this.state.email){
            check = true
        };
        return check
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();

        await this.props.forgotPassword(this.state.email);

        if (this.props.forgetPassword){
            this.props.history.push('/login');
        }

    }

    render() {
        return (
            <div className={styles.register}>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.heading}>Forgot Your Password</h1>

                    <p className={styles.text}>Enter your email. A password reset link will be sent to your email</p>

                    <input className={styles.input} type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
                    

                    {this.props.error ? <p style={{color: 'red'}}>{this.props.error}</p> : null}
                    
                    <input type="submit" value="Submit" className={styles.submit} disabled={!this.checkSubmitBtn()}/>
                </form>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
        error: state.error.error,
        forgetPassword: state.auth.forgetPassword
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (email) => dispatch(authActionCreators.forgotPassword(email)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);