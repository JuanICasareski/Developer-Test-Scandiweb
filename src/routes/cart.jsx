import React, { Component } from 'react'
import BigCartItem from '../components/bigCartItem'
import CartContext from '../context/cartContext'
import styles from '../components/styles/cart.scss'

class Cart extends Component {
    render() {
        return (
            <div className='cart'>

                <h1>CART</h1>

                <div>
                    {
                        this.context.items && this.context.items.length !== 0 ?
                            this.context.items.map((item, i) =>
                                <React.Fragment key={i}>
                                    <BigCartItem item={item.itemInfo} selectedAttrs={item.selectedAttrs} count={item.count} order={i} />
                                </React.Fragment>
                            )
                            :
                            <div className='itemsPlaceholder'>
                                <p>Nothing to see here</p>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

Cart.contextType = CartContext

export default Cart