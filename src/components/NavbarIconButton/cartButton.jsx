import React, { Component } from 'react'
import SmallCartContent from './smallCartContent'
import CartContext from '../../context/cartContext'
import './styles.css'

class CartButton extends Component {
    render() {
        return (
            <div className='navbarCart'>
                <input
                    type='checkbox'
                    id='cart'
                    onClick={this.context.toggleDimm}
                    checked={this.context.isDimmed}
                />
                <label htmlFor='cart'>
                    <img
                        src='/shopping-cart-x512.svg'
                        alt='shopping cart'
                    />
                    <div>
                        {
                            this.context.totalItemCount > 0 ?
                                <div className='navbarCartTotalItemCount'>
                                    <span>
                                        {this.context.totalItemCount}
                                    </span>
                                </div>
                                :
                                null
                        }
                    </div>
                </label>

                <SmallCartContent />

            </div>
        )
    }
}

CartButton.contextType = CartContext

export default CartButton