import React, { Component } from 'react'

const CartContext = React.createContext({})

// provider / getter
// consumer / setter?


export class CartProvider extends Component {
    state = {
        items: null,
        currentCategory: 'all',
        currency: '$',
        isDimmed: false
    }

    addItem = () => {
        this.setState({items: 'boenas'})
    }

    setCategory = (category) => {
        this.setState({currentCategory: category})
    }

    setCurrency = (currency) => {
        this.setState({currency: currency})
    }

    toggleDimm = () => {
        this.setState({isDimmed: !this.state.isDimmed})
    }

    render() {
        const {items, currentCategory, currency, isDimmed} = this.state
        const {addItem, setCategory, setCurrency, toggleDimm} = this;
        return (
            <CartContext.Provider value={{
                items,
                addItem,
                currentCategory,
                setCategory,
                currency,
                setCurrency,
                isDimmed,
                toggleDimm
            }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}

export default CartContext