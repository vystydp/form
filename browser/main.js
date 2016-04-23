/* eslint-disable import/default */
import 'babel-polyfill';
import Bluebird from 'bluebird';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../common/configureStore';
import createRoutes from './createRoutes';
import {IntlProvider} from 'react-intl';
import cs from 'react-intl/locale-data/cs';
import en from 'react-intl/locale-data/en';
import { addLocaleData } from 'react-intl';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {browserHistory} from 'react-router';


addLocaleData(cs);
addLocaleData(en);

// http://bluebirdjs.com/docs/why-bluebird.html
window.Promise = Bluebird;

const app = document.getElementById('order-cleaning-form');
if(!app)
    throw new Error("no element to render app!");

const initialState =
{
    "device":{
        "isMobile":false,
        "platform":"",
        "host":"http:\u002F\u002Flidskasila.loc"
    },
    "intl":{
        "availableLanguages":[
            "en"
        ],
        "msg":{
        },
        "selectedLanguage":"cs"
    }
};

const store = configureStore({initialState});
const routes = createRoutes(store.getState);

ReactDOM.render(
  <Provider store={store}>
      <Router history={browserHistory}>
        {routes}
      </Router>
  </Provider>,
  app
);
