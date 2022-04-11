import React, { Component } from 'react'
import './styles.css'

class ImgRadioButton extends Component {
    render() {
        return (
            <label className='imgRadioButton'>
                <input type='radio' name='ImageSlider'></input>
                <img
                    src={this.props.url}
                    key={this.props.url}
                    onClick={() => this.props.onClick(this.props.url)}
                    className='centerImage'
                    alt='slider selector'
                >
                </img>
                <br></br>
            </label>
        )
    }

}


export default ImgRadioButton