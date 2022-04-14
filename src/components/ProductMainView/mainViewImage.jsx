import React, { Component } from 'react'
import ImgRadioButton from '../ImgRadioButton'
import './styles.css'

class MainViewImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentImage: props.gallery.at(0),
            gallery: props.gallery
        }
    }

    setImage = (newUrl) => {
        this.setState({
            currentImage: newUrl
        })
    }

    render() {
        return (
            <>
                <div className='imageSliderContainer noScrollBar'>
                    {
                        this.state.gallery.map((i) =>
                            <div className='imageSliderImage' key={i + 'container'}>
                                <ImgRadioButton url={i} onClick={this.setImage} />
                            </div>
                        )
                    }
                </div>
                <div className='productImageContainer'>
                    <img className='centerImage' src={this.state.currentImage} alt='current item' />
                </div>
            </>
        )
    }
}

export default MainViewImage;
