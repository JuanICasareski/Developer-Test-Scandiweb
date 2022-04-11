import React, { Component } from 'react'
import PriceTag from '../../components/PriceTag'
import CartContext from '../../context/cartContext'
import './styles.css'
import { getItemsFromCategory } from '../../helpers'
import ProductIndexView from '../../components/ProductIndexView'

class ProductListingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: null,
            currentCategory: null
        }
    }

    componentDidMount() {
        getItemsFromCategory(this.context.currentCategory)
            .then(allItems =>
                this.setState({ items: allItems })
            )
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentCategory !== this.context.currentCategory) {
            getItemsFromCategory(this.context.currentCategory)
                .then(allItems =>
                    this.setState({ items: allItems })
                )

            this.setState({ currentCategory: this.context.currentCategory })
        }
    }




    render() {
        return (
            <div className='indexContainer'>
                <h1 className='categoryTitle'>{this.context.currentCategory}</h1>
                <div className='indexView'>
                    {
                        this.state.items ?
                            this.state.items.map(item =>
                                <ProductIndexView item={item} key={item.id} />
                            )
                            : null
                    }
                </div>
            </div>
        )
    }
}

ProductListingPage.contextType = CartContext

export default ProductListingPage