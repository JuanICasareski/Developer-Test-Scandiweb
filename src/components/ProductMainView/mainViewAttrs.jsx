import React, { Component } from 'react'
import AttributeRadioButton from '../AttributeRadioButton'
import './styles.css'

class MainViewAttrs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attrs: props.attrs
        }
    }

    render() {
        return (
            <div className='productAttrs'>
                {
                    this.state.attrs.map((attr) =>
                        <div key={attr.id}>

                            <p className='productSubtitle'>
                                {attr.id.toUpperCase()}:
                            </p>

                            <div className='productAttr'>
                                {
                                    attr.items.map((a) =>
                                        <AttributeRadioButton 
                                            attr={a} 
                                            type={attr.type} 
                                            name={attr.name} 
                                            id={attr.id} 
                                            key={a.id + attr.id} 
                                            onClick={this.props.onClick}
                                        />
                                    )
                                }
                            </div>

                        </div>
                    )
                }
            </div>
        )
    }
}

export default MainViewAttrs
