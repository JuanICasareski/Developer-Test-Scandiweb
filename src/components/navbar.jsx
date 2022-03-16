import React, { Component } from 'react'
import styles from './styles/navbar.scss'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: null,
            currentCategory: 'all',
            currency: '$',
            currencies: null
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
                <div className='navbar' style={{marginTop: '30px'}}>

                    {
                        this.state.items?
                            this.state.items.map(category =>
                                category.name == this.state.currentCategory?
                                    <label style={{height: '100%'}}>
                                        <input type='radio' name='category' checked  />
                                        <span onClick={() => this.setCategory(category.name)} style={{height: '100%'}}>
                                            {category.name.toUpperCase()}
                                        </span>
                                    </label>
                                :
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
                <div className='navbarIcons' style={{display: 'flex', alignItems: 'center'}}>
                    <div className='dropdown'>
                        <button className='dropdownButton' style={{textAlign: 'center', display: 'flex', height: '20px', fontSize: '16px', marginRight: '22px'}}>
                            {this.state.currency}
                            <img src='/dropdown-x512.svg' style={{marginBottom: '2px', marginLeft: '10px', height: '40%', alignSelf: 'flex-end'}} />
                        </button>
                        <div className='dropdownContent' style={{width: '114px', marginLeft: '-12px', marginTop: '7px'}}>
                            {
                                this.state.currencies?
                                    this.state.currencies.map(currency =>
                                        <a>{currency.symbol} {currency.label}</a>    
                                    )
                                : null
                            }
                        </div>
                    </div>
                    <button className='navbarCart' style={{height: '21px', paddingLeft: '5px'}}>
                        <img src='/shopping-cart-x512.svg' style={{height: '100%'}} />
                    </button>
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