import { createStore } from 'redux'

import allReducers from './redux';

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()// optional just to see in the extension of redux on navegator
)
export default store