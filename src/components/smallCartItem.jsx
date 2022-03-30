import React, { Component } from 'react'
import styles from './styles/smallCartItem.scss'

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

    incrementCount() {
        this.setState({itemCount: this.state.itemCount+1})
    }

    decrementCount() {
        this.setState({itemCount: this.state.itemCount-1})
    }


    render() {
        return (
            <div className='smallCartItem' style={{outline: '1px solid'}}>
                <div className='smallCartItemLeft'>
                    <div>
                        <div className='smallCartItemName'>
                            <p style={{marginBottom: 0, marginTop: 0}}>{this.state.brand}</p>
                            <p style={{marginTop: 0}}>{this.state.name}</p>
                        </div>
                        <div className='smallCartItemPricing'>
                            <p style={{marginBottom: 0}}>{this.state.prices[0].currency.symbol}{this.state.prices[0].amount}</p>
                        </div>  
                    </div>
                    <div className='smallCartItemDetails'>
                        {
                            this.state.attributes.map((attr, i) =>
                                <div>
                                    <p>{attr.name}:</p>
                                    <div className='smallCartItemAttributes'>
                                    {
                                        attr.items.map((item, j) =>                                            
                                            this.state.selectedAttrs[attr.id] === item.displayValue?
                                                <>
                                                    <input checked type='radio' name={attr.name + this.props.order} id={item.id + this.props.order + i} />
                                                    <label htmlFor={item.id + this.props.order + i}>
                                                        <span>{item.displayValue}</span>
                                                    </label>
                                                </>
                                            :
                                                <>
                                                    <input type='radio' name={attr.name + this.props.order} id={item.id + this.props.order + i} />
                                                    <label htmlFor={item.id + this.props.order + i}>
                                                        <span>{item.displayValue}</span>
                                                    </label>
                                                </>
                                        )
                                    }
                                    </div>
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
                    <div style={{width:'105px'}}>
                        <img src='/dropdown-x512.svg' />
                    </div>
                </div>
            </div>
        )
    }

}

export default SmallCartItem