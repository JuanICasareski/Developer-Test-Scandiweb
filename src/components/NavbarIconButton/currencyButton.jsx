import React, { Component } from 'react'
import CurrencySelectorContent from './currencySelectorContent'
import CartContext from '../../context/cartContext'
import './styles.css'

 
class CurrencyButton extends Component {    
    render() {
        return (
            <div className='currencySelector'>
                <button className='currencySelectorButton'>
                    <div>
                        {this.context.currency}
                        <img src='/dropdown-x512.svg' alt='dropdown' height='10px' />
                    </div>
                </button>

                <CurrencySelectorContent currencies={this.props.currencies} />

            </div>
        )
    }
}

CurrencyButton.contextType = CartContext

export default CurrencyButton