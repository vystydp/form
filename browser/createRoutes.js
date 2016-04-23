import App from './app/App.react';
import Home from './home/Page.react';
import React from 'react';
import OrderFormStep1 from './order-cleaning/OrderFormStepOne.js'
import OrderFormStep2 from './order-cleaning/OrderFormStepTwo.js'
import {IndexRoute, Route} from 'react-router';

export default function createRoutes(getState) {

  return (
    <Route component={App} path="/">
      <IndexRoute component={OrderFormStep1} />
      <Route component={OrderFormStep1} path="uklid" />
      <Route component={OrderFormStep2} path="/uklid/krok2" />
    </Route>
  );
}
