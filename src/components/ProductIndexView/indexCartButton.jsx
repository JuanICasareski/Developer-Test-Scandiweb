import React, { Component } from 'react'
import CartContext from "../../context/cartContext"
import './styles.css'

class IndexCartButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: props.product
        }
    }

    addItemWithDefaultAttrs = (itemId, item) => {
        let selectedAttrs = {}
        for (let attr of item.attributes) {
            selectedAttrs = {
                ...selectedAttrs,
                [attr.id]: attr.items.at(0).value
            }
        }

        this.context.addItem(itemId, item, selectedAttrs)
    }

    render() {
        return (
            <>
                {
                    this.state.product.inStock ?
                        <span
                            className='productIndexCartButton'
                            onClick={() => this.addItemWithDefaultAttrs(this.state.product.id, this.state.product)}
                        >
                            <img
                                className='centerImage'
                                src='/shopping-cart-x512.svg'
                            />
                        </span>
                        :
                        null
                }
            </>
        )
    }
}

IndexCartButton.contextType = CartContext

export default IndexCartButton