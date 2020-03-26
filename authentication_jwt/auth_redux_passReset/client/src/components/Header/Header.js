
import React from 'react';

import styles from './Header.module.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';

class Header extends React.Component{

    state = {
        isAuthenticated: false
    }

    handleLogout = () => {
        this.props.logout();

        this.props.history.push('/login');
    }


    render(){
        
        return (
            <div className={styles.header}>

                <div className={styles.logo}>LOGO</div>

                <div className={styles.nav}>
                    {
                        !this.props.isAuthenticated ? 
                        <>
                        <div className={styles.btn} onClick={() => this.props.history.push('/login')}>Login</div>
                        <div className={styles.btn} onClick={() => this.props.history.push('/register')}>Register</div>
                        </>
                        :
                        <>
                        <div style={{alignSelf:'center'}}>{ this.props.user && `Welcome back ${this.props.user.username}`}</div>
                        <div className={styles.btn} onClick={this.handleLogout}>Logout</div>
                        </>
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(authActionCreators.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));