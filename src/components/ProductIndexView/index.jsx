import React, { Component } from "react"
import IndexCartButton from "./indexCartButton"
import IndexItemDescription from "./indexItemDescription"
import IndexItemImage from "./indexItemImage"
import CartContext from "../../context/cartContext"
import './styles.css'

class ProductIndexView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: props.item
        }
    }

    render() {
        const { product } = this.state

        return (
            <div
                className={product.inStock ? 'productIndexView' : 'productIndexView outOfStock'}
                key={product.id}
            >

                <IndexItemImage product={this.state.product} />

                <IndexCartButton product={this.state.product} />

                <IndexItemDescription product={this.state.product} />
            </div>
        )
    }
}

ProductIndexView.contextType = CartContext

export default ProductIndexView