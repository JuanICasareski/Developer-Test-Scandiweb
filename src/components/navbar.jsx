import React, { Component } from 'react'
import styles from './styles/navbar.scss'
import CartContext from '../context/cartContext'
import NavbarIcons from './navbarIcons'
import NavbarCategory from './navbarCategory'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: null,
            currencies: null
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

    render() {
        return (
            <div style={{
                width: '100%',
                height: '645px'
            }}>
                <div style={{
                    width: '100%',
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'relative'
                }}>
                    <div className='navbar' style={{height: '80px'}}>
                    <div style={{marginLeft: '100px'}}>
                        {
                            this.state.items?
                                this.state.items.map(category =>
                                    <NavbarCategory 
                                        tag={category.name} 
                                        onClick={() => this.context.setCategory(category.name)} 
                                        key={category.name} 
                                        checked={category.name === this.context.currentCategory && this.props.location.pathname === '/'} 
                                        location={{pathname: this.props.location.pathname}}
                                    />
                                )
                            : null
                        }
                    </div>

                    </div>

                    
                    <a href='/' className='navbarLogo'>
                        <img src='/logo.svg' />
                    </a>
                    

                    <div style={{}}>
                        {
                            this.state.currencies?
                                <NavbarIcons currencies={this.state.currencies} />
                            : null
                        }
                    </div>
                </div>
                <div className={this.context.isDimmed? 'dimmed' : 'undimmed'}>              
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