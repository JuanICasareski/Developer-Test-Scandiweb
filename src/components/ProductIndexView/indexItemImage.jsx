import React, { Component } from 'react'
import './styles.css'

class IndexItemImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: props.product
        }
    }

    render() {
        const { product } = this.state

        return (
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
        )
    }
}

export default IndexItemImage 