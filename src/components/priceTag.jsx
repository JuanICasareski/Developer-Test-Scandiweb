import React, { Component } from 'react'
import CartContext from '../context/cartContext'

class PriceTag extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prices: props.prices
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.prices !== this.props.prices) {
            this.setState({ prices: this.props.prices })
        }
    }


    render() {
        return (
            <>
                {
                    this.state.prices.map(price =>
                        price.currency.symbol === this.context.currency ?
                            <React.Fragment key={price.currency.symbol + price.amount}>
                                {price.currency.symbol} {price.amount.toFixed(2)}
                            </React.Fragment>
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