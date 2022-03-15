import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ProductDescriptionPage from './routes/productDescriptionPage'
import Index from './routes/index'
import Navbar from './components/navbar'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" render={props => <Navbar {...props}/>}/>
      <Route path="/item/:item_id" render={props => <ProductDescriptionPage {...props} />} />
    </Switch>
  </Router>,
  rootElement
);

