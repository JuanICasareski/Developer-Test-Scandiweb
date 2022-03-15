import React, { Component } from 'react'
import styles from './styles/navbar.scss'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: null,
            currentCategory: 'all',
            currency: '$',
            currencies: []  
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
                currencies {
                    label
                    symbol
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
            this.setState({
                items: data.data.categories,
                currencies: data.data.currencies
            })
        })
        
    }

    setCategory = (category) => {
        this.setState({currentCategory: category})
    }

    render() {
        console.log(this.state)
        return (
            <div>
            <div style={{
                width: '1440px',
                height: '80px',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <div className='navbar' style={{marginTop: '20px'}}>

                    {
                        this.state.items?
                            this.state.items.map(category =>
                                <label>
                                    <input type='radio' name='category' />
                                    <span onClick={() => this.setCategory(category.name)}>
                                        {category.name.toUpperCase()}
                                    </span>
                                </label>
                            )
                        : null
                    }
                </div>
                <div className='navbarIcon'>
                    <img src='/shopping-cart-x512.svg' alt="img"/>
                </div>
            </div>
                {
                    this.state.items?
                        this.state.items.map(category =>
                            category.name == this.state.currentCategory?
                                category.products.map(item =>
                                    <h1>
                                        <a href={`/item/${item.id}`}>{item.id}</a>
                                    </h1>    
                                )    
                            : null
                    ) 
                    :null
                }
            </div>
        )
    }
}

//<img src='/shopping-cart-x512.svg' alt="img"/>
export default Navbar