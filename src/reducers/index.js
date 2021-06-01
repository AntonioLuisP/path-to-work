import counterReducer from './counter'
import sidebarReducer from './sidebar'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
    counter: counterReducer,
    sidebar: sidebarReducer,
})

export default allReducers;