import React, { Component } from 'react'
import styles from './styles/navbar.scss'
import CartContext from '../context/cartContext'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: null,
            currencies: null,
            isDimmed: false
        }
    }

    componentDidMount() {
        const query = `
            query {        
                categories {
                    name 
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

    toggleDimm  = () => {
        this.setState({isDimmed: !this.state.isDimmed})
    }

    render() {
        return (
            <div style={{
                width: '1440px',
                height: '645px'
            }}>
                <div style={{
                    width: '1440px',
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div className='navbar' style={{marginTop: '30px', marginLeft: '100px'}}>

                        {
                            this.state.items?
                                this.state.items.map(category =>
                                    category.name == this.context.currentCategory?
                                        <label style={{height: '100%'}}>
                                            <input type='radio' name='category' checked  />
                                            <span onClick={() => this.context.setCategory(category.name)} style={{height: '100%'}}>
                                                {category.name.toUpperCase()}
                                            </span>
                                        </label>
                                    :
                                        <label>
                                            <input type='radio' name='category' />
                                            <span onClick={() => this.context.setCategory(category.name)}>
                                                {category.name.toUpperCase()}
                                            </span>
                                        </label>
                                )
                            : null
                        }
                    </div>
                    <div className='navbarIcons' style={{display: 'flex', alignItems: 'center', marginRight: '100px'}}>
                        <div className='dropdown'>
                            <button className='dropdownButton' style={{textAlign: 'center', display: 'flex', height: '20px', fontSize: '16px', marginRight: '22px'}}>
                                {this.context.currency}
                                <img src='/dropdown-x512.svg' style={{marginBottom: '2px', marginLeft: '10px', height: '40%', alignSelf: 'flex-end'}} />
                            </button>
                            <div className='dropdownContent' style={{width: '114px', marginLeft: '-12px', marginTop: '7px'}}>
                                {
                                    this.state.currencies?
                                        this.state.currencies.map(currency =>
                                            <a onClick={() => this.context.setCurrency(currency.symbol)}>
                                                {currency.symbol} {currency.label}
                                            </a>    
                                        )
                                    : null
                                }
                            </div>
                        </div>
                        <div className='navbarCart'>
                            <input type='checkbox' id='cart' onClick={() => this.toggleDimm()}/>
                            <label for='cart'>
                                <img src='/shopping-cart-x512.svg' style={{maxHeight: '20px'}} />
                            </label>

                            <div className='navbarCartInfo' style={{marginTop: '4px', marginLeft: '-212px', zIndex: 3}}>
                                <img src='/shopping-cart-x512.svg' style={{height: '200px', width: '200px'}} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.state.isDimmed? 'dimmed' : 'undimmed'} style={{paddingTop: '50px'}}>              
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
//1100px

Navbar.contextType = CartContext

export default Navbar