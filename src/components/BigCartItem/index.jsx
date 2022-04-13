import React, { Component } from 'react'
import PriceTag from '../PriceTag'
import BigItemAttrs from './bigItemAttrs'
import CartContext from '../../context/cartContext'
import './styles.css'

class BigCartItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            itemId: props.item.id,
            name: props.item.name,
            brand: props.item.brand,
            gallery: props.item.gallery,
            attributes: props.item.attributes,
            selectedAttrs: props.selectedAttrs,
            prices: props.item.prices,
            itemCount: props.count,
            currentImageIndex: 0
        }
    }

    incrementCount = () => {
        this.context.setCount(this.props.order, this.state.itemCount + 1)
    }

    decrementCount = () => {
        this.context.setCount(this.props.order, this.state.itemCount - 1)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.count !== this.props.count) {
            this.setState({ itemCount: this.props.count })
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
            <div className='cartItem'>
                <div className='cartItemLeft'>
                    <div>
                        <div className='cartItemBrand'>
                            <p>{this.state.brand}</p>
                        </div>
                        <div className='cartItemName'>
                            <p>{this.state.name}</p>
                        </div>
                        <div className='cartItemPricing'>
                            <p> <PriceTag prices={this.state.prices} /> </p>
                        </div>
                    </div>
                    
                    <BigItemAttrs 
                        attrs={this.state.attributes} 
                        order={this.props.order} 
                        selectedAttrs={this.state.selectedAttrs} 
                    />

                </div>
                <div className='cartItemRight'>
                    <div className='itemCountSelector'>
                        <button onClick={() => this.incrementCount()}>+</button>
                        <p>{this.state.itemCount}</p>
                        <button onClick={() => this.decrementCount()}>-</button>
                    </div>

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
                </div>
            </div>
        )

    }
}

BigCartItem.contextType = CartContext

export default BigCartItem