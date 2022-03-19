import React, { Component } from 'react'

const CartContext = React.createContext({})

// provider / getter
// consumer / setter?


export class CartProvider extends Component {
    state = {
        items: null,
        currentCategory: 'all'
    }

    addItem = () => {
        this.setState({items: 'boenas'})
    }

    setCategory = (category) => {
        this.setState({currentCategory: category})
    }
    render() {
        const {items, currentCategory} = this.state
        const {addItem, setCategory} = this;
        return (
            <CartContext.Provider value={{
                items,
                addItem,
                currentCategory,
                setCategory
            }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}

export default CartContext