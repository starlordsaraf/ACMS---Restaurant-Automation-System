import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import seatingChart from './seatingChart.js';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";

ReactDOM.render(
    <BrowserRouter>
    <Switch>
      <Route path="/seatingchart/:resId" component={seatingChart} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();