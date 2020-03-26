
import React from 'react';

import styles from './Header.module.css';
import {withRouter} from 'react-router-dom';

class Header extends React.Component{

    state = {
        isAuthenticated: false
    }

    // componentDidUpdate(){
    //     const token = localStorage.getItem('token');
    //     if (token){
    //         this.setState({
    //             isAuthenticated: true
    //         });
    //     }else{
    //         this.setState({
    //             isAuthenticated: false
    //         })
    //     }
    // }

    handleLogout = () => {
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }


    render(){
        
        return (
            <div className={styles.header}>

                <div className={styles.logo}>LOGO</div>

                <div className={styles.nav}>
                    {
                        !this.state.isAuthenticated ? 
                        <>
                        <div className={styles.btn} onClick={() => this.props.history.push('/login')}>Login</div>
                        <div className={styles.btn} onClick={() => this.props.history.push('/register')}>Register</div>
                        </>
                        :
                        <div className={styles.btn} onClick={this.handleLogout}>Logout</div>
                    }
                </div>

            </div>
        )
    }
}

export default withRouter(Header);