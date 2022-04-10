
export const getItemsFromCategory = (category) => {

    const query = `
        query {
            category(input: {title: "${category}"}) {
                products {
                    id
                    name
                    brand
                    inStock
                    gallery
                    prices {
                        currency {
                            symbol  
                        }
                        amount
                    }
                    attributes {
                        id
                        name
                        type
                        items {
                            displayValue
                            value
                            id
                        }
                    }
                }
            }
        }
    `

    const data = fetch("http://localhost:4000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            query
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        return data.data.category.products
    })

    return data
}

export const getItemData = (itemId) => {
    const query = `
            query {
                product(id:"${itemId}") {
                    id
                    name
                    inStock
                    gallery
                    description
                    category
                    attributes {
                        id
                        name
                        type
                        items {
                            displayValue
                            value
                            id
                        }
                    }
                    prices {
                        amount
                        currency {
                            label
                            symbol
                        }      
                    }
                    brand
                }
            }
        `
    const data = fetch("http://localhost:4000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            query
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        return data.data.product
    })

    return data
}