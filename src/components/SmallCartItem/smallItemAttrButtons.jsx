import React, { Component } from 'react'
import CartContext from '../../context/cartContext'
import './styles.css'

class SmallItemAttrButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attr: props.attr,
            order: props.order,
            selectedAttrs: props.selectedAttrs
        }
    }

    render() {
        return (
            <>
                {
                    this.state.attr.type === 'swatch' ?
                        <div className='smallCartItemSwatch'>
                            {
                                this.state.attr.items.map((item, j) =>
                                    <React.Fragment key={item + j}>
                                        <label>
                                            <input
                                                type='radio'
                                                checked={this.state.selectedAttrs[this.state.attr.id] === item.value}
                                                name={this.state.attr.name + this.props.order}
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
                        <div className='smallCartItemAttributes'>
                            {
                                this.state.attr.items.map((item, j) =>
                                    <React.Fragment key={item + j}>
                                        <input type='radio'
                                            checked={this.state.selectedAttrs[this.state.attr.id] === item.value}
                                            name={this.state.attr.name + this.props.order}
                                            id={item.id + this.props.order + this.props.i}
                                            onChange={() => this.context.setAttribute(this.props.order, this.state.attr.id, item.value)}
                                        />
                                        <label htmlFor={item.id + this.props.order + this.props.i}>
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

SmallItemAttrButton.contextType = CartContext

export default SmallItemAttrButton
