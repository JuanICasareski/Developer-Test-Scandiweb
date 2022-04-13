import React, { Component } from 'react'
import BigItemAttrButtons from './bigItemAttrButtons'
import './styles.css'

class BigItemAttrs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attributes: this.props.attrs
        }
    }
    render() {
        return (
            <div className='cartItemDetails'>
                {
                    this.state.attributes.map((attr, i) =>
                        <div key={attr}>
                            <p>{attr.name}:</p>
                            <BigItemAttrButtons 
                                attr={attr} 
                                i={i} 
                                selectedAttrs={this.props.selectedAttrs} 
                                order={this.props.order} 
                            />
                        </div>

                    )
                }
            </div>
        )
    }
}

export default BigItemAttrs