import React, { Component } from 'react'
import styles from './styles/smallCartItem.scss'

class SmallCartItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemCount: 1
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
                            <p style={{marginBottom: 0, marginTop: 0}}>Apollo</p>
                            <p style={{marginTop: 0}}>Running Short</p>
                        </div>
                        <div className='smallCartItemPricing'>
                            <p style={{marginBottom: 0}}>$50.00</p>
                        </div>  
                    </div>
                    <div className='smallCartItemDetails'>
                        <div>
                            <p>Size:</p>
                            <div className='smallCartItemAttributes'>
                                <input type='radio' name='a' id='asd' />
                                <label for='asd'>
                                    <span>Y</span>
                                </label>
                                    
                                <input type='radio' name='a' id='abc' />
                                <label for='abc'>
                                    <span>N</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='smallCartItemRight'>
                    <div className='countSelector'>
                        <button onClick={() => this.incrementCount()}>+</button>
                        <p>{this.state.itemCount}</p>
                        <button onClick={() => this.decrementCount()}>-</button>
                    </div>
                    <div style={{width:'105px'}}>
                        <img className='centerImagea' src='/dropdown-x512.svg' />
                    </div>
                </div>
            </div>
        )
    }

}

export default SmallCartItem