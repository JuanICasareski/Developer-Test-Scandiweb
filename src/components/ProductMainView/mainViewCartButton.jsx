import React, { Component } from 'react'
import CartContext from '../../context/cartContext'
import './styles.css'

class MainViewCartButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: props.disabled,
            selectedAttrs: props.selectedAttrs
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.disabled !== this.props.disabled || prevProps.selectedAttrs !== this.props.selectedAttrs) {
            this.setState({
                disabled: this.props.disabled,
                selectedAttrs: this.props.selectedAttrs
            })
        }
    }

    render() {
        return (
            <div className='addToCartButtonContainer'>
                {
                    this.props.inStock ?
                        <button
                            disabled={this.state.disabled}
                            className='addToCartButton'
                            onClick={() => this.context.addItem(this.props.item.itemId, this.props.item, this.state.selectedAttrs)}
                        >
                            ADD TO CART
                        </button>
                        :
                        <button disabled className='addToCartButton' title='🥲'>OUT OF STOCK</button>
                }
            </div>
        )
    }
}

MainViewCartButton.contextType = CartContext

export default MainViewCartButton
