import React, { Component } from 'react'
import CartContext from '../context/cartContext'

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
            <div>
                {
                    this.state.items?
                        this.state.items.map(category =>
                            category.name == this.context.currentCategory?
                                category.products.map(product => 
                                    <h3>
                                        <a href={`/item/${product.id}`}>{product.id}</a>
                                    </h3>     
                                )                               
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