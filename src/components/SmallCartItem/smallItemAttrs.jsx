import React, { Component } from 'react'
import SmallItemAttrButton from './smallItemAttrButtons'
import CartContext from '../../context/cartContext'
import './styles.css'

class SmallItemAttrs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attributes: props.attrs
        }
    }

    render() {
        return (
            <div className='smallCartItemDetails'>
                {
                    this.state.attributes.map((attr, i) =>
                        <div key={attr + i}>
                            <p>{attr.name}:</p>
                            <SmallItemAttrButton
                                attr={attr}
                                selectedAttrs={this.props.selectedAttrs}
                                order={this.props.order}
                                i={i}
                            />
                        </div>
                    )
                }
            </div>
        )
    }
}

SmallItemAttrs.contextType = CartContext

export default SmallItemAttrs
