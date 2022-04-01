import React, { Component } from 'react'
import styles from './styles/navbarCategory.scss'
import CartContext from '../context/cartContext'

class NavbarCategory extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <label>
                <input type='radio' name='category' checked={this.props.checked} />
                <span onClick={this.props.onClick}>
                    {this.props.tag.toUpperCase()}
                </span>
            </label>    
        )
    }
}
// Add default checked

NavbarCategory.context = CartContext

export default NavbarCategory