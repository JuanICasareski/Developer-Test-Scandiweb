import React, { Component } from 'react'
import styles from './styles/imgRadioButton.scss'

class ImgRadioButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <label className='imgRadioButton'>
                <input type='radio' name='ImageSlider'></input>
                <img 
                    src={this.props.url}
                    key={this.props.url}
                    style={{maxHeight: '100%', maxWidth: '100%'}}
                    onClick={() => this.props.onClick(this.props.url)}
                    className='centerImage'
                >
                </img>
                <br></br>
            </label>
        )
    }

}


export default ImgRadioButton