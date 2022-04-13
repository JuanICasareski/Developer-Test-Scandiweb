import React, { Component } from 'react'
import PriceTag from '../PriceTag'
import BigItemAttrs from './bigItemAttrs'
import ItemCountSelector from './itemCountSelector'
import ItemImageCarrousel from './itemImageCarrousel'
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
            prices: props.item.prices
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.count !== this.props.count) {
            this.setState({ itemCount: this.props.count })
        }
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
                    
                    <ItemCountSelector />

                    <ItemImageCarrousel gallery={this.state.gallery} />

                </div>
            </div>
        )

    }
}

BigCartItem.contextType = CartContext

export default BigCartItem