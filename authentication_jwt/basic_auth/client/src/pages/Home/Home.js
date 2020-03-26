
import React, { Component } from 'react';

import styles from './Home.module.css';

class Home extends Component {

    componentDidMount(){
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

export default Home;
