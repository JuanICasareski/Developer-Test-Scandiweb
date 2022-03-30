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

window.localStorage.setItem(
    'state', 
    JSON.stringify({
        currentCategory: 'all',
        currency: '$',
        isDimmed: false
    })
)

const CartContext = React.createContext({})

export class CartProvider extends Component {
    constructor(props) {
        super(props)
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            items: [],
            currentCategory: 'all',
            currency: '$',
            isDimmed: false
        }
    }

    setState(state) {
        window.localStorage.setItem('state', JSON.stringify({
            ...JSON.parse(window.localStorage.getItem('state')),
            ...state
        }))
        super.setState(state)
    }
    
    // Implement all of this with this.setState()
    addItem = (itemId, itemInfo, selectedAttrs) => {
        
        if (!this.state.items || this.state.items.length === 0) {
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

    setAttribute = (position, newAttrKey, newAttr) => {
        // Works, but should find more elegant way
        let items =  [...this.state.items]
        items.at(position).selectedAttrs[newAttrKey] = newAttr
        this.setState({items: items})
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
        const {addItem, setCategory, setCurrency, toggleDimm, setAttribute} = this;
        return (
            <CartContext.Provider value={{
                items,
                addItem,
                currentCategory,
                setCategory,
                currency,
                setCurrency,
                isDimmed,
                toggleDimm,
                setAttribute
            }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}

export default CartContext