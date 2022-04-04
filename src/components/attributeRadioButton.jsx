import React, { Component } from 'react'
import styles from './styles/attributeButton.scss'

class AttributeRadioButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: props.type,
            displayValue: props.attr.displayValue, 
            value: props.attr.value,
            id: props.attr.id,
            name: props.name,
            attrId: props.id,
            onClick: props.onClick
        }
    }
    // props.type = null
    render() {
        if (this.state.type === 'swatch') {
            return (
                <label className='swatchButton'>
                    <input type='radio' 
                            name={this.state.name} 
                            onClick={() => this.state.onClick(this.state.attrId, this.state.value)} 
                    />
                    <span style={{
                        background: this.state.displayValue
                    }}>
                    </span>
                </label>
            )
        }
        else {   
            return(
                <label className='attributeButton'>
                    <input type='radio' 
                            name={this.state.name} 
                            onClick={() => this.state.onClick(this.state.attrId, this.state.value)} 
                    />
                    <span>
                        {this.state.value}
                    </span>
                </label>
            )
        }
    }

}

export default AttributeRadioButton