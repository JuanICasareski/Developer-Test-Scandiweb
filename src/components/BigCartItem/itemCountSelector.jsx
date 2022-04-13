import React, { Component } from 'react'
import CartContext from '../../context/cartContext'
import './styles.css'

class ItemCountSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemCount: props.count,
        }
    }

    incrementCount = () => {
        this.context.setCount(this.props.order, this.state.itemCount + 1)
    }

    decrementCount = () => {
        this.context.setCount(this.props.order, this.state.itemCount - 1)
    }

    render() {
        return (
            <div className='itemCountSelector'>
                <button onClick={() => this.incrementCount()}>+</button>
                <p>{this.state.itemCount}</p>
                <button onClick={() => this.decrementCount()}>-</button>
            </div>
        )
    }
}

ItemCountSelector.contextType = CartContext

export default ItemCountSelector