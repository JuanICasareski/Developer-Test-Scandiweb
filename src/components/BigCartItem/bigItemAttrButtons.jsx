import React, { Component } from 'react'
import CartContext from '../../context/cartContext'
import './styles.css'

class BigItemAttrButtons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attr: props.attr,
            i: props.i,
            selectedAttrs: props.selectedAttrs
        }
    }

    render() {
        return (
            <>
                {
                    this.state.attr.type === 'swatch' ?
                        <div className='cartItemSwatch'>
                            {
                                this.state.attr.items.map((item, j) =>
                                    <React.Fragment key={item + j}>
                                        <label>
                                            <input
                                                type='radio'
                                                checked={this.state.selectedAttrs[this.state.attr.id] === item.value}
                                                name={`${this.state.attr.name}${this.props.order}big`}
                                                onChange={() => this.context.setAttribute(this.props.order, this.state.attr.id, item.value)}
                                            />
                                            <span
                                                style={{
                                                    background: item.displayValue
                                                }}
                                            />
                                        </label>
                                    </React.Fragment>
                                )
                            }
                        </div>
                        :
                        <div className='cartItemAttributes'>
                            {
                                this.state.attr.items.map((item, j) =>
                                    <React.Fragment key={item + j}>
                                        <input
                                            type='radio'
                                            checked={this.state.selectedAttrs[this.state.attr.id] === item.value}
                                            name={this.state.attr.name + this.props.order + 'big'}
                                            id={`${item.id} ${this.props.order} ${this.state.i} big`}
                                            onChange={() => this.context.setAttribute(this.props.order, this.state.attr.id, item.value)}
                                        />
                                        <label
                                            htmlFor={`${item.id} ${this.props.order} ${this.state.i} big`}
                                        >
                                            <span>{item.value}</span>
                                        </label>
                                    </React.Fragment>
                                )
                            }
                        </div>
                }
            </>
        )
    }
}

BigItemAttrButtons.contextType = CartContext

export default BigItemAttrButtons