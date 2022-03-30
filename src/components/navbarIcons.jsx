import React, { Component } from 'react'
import styles from './styles/navbarIcons.scss'
import CartContext from '../context/cartContext'
import SmallCartItem from './smallCartItem'

class NavbarIcons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currencies: this.props.currencies
        }
    }

    render() {
        return (
            <div className='navbarIcons' style={{marginTop: '25px', display: 'flex', marginRight: '100px'}}>
                <div className='currencySelector' style={{}}>
                    <button className='currencySelectorButton'>
                        <div>
                            {this.context.currency}
                            <img src='/dropdown-x512.svg' height='10px'/>
                        </div>
                    </button>
                    <div className='currencySelectorContent'>
                        {
                            this.state.currencies.map(currency =>
                                currency.symbol === this.context.currency?
                                    <>
                                        <input type='radio' name='currency' id={currency.symbol} onClick={() => this.context.setCurrency(currency.symbol)} checked />
                                        <label htmlFor={currency.symbol}>
                                            {currency.symbol} {currency.label}
                                        </label>
                                    </>
                                :
                                    <>
                                        <input type='radio' name='currency' id={currency.symbol} onClick={() => this.context.setCurrency(currency.symbol)} />
                                        <label htmlFor={currency.symbol}>
                                            {currency.symbol} {currency.label}
                                        </label>
                                    </>
                            )
                        }
                    </div>
                </div>
                <div className='navbarCart' style={{marginLeft: '20px'}}>
                    <input type='checkbox' id='cart' onClick={this.context.toggleDimm}/>
                    <label htmlFor='cart'>
                        <img src='/shopping-cart-x512.svg' style={{height: '23px'}} />
                    </label>
                    <div className='navbarCartInfo' style={{width: '325px'}}>
                        {
                            this.context.items.map((item, i) =>
                                <SmallCartItem item={item.itemInfo} selectedAttrs={item.selectedAttrs} count={item.count} order={i} />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

NavbarIcons.contextType = CartContext

export default NavbarIcons