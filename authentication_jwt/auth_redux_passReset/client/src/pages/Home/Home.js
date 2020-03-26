
import React, { Component } from 'react';

import styles from './Home.module.css';
import {connect} from 'react-redux';

class Home extends Component {

    componentDidMount(){
        if (!this.props.isAuthenticated){
            this.props.history.push('/');
        }

        const token = localStorage.getItem('token');
        if (!token) {
            this.props.history.push('/login');
        }
    }
    
    render() {
        return (
            <div className={styles.home}>
                <h1>Home</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Home);
