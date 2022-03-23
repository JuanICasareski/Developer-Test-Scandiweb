import React, { Component } from 'react'
import styles from './styles/navbar.scss'
import CartContext from '../context/cartContext'
import NavbarIcons from './navbarItems'

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
                width: '100%',
                height: '645px'
            }}>
                <div style={{
                    width: '100%',
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div className='navbar' style={{marginLeft: '100px', height: '80px'}}>

                    {
                        this.state.items?
                            this.state.items.map(category =>
                                this.context.currentCategory === category.name?
                                    <label>
                                        <input type='radio' name='category' checked/>
                                        <span onClick={() => this.context.setCategory(category.name)}>
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
                    <div>
                        {
                            this.state.currencies?
                                <NavbarIcons currencies={this.state.currencies} />
                            : null
                        }
                    </div>
                </div>
                <div className={this.state.isDimmed? 'dimmed' : 'undimmed'}>              
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