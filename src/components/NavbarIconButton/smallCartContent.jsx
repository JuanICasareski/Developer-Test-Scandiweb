import React, { Component } from 'react'
import SmallCartItem from '../SmallCartItem'
import PriceTag from '../PriceTag'
import CartContext from '../../context/cartContext'
import './styles.css'

class SmallCartContent extends Component {
    render() {
        return (
            <div className='navbarCartInfo'>
                <div className='navbarCartTitle'>
                    My bag, {this.context.totalItemCount} items
                </div>

                <div className='navbarCartSmallItems noScrollBar'>
                    <>
                        {
                            this.context.items && this.context.items.length !== 0 ?
                                this.context.items.map((item, i) =>
                                    <React.Fragment key={item.itemUUID}>
                                        <SmallCartItem
                                            item={item.itemInfo}
                                            selectedAttrs={item.selectedAttrs}
                                            count={item.count}
                                            order={i}
                                        />
                                    </React.Fragment>
                                )
                                :
                                <div className='cartItemPlaceholder'>
                                    <p> No Items <br></br> ¯\_(ツ)_/¯ </p>
                                </div>
                        }
                    </>
                </div>

                <div className='navbarCartPricing'>
                    <h3 className='navbarCartPricingTag'>
                        Total
                    </h3>
                    <h3 className='navbarCartPricingAmount'>
                        {
                            this.context.totalItemPrices ?
                                <PriceTag prices={this.context.totalItemPrices} />
                                :
                                null
                        }
                    </h3>
                </div>

                <div className='navbarCartButtons'>
                    <a href='/cart'> <button className='navbarCartBagButton'>VIEW BAG</button> </a>
                    <button className='navbarCartCheckOutButton'>CHECK OUT</button>
                </div>
            </div>
        )
    }
}

SmallCartContent.contextType = CartContext

export default SmallCartContent