import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ProductDescriptionPage from './routes/productDescriptionPage'
import Index from './routes/index'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" render={props => <Index {...props} />}/>
      <Route exact path="/item/:item_id" element={<ProductDescriptionPage />} />
    </Switch>
  </Router>,
  rootElement
);

