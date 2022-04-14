import React, { Component } from 'react'
import SmallItemAttrs from './smallItemAttrs'
import SmallItemDescription from './smallItemDescription'
import ItemCountSelector from './itemCountSelector'
import CartContext from '../../context/cartContext'
import './styles.css'

class SmallCartItem extends Component {

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
            itemCount: props.count
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.count !== this.props.count) {
            this.setState({ itemCount: this.props.count })
        }
    }

    render() {
        return (
            <div className='smallCartItem'>
                <div className='smallCartItemLeft'>

                    <SmallItemDescription 
                        item={this.props.item} 
                    />

                    <SmallItemAttrs 
                        attrs={this.state.attributes} 
                        selectedAttrs={this.state.selectedAttrs} 
                        order={this.props.order}
                    />

                </div>
                <div className='smallCartItemRight'>

                    <ItemCountSelector count={this.state.itemCount} />

                    <div className='smallItemImageContainer'>
                        <img src={this.state.gallery[0]} alt='item image' />
                    </div>
                    
                </div>
            </div>
        )
    }

}

SmallCartItem.contextType = CartContext

export default SmallCartItem