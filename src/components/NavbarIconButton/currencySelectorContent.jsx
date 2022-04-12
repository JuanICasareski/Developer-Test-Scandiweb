import React, { Component } from 'react'
import CartContext from '../../context/cartContext'
import './styles.css'

class CurrencySelectorContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currencies: this.props.currencies
        }
    }

    render() {
        return (
            <div className='currencySelectorContent'>
                {
                    this.props.currencies.map(currency =>
                        <React.Fragment key={currency.symbol}>
                            <input
                                type='radio'
                                name='currency'
                                id={currency.symbol}
                                onChange={() => this.context.setCurrency(currency.symbol)}
                                checked={currency.symbol === this.context.currency}
                            />
                            <label htmlFor={currency.symbol}>
                                {currency.symbol} {currency.label}
                            </label>
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}

CurrencySelectorContent.contextType = CartContext

export default CurrencySelectorContent
