import React, { Component } from 'react'

const CartContext = React.createContext({})

// provider / getter
// consumer / setter?


export class CartProvider extends Component {
    state = {
        items: null,
    }

    addItem = () => {
        this.setState({items: 'boenas'})
    }

    render() {
        const {items} = this.state
        const {addItem} = this;
        return (
            <CartContext.Provider value={{
                items,
                addItem
            }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}

export default CartContext