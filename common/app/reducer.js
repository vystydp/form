import {combineReducers} from 'redux';
import {reduxFields} from '../lib/redux-fields';

import device from '../device/reducer';
import intl from '../intl/reducer';
import orderCleaning from '../order-cleaning/reducer';

const appReducer = combineReducers({
  device,
  intl,
  orderCleaning,
  reduxFields
});

export default appReducer;
