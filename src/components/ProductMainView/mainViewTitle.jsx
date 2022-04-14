import React, { Component } from 'react'
import './styles.css'

class MainViewTitle extends Component {
    render() {
        return (
            <div>
            <p className='productBrand'>{this.props.brand}</p>
            <p className='productName'>{this.props.name}</p>
        </div>
        )
    }
}

export default MainViewTitle
