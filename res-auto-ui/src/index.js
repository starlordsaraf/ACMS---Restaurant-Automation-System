import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import seatingChart from './seatingChart.js';
import * as serviceWorker from './serviceWorker';
import Form from './Form.js';
import menu from './table.js';
import Login from './login.js';

import SignUp from './signup.js';

import Navigation from './navigation.js';
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";

ReactDOM.render(
    <BrowserRouter>
    <Navigation/>
    <Switch>
      <Route path="/menuDisplay" component={menu} exact/>
      <Route path="/Dish" component={Form}/>
      <Route path="/seatingchart/:resId" component={seatingChart} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();