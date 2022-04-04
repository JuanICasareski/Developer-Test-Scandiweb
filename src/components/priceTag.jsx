import React, { Component } from 'react'
import CartContext from '../context/cartContext'

class PriceTag extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prices: props.prices
        }
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.prices !== this.props.prices) {
            this.setState({prices: this.props.prices})
        }
    }


    render() {
        return (
            <>
                {
                    this.state.prices.map(price =>
                        price.currency.symbol === this.context.currency?
                            <>
                                {price.currency.symbol} {price.amount.toFixed(2)}                                
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