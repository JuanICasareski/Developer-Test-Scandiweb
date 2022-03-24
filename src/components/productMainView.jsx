import React, { Component } from 'react'
import ImgRadioButton from './imgRadioButton'
import AttributeRadioButton from './attributeRadioButton'
import styles from './styles/productMainView.scss'
import CartContext from '../context/cartContext'

class ProductMainView extends Component {
    constructor(props){
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
            inStock: props.item.inStock
        }
    }

    setImage = (newUrl) => {
        this.setState({
            currentImage: newUrl
        })
    }

    render = () => {
        return (
                <div style={{width: '995px', height: '515px', display: 'flex', position: 'relative', margin: '0 auto', paddingTop: '80px'}}>
                    <div style={{width: '635px', height: '515px', display: 'flex'}}>
                        <div className='noScrollBar' style={{width: '80px', height: '515px', display: 'block', overflow: 'overlay', padding: '2px'}}>
                            {   
                                this.state.gallery.map((i) => 
                                    <div style={{height: '80px', width: '80px', paddingBottom: '40px', position: 'relative'}}>
                                        <ImgRadioButton url={i} onClick={this.setImage}/>
                                    </div>
                                )
                            }
                        </div>
                        <div style={{width: '515px', height: '515px', marginLeft: '40px', position: 'relative'}}>
                            <img className='centerImage' src={this.state.currentImage}></img>
                        </div>


                        {/* vvvvv Descripcion y eso acá vvvvv */}
                    </div>
                    <div style={{height: '515px', width: '290px', marginLeft: '100px', display: 'flex', flexDirection: 'column'}}>
                        <div    >
                            <p className='productBrand' style={{marginBottom: '7px'}}><b>{this.state.brand}</b></p>
                            <p className='productName' style={{margin: '0px'}}>{this.state.name}</p> 
                        </div>
                        {
                            this.state.attrs.map((attr) =>

                                <div>
                                    <p className='productSubtitle'>{attr.id.toUpperCase()}:</p>
                                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px 5px'}}>
                                        {
                                            attr.items.map((a) => 
                                                    <AttributeRadioButton attr={a} type={attr.type}/>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }

                        <div>
                            <p className='productSubtitle'>PRICE:</p>
                            <p className='productPricing'>{this.state.prices[0].currency.symbol}{this.state.prices[0].amount}</p>
                        </div>

                        {
                            this.state.inStock?
                                <button className='addToCartButton' style={{width: '100%'}}>ADD TO CART</button>
                            :
                                <button disabled className='addToCartButton' style={{width: '100%'}} title='🥲'>OUT OF STOCK</button>
                        }
                        <div className='noScrollBar' style={{overflow: 'scroll'}}>
                            <div className='productDescription' style={{maxHeight: '100%'}} dangerouslySetInnerHTML={{__html: this.state.description}}></div>
                        </div>
                    </div>
                </div>
        )
    }
}

ProductMainView.contextType = CartContext

export default ProductMainView