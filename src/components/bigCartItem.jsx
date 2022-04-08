import React, { Component } from 'react'
import PriceTag from './priceTag'
import CartContext from '../context/cartContext'
import styles from './styles/bigCartItem.scss'

class BigCartItem extends Component {
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
            itemCount: props.count,
            currentImageIndex: 0
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

    nextImage = () => {
        this.setState({
            currentImageIndex: this.state.currentImageIndex + 1
        })
    }

    prevImage = () => {
        this.setState({
            currentImageIndex: this.state.currentImageIndex - 1
        })
    }

    render() {
        return (
            <div className='cartItem'>
                <div className='cartItemLeft'>
                    <div>
                        <div className='cartItemBrand'>
                            <p style={{ marginBottom: 0, marginTop: 0 }}>{this.state.brand}</p>
                        </div>
                        <div className='cartItemName'>
                            <p style={{ marginTop: 0 }}>{this.state.name}</p>
                        </div>
                        <div className='cartItemPricing'>
                            <p style={{ marginBottom: 0 }}> <PriceTag prices={this.state.prices} /> </p>
                        </div>
                    </div>
                    <div className='cartItemDetails'>
                        {
                            this.state.attributes.map((attr, i) =>
                                <div key={attr}>
                                    <p>{attr.name}:</p>
                                    {
                                        attr.type === 'swatch' ?
                                            <div className='cartItemSwatch'>
                                                {
                                                    attr.items.map((item, j) =>
                                                        <React.Fragment key={item + j}>
                                                            <label>
                                                                <input
                                                                    type='radio'
                                                                    checked={this.state.selectedAttrs[attr.id] === item.value}
                                                                    name={`${attr.name}${this.props.order}big`}
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
                                            <div className='cartItemAttributes'>
                                                {
                                                    attr.items.map((item, j) =>
                                                        <React.Fragment key={item + j}>
                                                            <input
                                                                type='radio'
                                                                checked={this.state.selectedAttrs[attr.id] === item.value}
                                                                name={attr.name + this.props.order + 'big'}
                                                                id={`${item.id} ${this.props.order} ${i} big`}
                                                                onChange={() => this.context.setAttribute(this.props.order, attr.id, item.value)}
                                                            />
                                                            <label
                                                                htmlFor={`${item.id} ${this.props.order} ${i} big`}
                                                            >
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
                <div className='cartItemRight'>
                    <div className='itemCountSelector'>
                        <button onClick={() => this.incrementCount()}>+</button>
                        <p>{this.state.itemCount}</p>
                        <button onClick={() => this.decrementCount()}>-</button>
                    </div>

                    <div className='cartItemImage'>
                        <img style={{ maxHeight: '100%', width: '100%' }} src={this.state.gallery.at(this.state.currentImageIndex)} alt='Current item image' />
                        <div className='cartItemCarrousel'>
                            {
                                this.state.currentImageIndex > 0 ?
                                    <div onClick={() => this.prevImage()}>
                                        <img src='prev-button.svg' alt='back' />
                                    </div>
                                    :
                                    <div style={{ width: '24px', height: '100%' }}></div>
                            }
                            {
                                this.state.currentImageIndex < this.state.gallery.length - 1 ?
                                    <div onClick={() => this.nextImage()}>
                                        <img src='next-button.svg' alt='next' />
                                    </div>
                                    :
                                    <div style={{ width: '24px', height: '100%' }}></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

BigCartItem.contextType = CartContext

export default BigCartItem