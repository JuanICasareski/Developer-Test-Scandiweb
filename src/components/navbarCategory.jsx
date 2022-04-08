import React, { Component } from 'react'
import CartContext from '../context/cartContext'
import styles from './styles/navbarCategory.scss'

class NavbarCategory extends Component {
    render() {
        return (
            <label>
                <a href={this.props.location.pathname !== '/' ? '/' : null}>
                    <input 
                        type='radio' 
                        name='category' 
                        checked={this.props.checked} onChange={this.props.onClick} 
                    />
                    <span>
                        {this.props.tag.toUpperCase()}
                    </span>
                </a>
            </label>
        )
    }
}

NavbarCategory.context = CartContext

export default NavbarCategory