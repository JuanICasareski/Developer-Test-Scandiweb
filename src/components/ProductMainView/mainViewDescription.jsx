import React, { Component } from 'react'
import { Interweave } from 'interweave'
import './styles.css'

class MainViewDescription extends Component {
    render() {
        return (
            <div className='productDescription noScrollBar'>
                <Interweave content={this.props.description} />
            </div>
        )
    }
}

export default MainViewDescription
