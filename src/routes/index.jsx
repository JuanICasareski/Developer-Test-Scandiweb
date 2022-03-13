import React, { Component } from 'react'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: null
        }
    }

    componentDidMount() {
        const query = `
            query {
                category(input: {title: "all"}) {
                    products {
                        id
                    }
                }
            }           
        `
        fetch("http://localhost:4000", {
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
            this.setState({items: data.data.category.products})
        })
    }
    render() {
        return (
            <div>
                <h1>Links</h1>
                {   
                    this.state.items?
                        this.state.items.map((item) => 
                            <h3>
                                <a href={`/item/${item.id}`}>{item.id}</a>
                            </h3>
                        )
                    : null    
                }
            </div>
        )
    }
}

export default Index