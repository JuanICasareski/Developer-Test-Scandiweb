import React, { Component } from 'react'
import PriceTag from '../components/priceTag'
import CartContext from '../context/cartContext'
import styles from '../components/styles/index.scss'
import { getItemsFromCategory } from '../helpers'
class Index extends Component {
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
            <div className='indexContainer'>
                <h1 className='categoryTitle'>{this.context.currentCategory}</h1>
                {
                    this.state.items ?
                        <div className='indexView'>
                            {
                                this.state.items.map(product =>
                                    <React.Fragment key={product.id}>
                                        {
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
                                        }
                                    </React.Fragment>
                                )
                            }
                        </div>
                        : null
                }
            </div>
        )
    }
}

Index.contextType = CartContext

export default Index