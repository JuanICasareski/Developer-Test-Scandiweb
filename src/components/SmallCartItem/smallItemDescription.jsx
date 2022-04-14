import React, { Component } from 'react'
import PriceTag from '../PriceTag'
import './styles.css'

class SmallItemDescription extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className='smallCartItemName'>
                    <p>{this.props.item.brand}</p>
                    <p>{this.props.item.name}</p>
                </div>
                <div className='smallCartItemPricing'>
                    <p> <PriceTag prices={this.props.item.prices} /> </p>
                </div>
            </div>
        )
    }
}

export default SmallItemDescription