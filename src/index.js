import React from 'react'
import ReactDOM from 'react-dom'
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ProductDescriptionPage from './routes/productDescriptionPage';



const rootElement = document.getElementById('root')

ReactDOM.render(
  <Router>
    <Routes>
      <Route path='/' element={<h1>index</h1>} />
      <Route exact path="/item/:item_id" element={<ProductDescriptionPage />} />
    </Routes>
  </Router>,
  rootElement
);

