import React, { Component } from 'react'
import MainViewAttrs from './mainViewAttrs'
import MainViewCartButton from './mainViewCartButton'
import MainViewPrice from './mainViewPrice'
import MainViewImage from './mainViewImage'
import MainViewTitle from './mainViewTitle'
import MainViewDescription from './mainViewDescription'
import CartContext from '../../context/cartContext'
import './styles.css'
class ProductMainView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gallery: props.item.gallery,
            itemId: props.item.id,
            name: props.item.name,
            prices: props.item.prices,
            description: props.item.description,
            attrs: props.item.attributes,
            brand: props.item.brand,
            inStock: props.item.inStock,
            selectedAttrs: {}
        }
    }

    setAttr = (id, attr) => {
        if (this.state.selectedAttrs[id] !== attr) {
            this.setState({
                selectedAttrs: {
                    ...this.state.selectedAttrs,
                    [id]: attr
                }
            })
        }
    }

    render() {
        return (
            <div className='productContainer'>
                <div className='productContainerLeft'>
                    <MainViewImage 
                        gallery={this.state.gallery} 
                    />
                </div>

                <div className='productContainerRight'>

                    <MainViewTitle
                        name={this.state.name}
                        brand={this.state.brand}
                    />

                    <MainViewAttrs
                        attrs={this.state.attrs}
                        onClick={this.setAttr}
                    />

                    <MainViewPrice
                        prices={this.state.prices}
                    />

                    <MainViewCartButton
                        item={this.props.item}
                        selectedAttrs={this.state.selectedAttrs}
                        disabled={Object.keys(this.state.selectedAttrs).length !== this.state.attrs.length}
                        inStock={this.state.inStock}
                    />

                    <MainViewDescription 
                        description={this.state.description}
                    />

                </div>
            </div>
        )
    }
}

ProductMainView.contextType = CartContext

export default ProductMainView