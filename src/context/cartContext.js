import React, { Component } from 'react'

const CartContext = React.createContext({})

// provider / getter
// consumer / setter?


export class CartProvider extends Component {
    state = {
        items: null,
        currentCategory: 'all',
        currency: '$'
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

    render() {
        const {items, currentCategory, currency} = this.state
        const {addItem, setCategory, setCurrency} = this;
        return (
            <CartContext.Provider value={{
                items,
                addItem,
                currentCategory,
                setCategory,
                currency,
                setCurrency
            }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}

export default CartContext