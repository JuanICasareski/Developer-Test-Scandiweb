import React, { Component } from 'react'
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
            this.setState({items: data.data.categories})
        })
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
                    this.state.items?
                        this.state.items.map(category =>
                            category.name == this.context.currentCategory?
                                <div className='indexView' key={category}>
                                    {
                                        category.products.map(product => 
                                            <a href={"/item/" + product.id} key={product.id}>
                                                <div className={product.inStock? 'productIndexView' : 'productIndexView outOfStock'} 
                                                    style={{
                                                    width: '386px',
                                                    height: '444px',
                                                    paddingTop: '16px'
                                                    }}
                                                >   
                                                    <div className='outOfStockLabel'>
                                                        OUT OF STOCK
                                                    </div>
                                                    <div style={{
                                                        height: '330px',
                                                        width: '386px',
                                                        position: 'relative'
                                                        }}
                                                    >
                                                        <img src={product.gallery[0]}
                                                            className='centerImage' 
                                                            style={{
                                                                maxHeight: '330px',
                                                                maxWidth: '354px'
                                                            }}
                                                        />   
                                                    </div>
                                                    {
                                                        product.inStock?
                                                            <span className='productIndexCartButton'>
                                                                <img className='centerImage' src='/shopping-cart-x512.svg' style={{width: '24px', height: '24px'}} />
                                                            </span>
                                                        :
                                                            null

                                                    }
                                                    <div style={{
                                                        marginLeft: '16px',
                                                        marginTop: '35px'
                                                        }}
                                                    >
                                                        <h3 className='productIndexViewName' style={{marginBottom: 0}}>
                                                            {product.brand} {product.name}
                                                        </h3>
                                                        <h4 className='productIndexViewPricing' style={{marginTop: '2px'}}>
                                                            {product.prices[0].currency.symbol}{product.prices[0].amount}
                                                        </h4>
                                                    </div>
                                                </div>     
                                            </a>
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