import React, { Component } from 'react'
import CartButton from './cartButton'
import CurrencyButton from './currencyButton'
import CartContext from '../../context/cartContext'
import './styles.css'

class NavbarIcons extends Component {
    constructor(props) {
        super(props)
        this.box = React.createRef()
    }

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick);
    }

    handleOutsideClick = (event) => {
        if (this.box && !this.box.current.contains(event.target)) {
            if (this.context.isDimmed) {
                this.context.toggleDimm()
            }
        }
    }

    render() {
        return (
            <div className='navbarIcons'>
                <CurrencyButton currencies={this.props.currencies} />

                <div ref={this.box}>
                    <CartButton />
                </div>
            </div>
        )
    }
}

NavbarIcons.contextType = CartContext

export default NavbarIcons