import React, { Component } from 'react'


function shallowEqual(object1, object2) {
    // A shallow equal works because the way
    // I implemented the selected attrs has no nested objs

    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
}


const CartContext = React.createContext({})

export class CartProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            currentCategory: 'all',
            currency: '$',
            isDimmed: false
        }
    }

    // Implement all of this with this.setState()
    addItem = (itemId, itemInfo, selectedAttrs) => {
        
        if (this.state.items.length === 0) {
            this.setState({
                items: [{
                    itemId: itemId,
                    itemInfo: itemInfo,
                    selectedAttrs: selectedAttrs,
                    count: 1
                }]
            })
            return
        }

        for (const [i, item] of this.state.items.entries()) {
            if (item.itemId === itemId && shallowEqual(selectedAttrs, item.selectedAttrs)) {
                // Find workaround so that it's unmutated
                this.state.items.splice(i, 1)
                this.setState({
                    items: [
                        ...this.state.items,
                        {
                            itemId: itemId,
                            itemInfo: itemInfo,
                            selectedAttrs: selectedAttrs,
                            count: item.count + 1                       
                        }
                    ]
                })
                return
            }
        }

        this.setState({
            items: [
                ...this.state.items,
                {
                    itemId: itemId,
                    itemInfo: itemInfo,
                    selectedAttrs: selectedAttrs,
                    count: 1
                }
            ]
        })
    }

    setCategory = (category) => {
        this.setState({currentCategory: category})
    }

    setCurrency = (currency) => {
        this.setState({currency: currency})
    }

    toggleDimm = () => {
        this.setState({isDimmed: !this.state.isDimmed})
    }

    render() {
        const {items, currentCategory, currency, isDimmed} = this.state
        const {addItem, setCategory, setCurrency, toggleDimm} = this;
        return (
            <CartContext.Provider value={{
                items,
                addItem,
                currentCategory,
                setCategory,
                currency,
                setCurrency,
                isDimmed,
                toggleDimm
            }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}

export default CartContext