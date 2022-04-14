import React, { Component } from 'react'
import PriceTag from '../PriceTag'
import './styles.css'

class MainViewPrice extends Component {
    render() {
        return (
            <div>
                <p className='productSubtitle'>PRICE:</p>
                <p className='productPricing'><PriceTag prices={this.props.prices} /></p>
            </div>
        )
    }
}

export default MainViewPrice
