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
            <div style={{
                width: '1238px',
                position: 'relative',
                margin: '0 auto',
                paddingTop: '80px'
            }}
            >
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
                                                style={{
                                                    width: '386px',
                                                    height: '444px',
                                                    paddingTop: '16px'
                                                }}
                                            >

                                                <a href={"/item/" + product.id} key={product.id + 'image'}>
                                                    <div className='outOfStockLabel'>
                                                        OUT OF STOCK
                                                    </div>
                                                    <div
                                                        style={{
                                                            height: '330px',
                                                            width: '386px',
                                                            position: 'relative'
                                                        }}
                                                    >
                                                        <img 
                                                            src={product.gallery[0]}
                                                            className='centerImage'
                                                            style={{
                                                                maxHeight: '330px',
                                                                maxWidth: '354px'
                                                            }}
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
                                                                style={{
                                                                    width: '24px', 
                                                                    height: '24px' 
                                                                }} 
                                                            />
                                                        </span>
                                                        :
                                                        null
                                                }

                                                <a href={"/item/" + product.id} key={product.id + 'details'}>
                                                    <div 
                                                        style={{
                                                            marginLeft: '16px',
                                                            marginTop: '35px'
                                                        }}
                                                    >
                                                        <h3 className='productIndexViewName' style={{ marginBottom: 0 }}>
                                                            {product.brand} {product.name}
                                                        </h3>
                                                        <h4 className='productIndexViewPricing' style={{ marginTop: '2px' }}>
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