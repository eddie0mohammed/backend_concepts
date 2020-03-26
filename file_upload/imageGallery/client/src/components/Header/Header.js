
import React from 'react';

import styles from './Header.module.css';

import {Link} from 'react-router-dom';


class Header extends React.Component{


    render(){

        return (
            <div className={styles.header}>

                <div className={styles.logo}>LOGO</div>

                <div className={styles.nav}>
                    <Link to='/' className={styles.button}>Gallery</Link>
                    <Link to='/upload' className={styles.button}>Upload</Link>
                </div>

            </div>
        )
    }
}

export default Header;