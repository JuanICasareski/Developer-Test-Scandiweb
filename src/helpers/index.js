
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