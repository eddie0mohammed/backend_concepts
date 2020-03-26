
import React from 'react';

import styles from './Gallery.module.css';

import axios from 'axios';


class Gallery extends React.Component{

    state = {
        images: [],
        loading: true
    }

    async componentDidMount(){

        const res = await axios.get('http://localhost:8080/images');

        // console.log(res.data.data.images);
        this.setState({
            images: res.data.data.images,
            loading: false
        });

    }

    renderImages = () => {
        return this.state.images.map((elem, i) => {
            return (
                <img key={i} className={styles.img} src={`http://localhost:8080/images/${elem.imageUrl}`} alt="elem._id"/>
            )
        })
    }


    render(){

        return (
            <div className={styles.gallery}>

                <h1 className={styles.header}>Gallery</h1>

                <div className={styles.imageGallery}>

                    {!this.state.loading ? 

                        this.renderImages()
                        :
                        <h1 style={{textAlign: 'center'}}>Loading...</h1>

                    
                    }

                </div>

            </div>
        )
    }
}

export default Gallery;