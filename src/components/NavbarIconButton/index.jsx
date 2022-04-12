import React, { Component } from 'react'
import CartButton from './cartButton'
import CurrencyButton from './currencyButton'
import CartContext from '../../context/cartContext'
import './styles.css'

class NavbarIcons extends Component {
    render() {
        console.log(this.context.items)
        return (
            <div className='navbarIcons'>
                <CurrencyButton currencies={this.props.currencies} />
                
                <CartButton />
            </div>
        )
    }
}

NavbarIcons.contextType = CartContext

export default NavbarIcons