import React, { Component } from 'react'
import CartContext from '../context/cartContext'

class PriceTag extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prices: props.prices
        }
    }

    render() {
        return (
            <>
                {
                    this.state.prices.map(price =>
                        price.currency.symbol === this.context.currency?
                            <>
                                {price.currency.symbol} {price.amount}                                
                            </>                        
                        :
                            null
                    )     
                }
            </>
        )
    }   
}

PriceTag.contextType = CartContext

export default PriceTag