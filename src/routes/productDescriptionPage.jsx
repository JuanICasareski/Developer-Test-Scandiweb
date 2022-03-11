import React, { Component } from 'react'
import ProductMainView from '../components/productMainView'

class ProductDescriptionPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            item: null
        }
    }

    componentDidMount = () => {
        console.log("=== Component mounted ===")
        const query = `
            query {
                product(id:"ps-5") {
                    id
                    name
                    inStock
                    gallery
                    description
                    category
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
                    prices {
                        amount
                        currency {
                            label
                            symbol
                        }      
                    }
                    brand
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
            this.setState({item: data.data.product})
        })
    } 

    render = () => {
        return (
            <div>
                {
                    this.state.item?
                    <ProductMainView item={this.state.item}/>
                    :null
                }
            </div>
        )
    }
    

}

export default ProductDescriptionPage