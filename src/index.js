import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { CartProvider } from './context/cartContext'

import ProductDescriptionPage from './routes/ProductDescriptionPage'
import ProductListingPage from './routes/ProductListingPage'
import Navbar from './components/Navbar'
import Cart from './routes/CartPage'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <CartProvider>
    <Router>
      <Switch>
        <Navbar>
          <Route path="/" render={props => <ProductListingPage {...props} />} exact />
          <Route path="/item/:item_id" render={props => <ProductDescriptionPage {...props} />} />
          <Route path='/cart' render={props => <Cart {...props} />} />
        </Navbar>
      </Switch>
    </Router>
  </CartProvider>,
  rootElement
);

