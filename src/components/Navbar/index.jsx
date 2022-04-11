import React, { Component } from 'react'
import NavbarIcons from '../NavbarIconButton'
import NavbarCategory from '../NavbarRadioButton'
import CartContext from '../../context/cartContext'
import './styles.css'

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
            <div className='navbarContainer'>
                <div className='navbarContent'>
                    <div className='navbarCategories'>
                        <div className='navbarCategoriesInner'>
                            {
                                this.state.items ?
                                    this.state.items.map(category =>
                                        <NavbarCategory
                                            tag={category.name}
                                            onClick={() => this.context.setCategory(category.name)}
                                            key={category.name}
                                            checked={category.name === this.context.currentCategory && this.props.location.pathname === '/'}
                                            location={{ pathname: this.props.location.pathname }}
                                        />
                                    )
                                    : null
                            }
                        </div>
                    </div>

                    <a href='/' className='navbarLogo'>
                        <img src='/logo.svg' alt='logo' />
                    </a>

                    <div>
                        {
                            this.state.currencies ?
                                <NavbarIcons currencies={this.state.currencies} />
                                : null
                        }
                    </div>
                </div>
                <div 
                    className={
                        this.context.isDimmed ? 
                            'contentContainer dimmed' 
                        : 
                            'contentContainer undimmed'
                    }
                >    
                        {this.props.children}
                </div>
            </div>
        )
    }
}

Navbar.contextType = CartContext

export default Navbar