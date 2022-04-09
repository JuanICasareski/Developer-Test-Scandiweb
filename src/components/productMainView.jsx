import React, { Component } from 'react'
import ImgRadioButton from './imgRadioButton'
import AttributeRadioButton from './attributeRadioButton'
import PriceTag from './priceTag'
import CartContext from '../context/cartContext'
import styles from './styles/productMainView.scss'
import { Interweave } from 'interweave'

class ProductMainView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentImage: props.item.gallery.at(0),
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

    setImage = (newUrl) => {
        this.setState({
            currentImage: newUrl
        })
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
                    <div className='imageSliderContainer noScrollBar'>
                        {
                            this.state.gallery.map((i) =>
                                <div className='imageSliderImage' key={i + 'container'}>
                                    <ImgRadioButton url={i} onClick={this.setImage} />
                                </div>
                            )
                        }
                    </div>
                    <div className='productImageContainer'>
                        <img className='centerImage' src={this.state.currentImage} alt='current item image' />
                    </div>
                </div>

                <div className='productContainerRight'>
                    <div>
                        <p className='productBrand'>{this.state.brand}</p>
                        <p className='productName'>{this.state.name}</p>
                    </div>
                    <div className='productAttrs'>
                        {
                            this.state.attrs.map((attr) =>
                                <div key={attr.id}>
                                    <p className='productSubtitle'>{attr.id.toUpperCase()}:</p>
                                    <div className='productAttr'>
                                        {
                                            attr.items.map((a) =>
                                                <AttributeRadioButton attr={a} type={attr.type} name={attr.name} id={attr.id} key={a.id + attr.id} onClick={this.setAttr} />
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <div>
                        <p className='productSubtitle'>PRICE:</p>
                        <p className='productPricing'><PriceTag prices={this.state.prices} /></p>
                    </div>

                    <div className='addToCartButtonContainer'>
                        {
                            this.state.inStock ?
                                <button
                                    disabled={Object.keys(this.state.selectedAttrs).length !== this.state.attrs.length}
                                    className='addToCartButton'
                                    onClick={() => this.context.addItem(this.state.itemId, this.props.item, this.state.selectedAttrs)}
                                >
                                    ADD TO CART
                                </button>
                                :
                                <button disabled className='addToCartButton' title='🥲'>OUT OF STOCK</button>
                        }
                    </div>

                    <div className='productDescription noScrollBar'>
                        <Interweave content={this.state.description} />
                    </div>

                </div>
            </div>
        )
    }
}

ProductMainView.contextType = CartContext

export default ProductMainView