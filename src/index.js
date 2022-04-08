import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ProductDescriptionPage from './routes/productDescriptionPage'
import Index from './routes/index'
import Navbar from './components/navbar'
import { CartProvider } from './context/cartContext'
import Cart from './routes/cart'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <CartProvider>
    <Router>
      <Switch>
          <Navbar>
            <Route exact path="/" render={props => <Index {...props}/>}/>
            <Route path="/item/:item_id" render={props => <ProductDescriptionPage {...props} />} />
            <Route path='/cart' render={props => <Cart {...props} />} />
          </Navbar>
      </Switch>
    </Router>
  </CartProvider>,
  rootElement
);

