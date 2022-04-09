import React, { Component } from 'react'
import PriceTag from '../components/priceTag'
import CartContext from '../context/cartContext'
import styles from '../components/styles/index.scss'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: null
        }
    }

    componentDidMount() {
        const query = `
            query {
                categories {
                    name
                    products {
                        id
                        name
                        brand
                        inStock
                        gallery
                        prices {
                            currency {
                                symbol  
                            }
                            amount
                        }
                        attributes {
                            id
                            name
                            type
                            items {
                                displayValue
                                value
                                id
                            }
                        }
                    }
                }
            }           
        `
        fetch("http://localhost:4000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                query
            })
        }).then(response => {
            return response.json()
        }).then(data => {
            this.setState({ items: data.data.categories })
        })
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
                        this.state.items.map(category =>
                            category.name === this.context.currentCategory ?
                                <div className='indexView' key={category}>
                                    {
                                        category.products.map(product =>
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
                                </div>
                                : null
                        )
                        : null
                }
            </div>
        )
    }
}

Index.contextType = CartContext

export default Index