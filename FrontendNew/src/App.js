import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Home from './components/Home'

import Login from './components/Login'
import Register from './components/Register'
import Form from './components/Form.js';
import menu from './components/table.js';
import seatingChart from './components/seatingChart.js';
import addOffer from './components/addOffer.js';

import Customer from './customer/customer.js';
import CustomerHome from './customer/custhome.js';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route path="/menuDisplay" component={menu} exact/>
            <Route path="/Dish" component={Form}/>
            <Route path="/seatingchart/:resId" component={seatingChart} />
            <Route path="/addoffer" component={addOffer} />

            <Route path="/customer" component={Customer} />            
            <Route path="/custhome" component={CustomerHome} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App