import React, { Component } from 'react'
import './styles.css'

class ItemImageCarrousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentImageIndex: 0,
            gallery: props.gallery
        }
    }

    nextImage = () => {
        this.setState({
            currentImageIndex: this.state.currentImageIndex + 1
        })
    }

    prevImage = () => {
        this.setState({
            currentImageIndex: this.state.currentImageIndex - 1
        })
    }

    render() {
        return (
            <div className='cartItemImage'>

                <img src={this.state.gallery.at(this.state.currentImageIndex)} alt='Current item' />

                <div className='cartItemCarrousel'>
                    {
                        this.state.currentImageIndex > 0 ?
                            <div onClick={() => this.prevImage()}>
                                <img src='prev-button.svg' alt='back' />
                            </div>
                            :
                            <div className='carrouselButtonPlaceholder'></div>
                    }
                    {
                        this.state.currentImageIndex < this.state.gallery.length - 1 ?
                            <div onClick={() => this.nextImage()}>
                                <img src='next-button.svg' alt='next' />
                            </div>
                            :
                            <div className='carrouselButtonPlaceholder'></div>
                    }
                </div>
            </div>
        )
    }
}

export default ItemImageCarrousel