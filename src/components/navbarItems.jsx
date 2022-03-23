import React, { Component } from 'react'
import styles from './styles/navbarItems.scss'
import CartContext from '../context/cartContext'

class NavbarIcons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currencies: this.props.currencies
        }
    }

    render() {
        console.log(this.context.isDimmed)
        return (
            <div className='navbarIcons' style={{marginTop: '25px', display: 'flex', marginRight: '100px'}}>
                <div className='currencySelector' style={{}}>
                    <button className='currencySelectorButton'>
                        <div>
                            {this.context.currency}
                            <img src='./dropdown-x512.svg' height='10px'/>
                        </div>
                    </button>
                    <div className='currencySelectorContent'>
                        {
                            this.state.currencies.map(currency =>
                                <a onClick={() => this.context.setCurrency(currency.symbol)}>
                                    {currency.symbol} {currency.label}
                                </a>    
                            )
                        }
                    </div>
                </div>
                <div className='navbarCart' style={{marginLeft: '20px'}}>
                    <input type='checkbox' id='cart' onClick={this.context.toggleDimm}/>
                    <label for='cart'>
                        <img src='/shopping-cart-x512.svg' style={{height: '23px'}} />
                    </label>
                    <div className='navbarCartInfo'>
                        <img src='/shopping-cart-x512.svg' style={{height: '200px'}} />
                    </div>
                </div>
            </div>
        )
    }
}

NavbarIcons.contextType = CartContext

export default NavbarIcons