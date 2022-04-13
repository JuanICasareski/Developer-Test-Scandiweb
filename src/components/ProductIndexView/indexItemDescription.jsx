import React, { Component } from 'react'
import PriceTag from "../PriceTag"
import './styles.css'

class IndexItemDescription extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: props.product
        }
    }

    render() {
        const { product } = this.state
        
        return (
            <a href={"/item/" + product.id} key={product.id + 'details'}>
                <div className='indexViewDescriptionContainer'>

                    <h3 className='productIndexViewName'>
                        {product.brand} {product.name}
                    </h3>

                    <h4 className='productIndexViewPricing'>
                        <PriceTag prices={product.prices} />
                    </h4>

                </div>
            </a>
        )
    }
}

export default IndexItemDescription 