import React, { Component } from 'react'
import PriceTag from '../PriceTag'
import CartContext from '../../context/cartContext'
import './styles.css'

class SmallCartItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemId: props.item.id,
            name: props.item.name,
            brand: props.item.brand,
            gallery: props.item.gallery,
            attributes: props.item.attributes,
            selectedAttrs: props.selectedAttrs,
            prices: props.item.prices,
            itemCount: props.count
        }
    }

    incrementCount = () => {
        this.context.setCount(this.props.order, this.state.itemCount + 1)
    }

    decrementCount = () => {
        this.context.setCount(this.props.order, this.state.itemCount - 1)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.count !== this.props.count) {
            this.setState({ itemCount: this.props.count })
        }
    }


    render() {
        return (
            <div className='smallCartItem'>
                <div className='smallCartItemLeft'>
                    <div>
                        <div className='smallCartItemName'>
                            <p>{this.state.brand}</p>
                            <p>{this.state.name}</p>
                        </div>
                        <div className='smallCartItemPricing'>
                            <p> <PriceTag prices={this.state.prices} /> </p>
                        </div>
                    </div>
                    <div className='smallCartItemDetails'>
                        {
                            this.state.attributes.map((attr, i) =>
                                <div key={attr + i}>
                                    <p>{attr.name}:</p>
                                    {
                                        attr.type === 'swatch' ?
                                            <div className='smallCartItemSwatch'>
                                                {
                                                    attr.items.map((item, j) =>
                                                        <React.Fragment key={item + j}>
                                                            <label>
                                                                <input
                                                                    type='radio'
                                                                    checked={this.state.selectedAttrs[attr.id] === item.value}
                                                                    name={attr.name + this.props.order}
                                                                    onChange={() => this.context.setAttribute(this.props.order, attr.id, item.value)}
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
                                                    attr.items.map((item, j) =>
                                                        <React.Fragment key={item + j}>
                                                            <input type='radio'
                                                                checked={this.state.selectedAttrs[attr.id] === item.value}
                                                                name={attr.name + this.props.order}
                                                                id={item.id + this.props.order + i}
                                                                onChange={() => this.context.setAttribute(this.props.order, attr.id, item.value)}
                                                            />
                                                            <label htmlFor={item.id + this.props.order + i}>
                                                                <span>{item.value}</span>
                                                            </label>
                                                        </React.Fragment>
                                                    )
                                                }
                                            </div>
                                    }
                                </div>

                            )
                        }
                    </div>
                </div>
                <div className='smallCartItemRight'>
                    <div className='countSelector'>
                        <button onClick={() => this.incrementCount()}>+</button>
                        <p>{this.state.itemCount}</p>
                        <button onClick={() => this.decrementCount()}>-</button>
                    </div>

                    <div className='smallItemImageContainer'>
                        <img src={this.state.gallery[0]} alt='item image' />
                    </div>
                </div>
            </div>
        )
    }

}

SmallCartItem.contextType = CartContext

export default SmallCartItem