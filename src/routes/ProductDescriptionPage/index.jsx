import React, { Component } from 'react'
import ProductMainView from '../../components/ProductMainView'
import { getItemData } from '../../helpers'

class ProductDescriptionPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item: null
        }
    }

    componentDidMount() {
        getItemData(this.props.match.params.item_id)
            .then(itemData =>
                this.setState({ item: itemData })
            )
    }

    render() {
        return (
            <div>
                {
                    this.state.item ?
                        <ProductMainView item={this.state.item} />
                        : null
                }
            </div>
        )
    }


}

export default ProductDescriptionPage