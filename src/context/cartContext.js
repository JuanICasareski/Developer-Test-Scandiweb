import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';


const shallowEqual = (object1, object2) => {
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
        totalItemCount: 0,
        ...JSON.parse(window.localStorage.getItem('state')),
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
            isDimmed: false,
            totalItemCount: 0,
            totalItemPrices: []
        }
    }

    setState(state) {
        window.localStorage.setItem('state', JSON.stringify({
            ...JSON.parse(window.localStorage.getItem('state')),
            ...state
        }))
        super.setState(state)
    }

    addItemCount = (plusCount) => {
        this.setState({totalItemCount: this.state.totalItemCount + plusCount})
    } 

    componentDidUpdate(prevProps, prevState) {
        if(prevState.items !== this.state.items) {
            let totalPrices = Array(5).fill({
                amount: 0,
                currency: {
                    label: null,
                    symbol: null
                }
            })
   
            for(const [i, item] of this.state.items.entries()) {
                for(const [j, price] of item.itemInfo.prices.entries()) {
                    totalPrices[j] = {
                        amount: totalPrices.at(j).amount + price.amount * item.count,
                        currency: {
                            ...price.currency
                        }
                    }
                }  
            }
    
            this.setState({totalItemPrices: totalPrices})
        }

    }
    
    addItem = (itemId, itemInfo, selectedAttrs) => {

        this.addItemCount(1)
        
        if (!this.state.items || this.state.items.length === 0) {
            this.setState({
                items: [{
                    itemId: itemId,
                    itemInfo: itemInfo,
                    itemUUID: uuidv4(),
                    selectedAttrs: selectedAttrs,

                    count: 1
                }]
            })
            return
        }

        let items = [...this.state.items]
        for (const [i, item] of items.entries()) {
            if (item.itemId === itemId && shallowEqual(selectedAttrs, item.selectedAttrs)) {
                items.at(i).count = items.at(i).count + 1
                this.setState({items: items})
                return
            }    
        }
        
        this.setState({
            items: [
                ...this.state.items,
                {
                    itemId: itemId,
                    itemInfo: itemInfo,
                    itemUUID: uuidv4(),
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

    setCount = (position, newCount) => {
        this.addItemCount(newCount - this.state.items.at(position).count)

        let items = [...this.state.items]
        items.at(position).count = newCount

        if(newCount <= 0) {
            items.splice(position, 1)
        }

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
        const {items, currentCategory, currency, isDimmed, totalItemCount, totalItemPrices} = this.state
        const {addItem, setCategory, setCurrency, toggleDimm, setAttribute, setCount} = this;
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
                setAttribute,
                setCount,
                totalItemCount,
                totalItemPrices
            }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}

export default CartContext