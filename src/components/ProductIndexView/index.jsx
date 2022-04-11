import React, { Component } from "react"
import PriceTag from "../PriceTag"
import './styles.css'
import CartContext from "../../context/cartContext"

class ProductIndexView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: props.item
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
        const { product } = this.state

        return (
            <div
                className={product.inStock ? 'productIndexView' : 'productIndexView outOfStock'}
                key={product.id}
            >

                <a href={"/item/" + product.id} key={product.id + 'image'}>
                    <div className='outOfStockLabel'>
                        OUT OF STOCK
                    </div>
                    <div className='indexViewImageContainer'>
                        <img
                            src={product.gallery[0]}
                            className='indexViewImage centerImage'
                        />
                    </div>
                </a>

                {
                    product.inStock ?
                        <span
                            className='productIndexCartButton'
                            onClick={() => this.addItemWithDefaultAttrs(product.id, product)}
                        >
                            <img
                                className='centerImage'
                                src='/shopping-cart-x512.svg'
                            />
                        </span>
                        :
                        null
                }

                <a href={"/item/" + product.id} key={product.id + 'details'}>
                    <div className='indexViewDescriptionContainer'
                    >
                        <h3 className='productIndexViewName'>
                            {product.brand} {product.name}
                        </h3>
                        <h4 className='productIndexViewPricing'>
                            <PriceTag prices={product.prices} />
                        </h4>
                    </div>
                </a>
            </div>
        )
    }
}

ProductIndexView.contextType = CartContext

export default ProductIndexView